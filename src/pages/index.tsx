import * as React from 'react'
import {
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

const Index = () => {
  const [elements, setElements] = React.useState<NFTElementData[]>([])
  const [isMinting, setIsMinting] = React.useState(false)
  const [progress, setProgress] = React.useState({ total: 0, current: 0 })
  const toast = useToast()

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
      setIsMinting(true)

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

      alert(JSON.stringify(response.data))
    } catch (ex) {
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

  return (
    <Container maxW='container.md'>
      <TopBar onMint={handleMint} isMinting={isMinting} progress={progress} />
      <VStack divider={<StackDivider borderColor='gray.200' />}>
        {elements.map((item, index) => (
          <NFTElement
            key={index}
            value={item}
            onChange={(value: NFTElementData) => {
              setElements(set(lensIndex(index), value, elements))
            }}
            onDelete={() => {
              setElements(remove(index, 1, elements))
            }}
          />
        ))}
      </VStack>
      <Button onClick={handleAddNFT}>Add NFT</Button>
    </Container>
  )
}

export default Index
