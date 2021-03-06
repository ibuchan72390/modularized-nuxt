import { ActionTree, GetterTree, MutationTree } from 'vuex'
import { Photo, StoreKeys } from '~/models'
import { ActionsUtility } from '~/util'
import { IPhotoState } from '../_models/IPhotoState'
import { PhotoApi } from '../_api/PhotoApi'

export const state = (): IPhotoState => {
  return {
    [StoreKeys.shared.store.data]: null,
    [StoreKeys.shared.store.loading]: true
  } as any
}

export const getters: GetterTree<IPhotoState, IPhotoState> = {
  [StoreKeys.shared.getters.count]: (STATE: any): number => {
    const stateData: Photo[] = STATE[StoreKeys.shared.store.data]
    if (stateData == null) {
      return 0
    }
    return stateData.length
  },

  // Getter Functions
  // https://vuex.vuejs.org/guide/getters.html#method-style-access
  [StoreKeys.photo.getters.getByAlbumIdFn]: (STATE: IPhotoState) => {
    return (albumId: number): Photo[] => {
      const stateData: Photo[] = STATE[StoreKeys.shared.store.data]
      return stateData.filter(x => x.albumId === albumId)
    }
  }
}

export const mutations: MutationTree<IPhotoState> = {
  [StoreKeys.shared.mutations.setData](
    STATE: IPhotoState,
    data: Photo[]
  ): void {
    STATE[StoreKeys.shared.store.data] = data
  },

  [StoreKeys.shared.mutations.setLoading](
    STATE: IPhotoState,
    loading: boolean
  ): void {
    STATE[StoreKeys.shared.store.loading] = loading
  }
}

export const actions: ActionTree<IPhotoState, IPhotoState> = {
  [StoreKeys.shared.actions.clear](context: any): void {
    context.commit(StoreKeys.shared.mutations.setData, [])
  },

  async [StoreKeys.shared.actions.initialize](context: any): Promise<Photo[]> {
    return await ActionsUtility.initializeAsync(
      context,
      PhotoApi.loadPhotosAsync
    )
  },

  async [StoreKeys.photo.actions.initAlbumId](
    context: any,
    albumId: number
  ): Promise<Photo[]> {
    return await ActionsUtility.initializeAsync(context, () =>
      PhotoApi.loadPhotosByAlbumAsync(albumId)
    )
  }
}

export const namespaced = true

export default {
  actions,
  getters,
  mutations,
  namespaced,
  state
}
