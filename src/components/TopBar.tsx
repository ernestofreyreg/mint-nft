import { Box, Button } from '@chakra-ui/react'
import * as React from 'react'

export const TopBar: React.FC = () => {
  return (
    <Box>
      <Button colorScheme='teal' size='lg'>
        Mint
      </Button>
    </Box>
  )
}
