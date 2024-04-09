import { http, createConfig, } from 'wagmi'
import { mainnet, bsc, bscTestnet, goerli } from 'wagmi/chains'
import { connectorsForWallets } from '@rainbow-me/rainbowkit';
import { rainbowWallet, trustWallet, walletConnectWallet } from '@rainbow-me/rainbowkit/dist/wallets/walletConnectors';


const connectors = connectorsForWallets(
    [
        {
            groupName: 'Recommended',
            wallets: [rainbowWallet, trustWallet, walletConnectWallet],
        },
    ],
    {
        appName: 'My RainbowKit App',
        projectId: 'YOUR_PROJECT_ID',
    }
);

const walletConfig = createConfig({
    connectors,
    chains: [mainnet, goerli],
    transports: {
        [mainnet.id]: http(),
        [bsc.id]: http(),
        [bscTestnet.id]: http(),
        [goerli.id]: http(),
    },
})



export { walletConfig };