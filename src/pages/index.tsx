import * as React from 'react'
import {
  Box,
  Button,
  Container,
  StackDivider,
  useToast,
  VStack,
} from '@chakra-ui/react'
import { TopBar } from '../components/TopBar'
import { NFTElement } from '../components/NFTElement'
import { NFTElementData } from '../types'
import { lensIndex, set, remove, append, dissoc } from 'ramda'
import axios from 'axios'
import MintNFTContract from '../MintNFT.json'
import { useNetwork, useSigner } from 'wagmi'
import { ContractFactory } from 'ethers'
import * as ga from '../lib/ga'

const Index = () => {
  const [elements, setElements] = React.useState<NFTElementData[]>([])
  const [isMinting, setIsMinting] = React.useState(false)
  const [progress, setProgress] = React.useState({ total: 0, current: 0 })
  const toast = useToast()
  const [contractAddress, setContractAddress] = React.useState(null)
  const [, getSigner] = useSigner()
  const [{ data: networkData }] = useNetwork()

  const handleAddNFT = () => {
    setElements(
      append(
        {
          name: '',
          description: '',
          image: null,
          quantity: 1,
        },
        elements,
      ),
    )
  }

  const handleMint = async () => {
    try {
      if (elements.length === 0) {
        return toast({
          title: 'No NFTs to mint',
          description: 'Please add at least one NFT',
          status: 'info',
          duration: 5000,
          isClosable: true,
          position: 'top',
        })
      }

      const signer = await getSigner()
      if (!signer) {
        return toast({
          title: 'No signer',
          description: 'Please connect to a wallet',
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'top',
        })
      }

      setIsMinting(true)
      setProgress({ total: 0, current: 0 })
      // Track Mint
      ga.event({
        action: 'mint-started',
        params: {
          elements: elements.length,
        },
      })

      // Upload files
      const formData = new FormData()
      elements.forEach(element => {
        formData.append('files', new Blob([element.image]))
      })
      formData.append('nfts', JSON.stringify(elements.map(dissoc('image'))))

      const response = await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: event =>
          setProgress({ total: event.total, current: event.loaded }),
      })

      // Mint NFTs
      const MintNFT = new ContractFactory(
        MintNFTContract.abi,
        MintNFTContract.bytecode,
        signer,
      )

      const nft = await MintNFT.deploy(
        `https://ipfs.io/ipfs/${response.data.cid}/nft-`,
        elements.map(element => element.quantity),
      )
      await nft.deployed()
      // Track Mint
      ga.event({
        action: 'mint-succeed',
        params: {},
      })
      toast({
        title: 'Success',
        description: `Your NFT Collection was minted with ${elements.length} NFTs`,
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top',
      })
      setContractAddress(nft.address)
    } catch (ex) {
      // Track Mint
      ga.event({
        action: 'mint-error',
        params: {
          error: ex.message,
        },
      })
      toast({
        title: 'Error',
        description: ex.message,
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    } finally {
      setIsMinting(false)
      setProgress({ total: 0, current: 0 })
    }
  }

  const handleNewCollection = () => {
    setElements([])
    setContractAddress(null)
    setIsMinting(false)
  }

  return (
    <Container maxW='container.md'>
      <TopBar
        onMint={handleMint}
        isMinting={isMinting}
        progress={progress}
        contractAddress={contractAddress}
        onNewCollection={handleNewCollection}
      />
      <VStack divider={<StackDivider borderColor='gray.200' />}>
        {elements.map((item, index) => (
          <NFTElement
            key={index}
            value={item}
            index={index}
            isTestnet={networkData?.chain?.testnet}
            onChange={(value: NFTElementData) => {
              setElements(set(lensIndex(index), value, elements))
            }}
            onDelete={() => {
              setElements(remove(index, 1, elements))
            }}
            contractAddress={contractAddress}
          />
        ))}
      </VStack>
      {!contractAddress && (
        <Box marginY={30}>
          <Button onClick={handleAddNFT}>Add NFT</Button>
        </Box>
      )}
    </Container>
  )
}

export default Index
