import * as React from 'react'
import { Container } from '@chakra-ui/react'
import { TopBar } from '../components/TopBar'
import { NFTElement } from '../components/NFTElement'

const Index = () => {
  return (
    <Container maxW='container.md'>
      <TopBar />
      <NFTElement />
    </Container>
  )
}

export default Index
