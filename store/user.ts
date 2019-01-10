import { GetterUtility } from '../util/getters-util'
import { ActionTree, GetterTree, MutationTree } from 'vuex'
import { Api } from '~/models/const/api'
import { StoreKeys } from '~/models/const/store.keys'
import { User } from '~/models/entity/User'
import { IUserState } from '~/models/state/IUserState'
import { ActionsUtility } from '../util/actions-util'

export const state = (): IUserState => {
  return {
    [StoreKeys.shared.store.data]: null,
    [StoreKeys.shared.store.loading]: true
  } as any
}

export const getters: GetterTree<IUserState, IUserState> = {
  [StoreKeys.shared.getters.count]: (STATE: any): number => {
    const stateData: User[] = STATE[StoreKeys.shared.store.data]
    if (stateData == null) {
      return 0
    }
    return stateData.length
  },

  // Getter Functions
  // https://vuex.vuejs.org/guide/getters.html#method-style-access
  [StoreKeys.shared.getters.getByIdFn]: (STATE: IUserState) => {
    return GetterUtility.getByIdFn(STATE)
  }
}

export const mutations: MutationTree<IUserState> = {
  [StoreKeys.shared.mutations.setData](STATE: IUserState, data: User[]): void {
    STATE[StoreKeys.shared.store.data] = data
  },

  [StoreKeys.shared.mutations.setLoading](
    STATE: IUserState,
    loading: boolean
  ): void {
    STATE[StoreKeys.shared.store.loading] = loading
  }
}

export const actions: ActionTree<IUserState, IUserState> = {
  [StoreKeys.shared.actions.clear](context: any): void {
    context.commit(StoreKeys.shared.mutations.setData, [])
  },

  async [StoreKeys.shared.actions.initialize](context: any): Promise<void> {
    await ActionsUtility.initializeAsync(context, Api.loadUsersAsync)
  }
}
