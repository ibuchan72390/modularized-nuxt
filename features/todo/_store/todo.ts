import { ActionTree, GetterTree, MutationTree } from 'vuex'
import { StoreKeys, Todo, ITodoState } from '~/models'
import { ActionsUtility } from '~/util'
import { TodoApi } from '../_api/TodoApi'

export const state = (): ITodoState => {
  return {
    [StoreKeys.shared.store.data]: null,
    [StoreKeys.shared.store.loading]: true
  } as any
}

export const getters: GetterTree<ITodoState, ITodoState> = {
  [StoreKeys.shared.getters.count]: (STATE: any): number => {
    const stateData: Todo[] = STATE[StoreKeys.shared.store.data]
    if (stateData == null) {
      return 0
    }
    return stateData.length
  },

  // Getter Functions
  // https://vuex.vuejs.org/guide/getters.html#method-style-access
  [StoreKeys.shared.getters.getByIdFn]: (STATE: ITodoState) => {
    return (id: number) => {
      const matches = STATE.data.filter(x => x.id === id)
      if (matches.length === 0) {
        return null
      }
      return matches[0]
    }
  }
}

export const mutations: MutationTree<ITodoState> = {
  [StoreKeys.shared.mutations.setData](STATE: ITodoState, data: Todo[]): void {
    STATE[StoreKeys.shared.store.data] = data
  },

  [StoreKeys.shared.mutations.setLoading](
    STATE: ITodoState,
    loading: boolean
  ): void {
    STATE[StoreKeys.shared.store.loading] = loading
  },

  [StoreKeys.todo.mutations.createTodo](STATE: ITodoState, todo: Todo): void {
    const todos: Todo[] = STATE[StoreKeys.shared.store.data]
    todos.push(todo)
  },

  [StoreKeys.todo.mutations.toggleTodoComplete](
    STATE: ITodoState,
    todo: Todo
  ): void {
    const stateData: Todo[] = STATE[StoreKeys.shared.store.data]
    const todoMatches = stateData.filter((x: Todo) => x === todo)

    for (todo of todoMatches) {
      todo.completed = !todo.completed
    }
  },

  [StoreKeys.todo.mutations.removeTodo](STATE: ITodoState, todo: Todo): void {
    const stateData: Todo[] = STATE[StoreKeys.shared.store.data]
    const matchIndices = stateData
      .filter((x: Todo) => x === todo)
      .map((x: Todo) => stateData.indexOf(x))

    for (const index of matchIndices) {
      stateData.splice(index, 1)
    }
  }
}

export const actions: ActionTree<ITodoState, ITodoState> = {
  [StoreKeys.shared.actions.clear](context: any): void {
    context.commit(StoreKeys.shared.mutations.setData, [])
  },

  async [StoreKeys.shared.actions.initialize](context: any): Promise<void> {
    await ActionsUtility.initializeAsync(context, TodoApi.loadTodosAsync)
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
