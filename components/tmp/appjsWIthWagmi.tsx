import '../styles/globals.css'
import type { AppProps } from 'next/app'

import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";

import { WagmiConfig, chain, createClient, configureChains } from "wagmi";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { Chain, useSigner, useProvider } from "wagmi";

import { ChainId, ThirdwebSDKProvider } from "@thirdweb-dev/react";

import { Toaster } from 'react-hot-toast';
import { ContextProvider } from '../contexts/ContextProvider';

// This is the chainId your dApp will work on.
// const activeChainId = ChainId.BinanceSmartChainTestnet;


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
  network: "binance-smart chain testnet",
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
  appName: 'Marastreams App',
  chains
});


const wagmiClient = createClient({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new WalletConnectConnector({
      options: {
        chains,
        qrcode: true,
        rpc: {
          97: "https://data-seed-prebsc-1-s1.binance.org:8545",
        },
      },
    }),
  ],
  provider,
});

function ThirdwebProvider({ wagmiClient, children }: any) {
  const { data: signer } = useSigner();
  const provider  = useProvider();

  return (
    <ThirdwebSDKProvider
      desiredChainId={activeChainId}
      signer={signer as any}
      provider={provider as any}
      queryClient={wagmiClient.queryClient as any}
    >
      {children}
    </ThirdwebSDKProvider>
  );
}




function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ContextProvider>
      {/* <WagmiConfig client={wagmiClient}> */}
        {/* <RainbowKitProvider chains={chains}> */}
          {/* <ThirdwebProvider wagmiClient={wagmiClient} > */}
            <Component {...pageProps} />
            <Toaster />
          {/* </ThirdwebProvider> */}
        {/* </RainbowKitProvider> */}
      {/* </WagmiConfig> */}
    </ContextProvider>
  )
}

export default MyApp
