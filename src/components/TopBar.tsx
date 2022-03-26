import { Box, Button, Flex, Progress, Text } from '@chakra-ui/react'
import * as React from 'react'
import { useAccount, useNetwork } from 'wagmi'
import { WalletOptionsModal } from './WalletOptionsModal'

interface TopBarProps {
  onMint: () => void
  isMinting: boolean
  progress: { total: number; current: number }
  contractAddress?: string
  onNewCollection: () => void
}

export const TopBar: React.FC<TopBarProps> = ({
  onMint,
  isMinting,
  progress,
  contractAddress,
  onNewCollection,
}) => {
  const [isWalletModalOpen, setIsWalletModalOpen] = React.useState(false)
  const [{ data: accountData }, disconnect] = useAccount()
  const [{ data: networkData }] = useNetwork()

  return (
    <Flex
      direction='row'
      justify='space-between'
      align='center'
      marginBottom={3}
      height={20}
    >
      <Box>
        {contractAddress ? (
          <Box>
            <Text fontSize='2xl'>NFT Collection Minted</Text>
            <Button size='xs' variant='outline' onClick={onNewCollection}>
              Create a new NFT Collection
            </Button>
          </Box>
        ) : (
          <Button
            colorScheme='teal'
            size='lg'
            onClick={onMint}
            isLoading={isMinting}
          >
            {networkData && networkData.chain
              ? `Mint on ${networkData.chain.name}`
              : 'Mint'}
          </Button>
        )}
      </Box>
      {isMinting && progress.total !== 0 && (
        <Box flex={1}>
          <Progress
            size='sm'
            value={progress.current}
            max={progress.total}
            min={0}
          />
        </Box>
      )}
      <Box>
        {accountData ? (
          <Button size='sm' onClick={disconnect}>
            Disconnect {accountData.address.substring(0, 6)}...
          </Button>
        ) : (
          <Button size='sm' onClick={() => setIsWalletModalOpen(true)}>
            Connect Wallet
          </Button>
        )}
      </Box>
      <WalletOptionsModal
        isOpen={isWalletModalOpen}
        onClose={() => setIsWalletModalOpen(false)}
      />
    </Flex>
  )
}
