import { PostTypeEnum } from './enums/post-type.enum'
import { UserType } from './user.type'

export type AddPostType = {
  fileName: string
  fileUrl: string
  type: PostTypeEnum
  userId: string
}

export type PostType = {
  id: string
  fileName: string
  fileUrl: string
  type: PostTypeEnum
  user: UserType
  createdAt: string
}
