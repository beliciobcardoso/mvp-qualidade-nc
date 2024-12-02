import { CONFIG } from '@/config'
import validateImageType from '@/lib/validateImageType'
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'

export const clientS3 = new S3Client({
  region: CONFIG.providers.storage.region,
  endpoint: CONFIG.providers.storage.endpoint,
  credentials: {
    accessKeyId: CONFIG.providers.storage.accessKeyId,
    secretAccessKey: CONFIG.providers.storage.secretAccessKey,
  },
})

export const uploadObject = async (
  key: string,
  body: Buffer | Uint8Array | Blob | string,
  file: File,
) => {
  const command = new PutObjectCommand({
    Bucket: CONFIG.providers.storage.bucket,
    Key: key,
    Body: body,
    ContentType: file.type,
  })

  if (validateImageType(file)) {
    try {
      await clientS3.send(command)
      const url = `${CONFIG.providers.storage.endpoint}/${CONFIG.providers.storage.bucket}/${key}`
      return url
    } catch (error) {
      console.log(error)
      return null
    }
  } else {
    return null
  }
}
