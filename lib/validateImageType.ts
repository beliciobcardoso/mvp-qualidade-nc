export default function validateImageType(file: File) {
  if (file.type.startsWith('image/')) return true
  console.log('Please select a valid image')
  return false
}
