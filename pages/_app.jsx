import '../styles/globals.css'
// import type { AppProps } from 'next/app'
import { Toaster } from 'react-hot-toast';
import { ContextProvider } from '../contexts/ContextProvider';
// import { ThirdwebProvider } from "@thirdweb-dev/react";
import { ChainId, ThirdwebSDKProvider } from "@thirdweb-dev/react";

import { createClient, configureChains, defaultChains, chain, Chain, useSigner, WagmiConfig } from 'wagmi';
import { SessionProvider } from 'next-auth/react';

import { darkTheme, getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { alchemyProvider } from "wagmi/providers/alchemy";


const binanceChain = {
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

const bscTestnet = {
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

const nearMainnet = {
  id: 1313161554,
  name: "Near Aurora Mainnet",
  network: "Near Aurora Mainnet",
  nativeCurrency: {
    name: "Ethereum Token",
    symbol: "ETH",
    decimals: 18,
  },
  rpcUrls: {
    binance: "https://mainnet.aurora.dev/",
    default: "https://mainnet.aurora.dev/",
  },
  blockExplorers: {
    default: { name: "nearAuroraMainnet", url: "https://aurorascan.dev/" },
  },
  testnet: true,
};

const nearTestnet = {
  id: 1313161555,
  name: "Near Aurora Testnet",
  network: "Near Aurora Testnet",
  nativeCurrency: {
    name: "Ethereum Token",
    symbol: "ETH",
    decimals: 18,
  },
  rpcUrls: {
    binance: "https://testnet.aurora.dev/",
    default: "https://testnet.aurora.dev/",
  },
  blockExplorers: {
    default: { name: "nearAuroraTestnet", url: "https://testnet.aurorascan.dev/" },
  },
  testnet: true,
};



const { chains, provider } = configureChains(
  [binanceChain, bscTestnet, chain.polygon, chain.polygonMumbai, nearMainnet, nearTestnet],
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
    alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_POLYGON_API }),
    alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_MUMBAI_API }),
    jsonRpcProvider({
      rpc: (chain) => {
        if (chain.id !== nearMainnet.id) return null;
        return { http: chain.rpcUrls.default };
      },
    }),
    jsonRpcProvider({
      rpc: (chain) => {
        if (chain.id !== nearTestnet.id) return null;
        return { http: chain.rpcUrls.default };
      },
    }),
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'My RainbowKit App',
  chains
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

const ThirdwebProvider = ({ wagmiClient, children }) => {
  const { data: signer } = useSigner();

  return (
    <ThirdwebSDKProvider
      desiredChainId={bscTestnet.id}
      signer={signer}
      provider={wagmiClient.provider}
      queryClient={wagmiClient.queryClient}
    >
      {children}
    </ThirdwebSDKProvider>
  );
}

function MyApp({ Component, pageProps }) {
  return (
    <ContextProvider>
      <WagmiConfig client={wagmiClient}>
        <SessionProvider session={pageProps.session} refetchInterval={0}>
          <RainbowKitProvider chains={chains}>
            <ThirdwebProvider wagmiClient={wagmiClient}>
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
