import { ActionTree, MutationTree, GetterTree } from 'vuex'
import { IAblumDetailState } from '../_models/IAlbumDetailState'
import { PhotoApi } from '../_api/PhotoApi'
import { Photo, StoreKeys, Album } from '~/models'

export const state = (): IAblumDetailState => {
  return {
    album: null,
    photos: null
  }
}

export const actions: ActionTree<IAblumDetailState, IAblumDetailState> = {
  async [StoreKeys.shared.actions.initialize](
    context: any,
    albumId: number
  ): Promise<void> {
    const photos = await PhotoApi.loadPhotosByAlbumAsync(albumId)
    context.commit(StoreKeys.albumDetail.mutations.setPhotos, photos)

    const album = await PhotoApi.loadAlbumByIdAsync(albumId)
    context.commit(StoreKeys.albumDetail.mutations.setAlbum, album)
  },

  [StoreKeys.shared.actions.clear](context: any): void {
    context.commit(StoreKeys.albumDetail.mutations.setPhotos, null)
    context.commit(StoreKeys.albumDetail.mutations.setAlbum, null)
  }
}

export const getters: GetterTree<IAblumDetailState, IAblumDetailState> = {
  [StoreKeys.albumDetail.getters.initialized](
    STATE: IAblumDetailState
  ): boolean {
    return STATE.album != null && STATE.photos != null
  },

  [StoreKeys.albumDetail.getters.photoCount](STATE: IAblumDetailState): number {
    if (STATE.photos == null) {
      return 0
    }
    return STATE.photos.length
  }
}

export const mutations: MutationTree<IAblumDetailState> = {
  [StoreKeys.albumDetail.mutations.setPhotos](
    STATE: IAblumDetailState,
    album: Album
  ): void {
    STATE.album = album
  },

  [StoreKeys.albumDetail.mutations.setPhotos](
    STATE: IAblumDetailState,
    photos: Photo[]
  ): void {
    STATE.photos = photos
  }
}

const namespaced = true

export default {
  actions,
  getters,
  mutations,
  namespaced,
  state
}
