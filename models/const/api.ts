import axios, { AxiosResponse } from 'axios'
import { Album } from '../entity/Album'
import { Photo } from '../entity/Photo'
import { Post } from '../entity/Post'
import { User } from '../entity/User'

const baseUrl = 'https://jsonplaceholder.typicode.com/'

// API Calls
async function loadAlbumsAsync(): Promise<Album[]> {
  return await getAsync<Album>(baseUrl + 'albums')
}

async function loadPhotosAsync(): Promise<Photo[]> {
  return await getAsync<Photo>(baseUrl + 'photos')
}

async function loadPhotosByAlbumAsync(albumId: number): Promise<Photo[]> {
  return await getAsync<Photo>(baseUrl + 'photos?albumId=' + albumId)
}

async function loadPostsAsync(): Promise<Post[]> {
  return await getAsync<Post>(baseUrl + 'posts')
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
  loadPhotosByAlbumAsync,
  loadPostsAsync,
  loadUsersAsync
}
