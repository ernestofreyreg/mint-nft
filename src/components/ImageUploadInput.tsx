import { Button, Text, Box, Flex } from '@chakra-ui/react'
import * as React from 'react'
import { useDropzone } from 'react-dropzone'

interface ImageUploadInputProps {
  value: string | ArrayBuffer | null
  onChange: (value: string | ArrayBuffer | null) => void
}

export const ImageUploadInput: React.FC<ImageUploadInputProps> = ({
  value,
  onChange,
}) => {
  const onDrop = acceptedFiles => {
    if (acceptedFiles.length > 0) {
      const fr = new FileReader()
      fr.onload = function () {
        onChange(fr.result)
      }
      fr.readAsArrayBuffer(acceptedFiles[0])
    }
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  const image = React.useMemo(() => {
    if (value) {
      return URL.createObjectURL(new Blob([value]))
    }
    return null
  }, [value])

  return (
    <Box>
      <Box
        {...getRootProps()}
        bg='gray.100'
        borderRadius={6}
        padding={2}
        height='100%'
        display='flex'
        alignItems='center'
      >
        <input {...getInputProps()} />
        {image && <img src={image} />}
        {!image && (
          <Box w='100%'>
            {isDragActive ? (
              <Text fontSize='sm' width='100%' align='center'>
                Drop the files here ...
              </Text>
            ) : (
              <Text fontSize='sm' width='100%' align='center'>
                Drag 'n' drop some files here, or click to select files
              </Text>
            )}
          </Box>
        )}
      </Box>
      {image && (
        <Button size='xs' onClick={() => onChange(null)}>
          Remove Image
        </Button>
      )}
    </Box>
  )
}
