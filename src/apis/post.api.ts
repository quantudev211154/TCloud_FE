import { ADD_POST_API, GET_POSTS_API } from '../constants/api.constant'
import { PostStatusEnum } from '../types/enums/post.enum'
import { AddPostType, PostType } from '../types/post.type'
import http from '../utils/http.util'

export const addPost = (data: AddPostType) => {
  return http.post(ADD_POST_API, data)
}

export const getPosts = (userId?: string, status?: PostStatusEnum) => {
  if (!userId) return Promise.reject('User id must be not undefined')
  return http.get(`${GET_POSTS_API}${userId}${!!status ? `/${status}` : ''}`)
}
