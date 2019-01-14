import { Album, Photo } from '~/models'

export interface IAblumDetailState {
  album: Album | null
  photos: Photo[] | null
}
