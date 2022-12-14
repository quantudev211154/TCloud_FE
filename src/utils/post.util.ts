import { PostTypeEnum } from '../types/enums/post.enum'

export const generateFirebaseFilename = (filename: string) => {
  let result: string = ''

  const splitedFilename = filename.split('.')

  for (let i = 0; i < splitedFilename.length - 1; ++i) {
    if (i === 0) result = result.concat(splitedFilename[i])
    else result = result.concat('.', splitedFilename[i])
  }

  result = result.concat(
    '-',
    new Date().getTime().toString(),
    '.',
    splitedFilename[splitedFilename.length - 1]
  )

  return result
}

export const getTypeOfFile = (filename: string): PostTypeEnum => {
  const imageRegex = /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i
  const videoRegex = /\.(mp4|avi)$/i

  if (imageRegex.test(filename)) return PostTypeEnum.IMAGE
  else if (videoRegex.test(filename)) return PostTypeEnum.VIDEO

  return PostTypeEnum.FILE
}
