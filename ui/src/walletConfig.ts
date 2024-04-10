import { connectorsForWallets, } from '@rainbow-me/rainbowkit';
import { rainbowWallet, metaMaskWallet, trustWallet, injectedWallet, coin98Wallet } from '@rainbow-me/rainbowkit/wallets';
import { http, createConfig, webSocket, } from 'wagmi'
import { mainnet, bsc, bscTestnet, goerli } from 'wagmi/chains'


const connectors = connectorsForWallets(
    [
        {
            groupName: 'Recommended',
            wallets: [metaMaskWallet, trustWallet, coin98Wallet, injectedWallet, rainbowWallet,],
        },
    ],
    {
        appName: 'My App',
        projectId: 'YOUR_PROJECT_ID',
    }
);

const walletConfig = createConfig({
    connectors,
    chains: [mainnet, bsc, bscTestnet, goerli],
    transports: {
        [mainnet.id]: http(),
        [bsc.id]: http(),
        [bscTestnet.id]: http(),
        [goerli.id]: http(),
    },
})



export { walletConfig };