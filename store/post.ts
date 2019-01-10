import { GetterUtility, ActionsUtility } from '~/util'
import { ActionTree, GetterTree, MutationTree } from 'vuex'
import { Api, StoreKeys, Post, IPostState } from '~/models'

export const state = (): IPostState => {
  return {
    [StoreKeys.shared.store.data]: null,
    [StoreKeys.shared.store.loading]: true
  } as any
}

export const getters: GetterTree<IPostState, IPostState> = {
  [StoreKeys.shared.getters.count]: (STATE: any): number => {
    const stateData: Post[] = STATE[StoreKeys.shared.store.data]
    if (stateData == null) {
      return 0
    }
    return stateData.length
  },

  // Getter Functions
  // https://vuex.vuejs.org/guide/getters.html#method-style-access
  [StoreKeys.shared.getters.getByIdFn]: (STATE: IPostState) => {
    return GetterUtility.getByIdFn(STATE)
  }
}

export const mutations: MutationTree<IPostState> = {
  [StoreKeys.shared.mutations.setData](STATE: IPostState, data: Post[]): void {
    STATE[StoreKeys.shared.store.data] = data
  },

  [StoreKeys.shared.mutations.setLoading](
    STATE: IPostState,
    loading: boolean
  ): void {
    STATE[StoreKeys.shared.store.loading] = loading
  }
}

export const actions: ActionTree<IPostState, IPostState> = {
  [StoreKeys.shared.actions.clear](context: any): void {
    context.commit(StoreKeys.shared.mutations.setData, [])
  },

  async [StoreKeys.shared.actions.initialize](context: any): Promise<Post[]> {
    return await ActionsUtility.initializeAsync(context, Api.loadPostsAsync)
  }
}
