import { ChakraProvider } from '@chakra-ui/react'
import { Provider, chain, defaultChains } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { WalletLinkConnector } from 'wagmi/connectors/walletLink'

type Connector =
  | InjectedConnector
  | WalletConnectConnector
  | WalletLinkConnector

const infuraId = process.env.NEXT_PUBLIC_INFURA_ID

const connectors = ({ chainId }: { chainId?: number }): Connector[] => {
  const rpcUrl =
    defaultChains.find(x => x.id === chainId)?.rpcUrls?.[0] ??
    chain.mainnet.rpcUrls[0]

  return [
    new InjectedConnector({ chains: defaultChains }),
    new WalletConnectConnector({
      options: {
        infuraId: infuraId,
        qrcode: true,
      },
    }),
    new WalletLinkConnector({
      options: {
        appName: 'mint-nft',
        jsonRpcUrl: `${rpcUrl}/${infuraId}`,
      },
    }),
  ]
}

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Provider autoConnect connectors={connectors}>
        <Component {...pageProps} />
      </Provider>
    </ChakraProvider>
  )
}

export default MyApp
