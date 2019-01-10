import { ActionTree, GetterTree, MutationTree } from 'vuex'
import { Todo, NamespaceKeys, StoreKeys } from '~/models'
import { ITodoFormState } from '~/models'
import { EventUtil } from '~/util/event-util'

export const state = (): ITodoFormState => {
  return {
    data: new Todo()
  }
}

export const actions: ActionTree<ITodoFormState, ITodoFormState> = {
  [StoreKeys.todoForm.actions.create](context: any): void {
    const msgTarget =
      NamespaceKeys.todo + '/' + StoreKeys.shared.actions.initialize

    // tslint:disable-next-line:no-console
    console.log('Dispatching message to: ' + msgTarget)

    // Cross namespace executions must target root
    context.dispatch(msgTarget, context.state.data, { root: true })
    context.commit(StoreKeys.shared.mutations.setData, new Todo())
  }
}

export const getters: GetterTree<ITodoFormState, ITodoFormState> = {
  [StoreKeys.todoForm.getters.submitDisabled](STATE: ITodoFormState): boolean {
    return STATE.data.title.length === 0
  }
}

export const mutations: MutationTree<ITodoFormState> = {
  [StoreKeys.shared.mutations.setData](
    STATE: ITodoFormState,
    todo: Todo
  ): void {
    STATE.data = todo
  },

  [StoreKeys.todoForm.mutations.setTitleHtml](
    STATE: ITodoFormState,
    event: any // This is a keyup event
  ): void {
    STATE.data.title = EventUtil.getEventValue(event)
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
