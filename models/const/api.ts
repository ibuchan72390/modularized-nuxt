import axios, { AxiosResponse } from 'axios'
import { Album } from '../album.model'
import { Photo } from '../photo.model'
import { Post } from '../post.model'
import { Todo } from '../todo.model'
import { User } from '../user.model'

const baseUrl = 'https://jsonplaceholder.typicode.com/'

// API Calls
async function loadAlbumsAsync(): Promise<Album[]> {
  return await getAsync<Album>(baseUrl + 'albums')
}

async function loadPhotosAsync(): Promise<Photo[]> {
  return await getAsync<Photo>(baseUrl + 'photos')
}

async function loadPostsAsync(): Promise<Post[]> {
  return await getAsync<Post>(baseUrl + 'posts')
}

async function loadTodosAsync(): Promise<Todo[]> {
  return await getAsync<Todo>(baseUrl + 'todos')
}

async function loadUsersAsync(): Promise<User[]> {
  return await getAsync<User>(baseUrl + 'users')
}

// Helper Methods
async function getAsync<T>(url: string): Promise<T[]> {
  const response: AxiosResponse<T[]> = await axios.get<T[]>(url)
  return response.data
}

export const Api = {
  loadAlbumsAsync,
  loadPhotosAsync,
  loadPostsAsync,
  loadTodosAsync,
  loadUsersAsync
}
