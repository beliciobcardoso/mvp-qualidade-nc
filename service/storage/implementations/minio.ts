import { CONFIG } from '@/config'

const minioClient = new Minio.Client({
  endPoint: CONFIG.providers.storage.endpoint,
  port: 9000,
  useSSL: true,
  accessKey: CONFIG.providers.storage.accessKeyId,
  secretKey: CONFIG.providers.storage.secretAccessKey,
})

// Upload the file with fPutObject
// If an object with the same name exists,
// it is updated with new data
export async function uploadFile(file: File) {
  console.log(file)

  // await minioClient.putObject(bucket, destinationObject, file)
}
