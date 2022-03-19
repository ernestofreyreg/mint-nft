import { DeleteIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
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
}

export const NFTElement: React.FC<NFTElementProps> = ({
  value,
  onChange,
  onDelete,
}) => {
  return (
    <SimpleGrid columns={{ sm: 1, md: 2 }} gap={2} width='100%'>
      <Box>
        <Flex direction='row' gap={1} height='100%'>
          <Box>
            <Button size='xs' colorScheme='red' onClick={onDelete}>
              <DeleteIcon />
            </Button>
          </Box>
          <Box flexGrow={1}>
            <ImageUploadInput
              value={value.image}
              onChange={image => onChange({ ...value, image })}
            />
          </Box>
        </Flex>
      </Box>
      <Box>
        <Box padding={2}>
          <VStack gap={2}>
            <FormControl>
              <FormLabel size='sm'>Name</FormLabel>
              <Input
                value={value.name}
                onChange={ev => onChange({ ...value, name: ev.target.value })}
                size='sm'
              />
            </FormControl>

            <FormControl>
              <FormLabel size='sm'>Description</FormLabel>
              <Input
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
                <NumberInputField />
              </NumberInput>
            </FormControl>
          </VStack>
        </Box>
      </Box>
    </SimpleGrid>
  )
}
