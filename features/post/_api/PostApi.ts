import axios, { AxiosResponse } from 'axios'
import { Post, Comment } from '~/models'

async function loadPostsAsync(): Promise<Post[]> {
  const response: AxiosResponse<Post[]> = await axios.get<Post[]>(
    'https://jsonplaceholder.typicode.com/posts'
  )
  return response.data
}

async function loadPostByIdAsync(postId: number): Promise<Post[]> {
  const response: AxiosResponse<Post[]> = await axios.get<Post[]>(
    'https://jsonplaceholder.typicode.com/posts/' + postId
  )
  return response.data
}

async function loadCommentsAsync(): Promise<Comment[]> {
  const response: AxiosResponse<Comment[]> = await axios.get<Comment[]>(
    'https://jsonplaceholder.typicode.com/comments'
  )
  return response.data
}

async function loadCommentsByPostAsync(postId: number): Promise<Comment[]> {
  const response: AxiosResponse<Comment[]> = await axios.get<Comment[]>(
    'https://jsonplaceholder.typicode.com/comments?postId=' + postId
  )
  return response.data
}

export const PostApi = {
  loadCommentsAsync,
  loadCommentsByPostAsync,
  loadPostByIdAsync,
  loadPostsAsync
}
