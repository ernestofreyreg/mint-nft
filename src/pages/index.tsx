import * as React from 'react'
import { Button, Container, StackDivider, VStack } from '@chakra-ui/react'
import { TopBar } from '../components/TopBar'
import { NFTElement } from '../components/NFTElement'
import { NFTElementData } from '../types'
import { lensIndex, set, remove, append } from 'ramda'

const Index = () => {
  const [elements, setElements] = React.useState<NFTElementData[]>([])

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

  return (
    <Container maxW='container.md'>
      <TopBar />
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
