import { NextApiRequest, NextApiResponse } from 'next'
import nextConnect from 'next-connect'
import multer from 'multer'
import { NFTStorage, File } from 'nft.storage'

const token = process.env.NFT_STORAGE_API_KEY

const uploadApi = nextConnect<
  NextApiRequest & { files: multer.File[] },
  NextApiResponse
>({
  onError: (error, _req, res) => {
    res.status(500)
    res.json({ error })
  },
})

const upload = multer({
  storage: multer.memoryStorage(),
})

uploadApi.use(upload.array('files'))

const erc1155Metadata = (nft: any, imageCid: string, index: number) => ({
  name: nft.name,
  description: nft.description,
  image: `ipfs://${imageCid}/image-${index}`,
})

uploadApi.post(async (req, res) => {
  const files = req.files
  const nfts = JSON.parse(req.body.nfts)
  const nftStorage = new NFTStorage({ token })

  const imageCid = await nftStorage.storeDirectory(
    files.map((file, index) => new File([file.buffer], `image-${index}`)),
  )
  const imageStatus = await nftStorage.status(imageCid)

  const cid = await nftStorage.storeDirectory(
    nfts.map(
      (nft, index) =>
        new File(
          [JSON.stringify(erc1155Metadata(nft, imageCid, index))],
          `nft-${index}`,
        ),
    ),
  )
  const status = await nftStorage.status(cid)

  res.json({ imageCid, imageStatus, cid, status })
})

export default uploadApi

export const config = {
  api: {
    bodyParser: false,
  },
}
