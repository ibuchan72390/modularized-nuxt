import { ActionTree, GetterTree, MutationTree } from 'vuex'
import { GetterUtility } from '~/util'
import { Album, StoreKeys } from '~/models'
import { IAlbumState } from '../_models/IAlbumState'
import { PhotoApi } from '../_api/PhotoApi'

export const state = (): IAlbumState => {
  return {
    [StoreKeys.shared.store.data]: null,
    [StoreKeys.shared.store.loading]: true
  } as any
}

export const getters: GetterTree<IAlbumState, IAlbumState> = {
  // Direct Getters
  [StoreKeys.shared.getters.count]: (STATE: IAlbumState): number => {
    const stateData: Album[] = STATE[StoreKeys.shared.store.data]
    if (stateData == null) {
      return 0
    }
    return stateData.length
  }
}

export const mutations: MutationTree<IAlbumState> = {
  [StoreKeys.shared.mutations.setData](
    STATE: IAlbumState,
    data: Album[]
  ): void {
    STATE[StoreKeys.shared.store.data] = data
  },

  [StoreKeys.shared.mutations.setLoading](
    STATE: IAlbumState,
    loading: boolean
  ): void {
    STATE[StoreKeys.shared.store.loading] = loading
  }
}

export const actions: ActionTree<IAlbumState, IAlbumState> = {
  [StoreKeys.shared.actions.clear](context: any): void {
    context.commit(StoreKeys.shared.mutations.setData, [])
  },

  async [StoreKeys.shared.actions.initialize](context: any): Promise<Album[]> {
    context.commit(StoreKeys.shared.mutations.setLoading, true)

    const todos = await PhotoApi.loadAlbumsAsync()

    context.commit(StoreKeys.shared.mutations.setData, todos)
    context.commit(StoreKeys.shared.mutations.setLoading, false)

    return todos
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
