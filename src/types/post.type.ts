import { PostTypeEnum } from './enums/post-type.enum'

export type AddPostType = {
  fileName: string
  fileUrl: string
  type: PostTypeEnum
  userId: string
}
