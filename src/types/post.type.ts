import { PostStatusEnum, PostTypeEnum } from './enums/post.enum'
import { UserType } from './user.type'

export type AddPostType = {
  fileName: string
  fileUrl: string
  type: PostTypeEnum
  userId: string
  fileSize: string
}

export type PostType = {
  id: string
  fileName: string
  fileUrl: string
  type: PostTypeEnum
  user: UserType
  createdAt: string
  fileSize: string
  status: PostStatusEnum
}
