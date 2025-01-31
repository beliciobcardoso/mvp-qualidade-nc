import { CONFIG } from '@/config/config'
import validateImageType from '@/lib/validateImageType'
import { DeleteObjectCommand, ListBucketsCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3'

export const clientS3 = new S3Client({
  region: CONFIG.providers.storage.region,
  endpoint: CONFIG.providers.storage.endpoint,
  credentials: {
    accessKeyId: CONFIG.providers.storage.accessKeyId,
    secretAccessKey: CONFIG.providers.storage.secretAccessKey,
  },
})

export const uploadObject = async (key: string, body: Buffer | Uint8Array | Blob | string, file: File) => {
  const listBucket = new ListBucketsCommand({})
  const result = await clientS3.send(listBucket)
  const bucketName = result.Buckets?.find((bucket) => bucket.Name === CONFIG.providers.storage.bucket)?.Name

  const keyName = `${bucketName}/${key}`

  const input = {
    Bucket: bucketName,
    Key: keyName,
    Body: body,
    ContentType: file.type,
  }

  const command = new PutObjectCommand(input)

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

export const deleteObject = async (url: string) => {
  const key = url.replace(`${CONFIG.providers.storage.endpoint}/${CONFIG.providers.storage.bucket}/`, '')

  const listBucket = new ListBucketsCommand({})
  const result = await clientS3.send(listBucket)
  const bucketName = result.Buckets?.find((bucket) => bucket.Name === CONFIG.providers.storage.bucket)?.Name

  const keyName = `${bucketName}/${key}`

  const command = new DeleteObjectCommand({
    Bucket: bucketName,
    Key: keyName,
  })

  try {
    await clientS3.send(command)
    return true
  } catch (error) {
    console.log(error)
    return false
  }
}
