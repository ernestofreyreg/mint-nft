import { Box, Button, Flex, Progress } from '@chakra-ui/react'
import * as React from 'react'

interface TopBarProps {
  onMint: () => void
  isMinting: boolean
  progress: { total: number; current: number }
}

export const TopBar: React.FC<TopBarProps> = ({
  onMint,
  isMinting,
  progress,
}) => {
  return (
    <Flex direction='row' justify='space-between' align='center'>
      <Box>
        <Button
          colorScheme='teal'
          size='lg'
          onClick={onMint}
          isLoading={isMinting}
        >
          Mint
        </Button>
      </Box>
      {isMinting && (
        <Box flex={1}>
          <Progress
            size='sm'
            value={progress.current}
            max={progress.total}
            min={0}
          />
        </Box>
      )}
    </Flex>
  )
}
