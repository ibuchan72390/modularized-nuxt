import { Album, Photo } from '~/models'
import axios, { AxiosResponse } from 'axios'

async function loadAlbumByIdAsync(albumId: number): Promise<Album> {
  const response: AxiosResponse<Album> = await axios.get<Album>(
    'https://jsonplaceholder.typicode.com/albums?id=' + albumId
  )
  return response.data
}

async function loadAlbumsAsync(): Promise<Album[]> {
  const response: AxiosResponse<Album[]> = await axios.get<Album[]>(
    'https://jsonplaceholder.typicode.com/albums'
  )
  return response.data
}

async function loadPhotosAsync(): Promise<Photo[]> {
  const response: AxiosResponse<Photo[]> = await axios.get<Photo[]>(
    'https://jsonplaceholder.typicode.com/photos'
  )
  return response.data
}

async function loadPhotosByAlbumAsync(albumId: number): Promise<Photo[]> {
  const response: AxiosResponse<Photo[]> = await axios.get<Photo[]>(
    'https://jsonplaceholder.typicode.com/photos?albumId=' + albumId
  )
  return response.data
}

export const PhotoApi = {
  loadAlbumByIdAsync,
  loadAlbumsAsync,
  loadPhotosAsync,
  loadPhotosByAlbumAsync
}
