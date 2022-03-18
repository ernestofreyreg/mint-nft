import { Grid, GridItem } from '@chakra-ui/react'
import * as React from 'react'
import { ImageUploadInput } from './ImageUploadInput'

export const NFTElement: React.FC = () => {
  const [image, setImage] = React.useState(null)

  return (
    <Grid templateColumns='1fr 2fr' gap={6}>
      <GridItem w='100%' h='10'>
        <ImageUploadInput value={image} onChange={setImage} />
      </GridItem>
      <GridItem w='100%' h='10' bg='blue.500'>
        Form
      </GridItem>
    </Grid>
  )
}
