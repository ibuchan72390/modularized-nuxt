import { PostApi } from './../_api/PostApi'
import { MutationTree, GetterTree, ActionTree } from 'vuex'
import { IPostDetailState } from '../_models/IPostDetailState'
import { Comment, Post, StoreKeys } from '~/models'

export const state = (): IPostDetailState => {
  return {
    post: null,
    comments: null
  }
}

export const mutations: MutationTree<IPostDetailState> = {
  [StoreKeys.postDetail.mutations.setPost](
    STATE: IPostDetailState,
    post: Post
  ): void {
    STATE.post = post
  },

  [StoreKeys.postDetail.mutations.setComments](
    STATE: IPostDetailState,
    comments: Comment[]
  ): void {
    STATE.comments = comments
  }
}

export const getters: GetterTree<IPostDetailState, IPostDetailState> = {
  [StoreKeys.postDetail.getters.loading](STATE: IPostDetailState): boolean {
    return STATE.post === null || STATE.comments === null
  }
}

export const actions: ActionTree<IPostDetailState, IPostDetailState> = {
  async [StoreKeys.shared.actions.initialize](
    context: any,
    postId: number
  ): Promise<void> {
    context.commit(StoreKeys.postDetail.mutations.setPost, null)
    context.commit(StoreKeys.postDetail.mutations.setComments, null)

    // What is the best pattern here ???
    // 1. Load and assign one at a time
    // const post = await PostApi.loadPostByIdAsync(postId)
    // context.commit(StoreKeys.postDetail.mutations.setPost, post)

    // const comments = await PostApi.loadCommentsByPostAsync(postId)
    // context.commit(StoreKeys.postDetail.mutations.setComments, comments)

    console.log('Initializing Post Detail')

    // 2. Load both, then assign both
    const post = await PostApi.loadPostByIdAsync(postId)
    const comments = await PostApi.loadCommentsByPostAsync(postId)

    context.commit(StoreKeys.postDetail.mutations.setPost, post)
    context.commit(StoreKeys.postDetail.mutations.setComments, comments)

    // 3. Kick off an async task that fires the commit so neither block each other
    // await Promise.all([
    //   new Promise(async (resolve, reject) => {
    //     const post = await PostApi.loadPostByIdAsync(postId)
    //     context.commit(StoreKeys.postDetail.mutations.setPost, post)
    //     resolve()
    //   }),
    //   new Promise(async (resolve, reject) => {
    //     const comments = await PostApi.loadCommentsByPostAsync(postId)
    //     context.commit(StoreKeys.postDetail.mutations.setComments, comments)
    //     resolve()
    //   })
    // ])
  }
}

export default {
  actions,
  getters,
  mutations,
  namespaced: true,
  state
}
