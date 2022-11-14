import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Toaster } from 'react-hot-toast';
import { ContextProvider } from '../contexts/ContextProvider';
import { ThirdwebProvider } from "@thirdweb-dev/react";

import { createClient, configureChains, defaultChains, chain, Chain, WagmiConfig } from 'wagmi';
import { SessionProvider } from 'next-auth/react';

import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";


const binanceChain: Chain = {
  id: 56,
  name: "Binance Smart Chain Mainnet",
  network: "binance-smart chain mainnet",
  nativeCurrency: {
    name: "Binance Chain Native Token",
    symbol: "BNB",
    decimals: 18,
  },
  rpcUrls: {
    binance: "https://bsc-dataseed4.binance.org",
    defibit: "https://bsc-dataseed4.defibit.io",
    ninicoin: "https://bsc-dataseed4.ninicoin.io",
    public: "https://bsc-dataseed4.binance.org",
    default: "https://bsc-dataseed4.binance.org",
  },
  blockExplorers: {
    default: { name: "Bscscan", url: "https://bscscan.com" },
  },
  testnet: false,
};

const bscTestnet: Chain = {
  id: 97,
  name: "Binance Smart Chain Testnet",
  network: "bsc Testnet",
  nativeCurrency: {
    name: "Binance Chain Native Token",
    symbol: "BNB",
    decimals: 18,
  },
  rpcUrls: {
    binance: "https://data-seed-prebsc-1-s1.binance.org:8545/",
    default: "https://data-seed-prebsc-2-s1.binance.org:8545/",
  },
  blockExplorers: {
    default: { name: "Bscscan", url: "https://testnet.bscscan.com" },
  },
  testnet: true,
};



const { chains, provider } = configureChains(
  [binanceChain, bscTestnet],
  [
    jsonRpcProvider({
      rpc: (chain) => {
        if (chain.id !== binanceChain.id) return null;
        return { http: chain.rpcUrls.default };
      },
    }),
    jsonRpcProvider({
      rpc: (chain) => {
        if (chain.id !== bscTestnet.id) return null;
        return { http: chain.rpcUrls.default };
      },
    }),
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'My RainbowKit App',
  chains
});


const client = createClient({
  autoConnect: true,
  connectors,
  provider,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ContextProvider>
      <WagmiConfig client={client}>
        <SessionProvider session={pageProps.session} refetchInterval={0}>
          <RainbowKitProvider chains={chains}>
          <ThirdwebProvider  desiredChainId={97}>
              <Component {...pageProps} />
              <Toaster />
            </ThirdwebProvider>
          </RainbowKitProvider>
        </SessionProvider>
      </WagmiConfig>
    </ContextProvider>
  );
}

export default MyApp;
