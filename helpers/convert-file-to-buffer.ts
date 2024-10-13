export async function convertFileToBuffer(file: File) {
  // Convert file to stream
  const stream = file.stream()

  // Convert stream to buffer
  const chunks = []

  const reader = stream.getReader()
  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    chunks.push(value)
  }

  const buffer = Buffer.concat(chunks)

  return buffer
}
