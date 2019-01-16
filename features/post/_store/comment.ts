import { PostApi } from '../_api/PostApi'
import { MutationTree, GetterTree, ActionTree } from 'vuex'
import { StoreKeys } from '../../../models/const/store.keys'
import { ICommentState } from '../_models/ICommentState'

export const state = (): ICommentState => {
  return {
    data: null
  }
}

export const getters: GetterTree<ICommentState, ICommentState> = {
  loading(STATE: ICommentState): boolean {
    return STATE.data === null
  }
}

export const mutations: MutationTree<ICommentState> = {
  [StoreKeys.shared.mutations.setData](
    STATE: ICommentState,
    data: Comment[]
  ): void {
    STATE.data = data
  }
}

export const actions: ActionTree<ICommentState, ICommentState> = {
  async [StoreKeys.shared.actions.initialize](context: any): Promise<void> {
    context.commit(StoreKeys.shared.mutations.setData, null)
    const comments = await PostApi.loadCommentsAsync()
    context.commit(StoreKeys.shared.mutations.setData, comments)
  }
}

export default {
  actions,
  getters,
  mutations,
  namespaced: true,
  state
}
