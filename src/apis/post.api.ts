import { ADD_POST_API } from '../constants/api.constant'
import { AddPostType } from '../types/post.type'
import http from '../utils/http.util'

export const addPost = (data: AddPostType) => {
  return http.post(ADD_POST_API, data)
}
