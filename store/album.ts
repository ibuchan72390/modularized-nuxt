import { ActionTree, GetterTree, MutationTree } from 'vuex'
import { GetterUtility } from '~/util'
import { Api, Album, StoreKeys, IAlbumState } from '~/models'

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
  },

  // Getter Functions
  // https://vuex.vuejs.org/guide/getters.html#method-style-access
  [StoreKeys.shared.getters.getByIdFn]: (
    STATE: IAlbumState
  ): ((id: number) => Album) => {
    return GetterUtility.getByIdFn<IAlbumState, Album>(STATE)
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

    const todos = await Api.loadAlbumsAsync()

    context.commit(StoreKeys.shared.mutations.setData, todos)
    context.commit(StoreKeys.shared.mutations.setLoading, false)

    return todos
  }
}
