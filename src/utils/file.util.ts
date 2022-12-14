export const getSizeOfFile = (file: File): string => {
  const fileSize = file.size

  console.log(fileSize)

  if (fileSize < 100000)
    return Math.round((fileSize / 1024) * 1000) / 1000 + 'KB'
  else if (fileSize >= 1073741824)
    return Math.round((fileSize / Math.pow(1024, 3)) * 1000) / 1000 + 'GB'

  return Math.round((fileSize / Math.pow(1024, 2)) * 1000) / 1000 + 'MB'
}
