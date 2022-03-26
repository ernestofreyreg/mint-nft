import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react'
import * as React from 'react'
import { useAccount, useConnect } from 'wagmi'
import { WalletLogo } from './WalletLogo'

interface WalletOptionsModalProps {
  isOpen: boolean
  onClose: () => void
}

export const WalletOptionsModal: React.FC<WalletOptionsModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [{ data: connectData, loading: connectDataLoading, error }, connect] =
    useConnect()

  const [{ data: accountData }] = useAccount()

  React.useEffect(() => {
    if (accountData) {
      onClose()
    }
  }, [accountData, onClose])

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Connect your Wallet</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {connectData.connectors.map(connector => (
            <Box
              key={connector.id}
              display='flex'
              flexDirection='column'
              marginBottom={3}
            >
              <Button
                isLoading={connectDataLoading}
                disabled={!connector.ready}
                onClick={() => {
                  connect(connector)
                }}
                leftIcon={<WalletLogo logo={connector.id} />}
              >{`${connector.name}${
                !connector.ready ? ' (unsopported)' : ''
              }`}</Button>
            </Box>
          ))}

          {error && (
            <Alert status='error'>
              <AlertIcon />
              <AlertTitle mr={2}>Error!</AlertTitle>
              <AlertDescription>
                {error?.message ?? 'Failed to connect'}
              </AlertDescription>
            </Alert>
          )}
        </ModalBody>

        <ModalFooter>
          <Button onClick={onClose} mr={3}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
