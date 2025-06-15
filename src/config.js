import { configureChains, createConfig } from 'wagmi';
import { mainnet } from 'wagmi/chains';
import { jsonRpcProvider } from '@wagmi/core/providers/jsonRpc';
import { Web3Modal } from '@web3modal/react';

const projectId = 'YOUR_WALLETCONNECT_PROJECT_ID'; // Replace with your actual ID

const { chains, publicClient } = configureChains(
[mainnet],
[
jsonRpcProvider({
rpc: (chain) => ({
http: chain.rpcUrls.default.http[0],
}),
}),
]
);

const wagmiConfig = createConfig({
autoConnect: true,
publicClient,
});

export { wagmiConfig, chains, Web3Modal, projectId };

