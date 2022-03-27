import { DeleteIcon, ExternalLinkIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Link,
  NumberInput,
  NumberInputField,
  SimpleGrid,
  VStack,
} from '@chakra-ui/react'
import * as React from 'react'
import { NFTElementData } from '../types'
import { ImageUploadInput } from './ImageUploadInput'

interface NFTElementProps {
  value: NFTElementData
  onChange: (value: NFTElementData) => void
  onDelete: () => void
  contractAddress?: string
  index: number
  isTestnet?: boolean
  isPolygon?: boolean
}

export const NFTElement: React.FC<NFTElementProps> = ({
  value,
  onChange,
  onDelete,
  contractAddress,
  index,
  isTestnet,
  isPolygon,
}) => {
  return (
    <SimpleGrid columns={{ sm: 1, md: 2 }} gap={2} width='100%'>
      <Box>
        <Flex direction='row' gap={1} height='100%'>
          {!contractAddress && (
            <Box>
              <Button size='xs' colorScheme='red' onClick={onDelete}>
                <DeleteIcon />
              </Button>
            </Box>
          )}
          <Box flexGrow={1}>
            <ImageUploadInput
              value={value.image}
              onChange={image => onChange({ ...value, image })}
              readOnly={!!contractAddress}
            />
          </Box>
        </Flex>
      </Box>
      <Box>
        <Box padding={2} marginBottom={3}>
          <VStack gap={2}>
            <FormControl>
              <FormLabel size='sm'>Name</FormLabel>
              <Input
                readOnly={!!contractAddress}
                value={value.name}
                onChange={ev => onChange({ ...value, name: ev.target.value })}
                size='sm'
              />
            </FormControl>

            <FormControl>
              <FormLabel size='sm'>Description</FormLabel>
              <Input
                readOnly={!!contractAddress}
                value={value.description}
                onChange={ev =>
                  onChange({ ...value, description: ev.target.value })
                }
                size='sm'
              />
            </FormControl>

            <FormControl>
              <FormLabel size='sm'>Quantity</FormLabel>
              <NumberInput
                value={value.quantity}
                onChange={(_, quantity) => onChange({ ...value, quantity })}
                size='sm'
              >
                <NumberInputField readOnly={!!contractAddress} />
              </NumberInput>
            </FormControl>
          </VStack>
        </Box>
        {contractAddress && (
          <Box padding={2}>
            <Link
              isExternal
              color='blue.500'
              href={`https://${isTestnet ? 'testnets.' : ''}opensea.io/assets/${
                isPolygon ? 'matic/' : ''
              }${contractAddress}/${index}`}
            >
              View on OpenSea <ExternalLinkIcon mx={2} />
            </Link>
          </Box>
        )}
      </Box>
    </SimpleGrid>
  )
}
