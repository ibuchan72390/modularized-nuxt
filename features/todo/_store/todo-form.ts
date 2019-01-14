import { ActionTree, GetterTree, MutationTree, Dictionary } from 'vuex'
import { Todo, NamespaceKeys, StoreKeys } from '~/models'
import { ITodoFormState } from '~/models'
import { KeyValue } from '~/models/param/KeyValue'
import { StringUtil } from '~/util'

export const state = (): ITodoFormState => {
  return {
    data: {},
    maxLength: 25
  }
}

export const actions: ActionTree<ITodoFormState, ITodoFormState> = {
  // For hitting "add" on the form
  [StoreKeys.todoForm.actions.create](context: any, key: string): void {
    const msgTarget =
      NamespaceKeys.todo + '/' + StoreKeys.todo.mutations.createTodo

    // tslint:disable-next-line:no-console
    console.log('Dispatching message to: ' + msgTarget)

    // Cross namespace executions must target root
    context.commit(msgTarget, context.state.data[key], { root: true })

    const kv = new KeyValue<Todo>(key, new Todo())
    context.commit(StoreKeys.shared.mutations.setData, kv)
  },

  // For creating the component and generating a key
  [StoreKeys.todoForm.actions.initializeForm](context: any): string {
    const disallowed = Object.keys(context.state.data)
    const newKey = StringUtil.GetUniqueKey(disallowed)
    const setData = new KeyValue<Todo>(newKey, new Todo())
    context.commit(StoreKeys.shared.mutations.setData, setData)
    return newKey
  }
}

export const getters: GetterTree<ITodoFormState, ITodoFormState> = {
  // For getting our initialized store title
  [StoreKeys.todoForm.getters.getKeyedItemTitleFn](
    STATE: ITodoFormState
  ): (key: string) => string {
    return (key: string) => {
      return STATE.data[key].title
    }
  },

  // For getting the length of our currnet input
  [StoreKeys.todoForm.getters.inputLengthFn](
    STATE: ITodoFormState
  ): (key: string) => number {
    return (key: string) => {
      return STATE.data[key].title.length
    }
  },

  // For determining if our current input can be submitted
  [StoreKeys.todoForm.getters.submitDisabledFn](
    STATE: ITodoFormState
  ): (key: string) => boolean {
    return (key: string) => {
      const titleLength = STATE.data[key].title.length
      const disabled = titleLength === 0 || titleLength > STATE.maxLength
      return disabled
    }
  },

  [StoreKeys.todoForm.getters.errorsFn](
    STATE: ITodoFormState
  ): (key: string) => string[] {
    return (key: string): string[] => {
      const results: string[] = []
      const target = STATE.data[key]

      if (target.title.length === 0) {
        results.push('Unable to submit an empty todo')
      }

      if (target.title.length > STATE.maxLength) {
        results.push(
          'Todo length must be below ' + STATE.maxLength + ' characters!'
        )
      }

      return results
    }
  }
}

export const mutations: MutationTree<ITodoFormState> = {
  [StoreKeys.shared.mutations.setData](
    STATE: ITodoFormState,
    keyTarget: KeyValue<Todo>
  ): void {
    // This is the crucial point of complexity when working with the keyed store
    // https://vuejs.org/v2/guide/reactivity.html#Change-Detection-Caveats
    // STATE.data[keyTarget.key] = keyTarget.value
    STATE.data = Object.assign({}, STATE.data, {
      [keyTarget.key]: keyTarget.value
    })
  },

  [StoreKeys.todoForm.mutations.removeEntry](
    STATE: ITodoFormState,
    key: string
  ): void {
    delete STATE.data[key]
  },

  [StoreKeys.todoForm.mutations.setTitle](
    STATE: ITodoFormState,
    keyTarget: KeyValue<string>
  ): void {
    STATE.data[keyTarget.key].title = keyTarget.value
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
