import { Api } from '~/models/const/api'
import { NuxtKeys } from '~/models/const/nuxt.keys'
import { StoreKeys } from '~/models/const/store.keys'
import { Todo } from '~/models/todo.model'

export const state = () => {
  return {
    [StoreKeys.shared.store.DATA]: null,
    [StoreKeys.shared.store.LOADING]: true
  }
}

export const getters = {
  [StoreKeys.shared.getters.COUNT]: (STATE: any): number => {
    const stateData: Todo[] = STATE[StoreKeys.shared.store.DATA]
    if (stateData == null) {
      return 0
    }
    return stateData.length
  }
}

export const mutations = {
  [StoreKeys.shared.mutations.SET_DATA](STATE: any, data: Todo[]): void {
    STATE[StoreKeys.shared.store.DATA] = data
  },

  [StoreKeys.shared.mutations.SET_LOADING](STATE: any, loading: boolean): void {
    STATE[StoreKeys.shared.store.LOADING] = loading
  },

  [StoreKeys.todo.mutations.TOGGLE_TODO_COMPLETE](
    STATE: any,
    todo: Todo
  ): void {
    const stateData: Todo[] = STATE[StoreKeys.shared.store.DATA]
    const todoMatches = stateData.filter((x: Todo) => x === todo)

    for (todo of todoMatches) {
      todo.completed = !todo.completed
    }
  },

  [StoreKeys.todo.mutations.REMOVE_TODO](STATE: any, todo: Todo): void {
    const stateData: Todo[] = STATE[StoreKeys.shared.store.DATA]
    const matchIndices = stateData
      .filter((x: Todo) => x === todo)
      .map((x: Todo) => stateData.indexOf(x))

    for (const index of matchIndices) {
      stateData.splice(index, 1)
    }
  }
}

export const actions = {
  [StoreKeys.shared.actions.CLEAR](context: any): void {
    this.commit(StoreKeys.shared.mutations.SET_DATA, [])
  },

  async [StoreKeys.shared.actions.INITIALIZE](context: any): Promise<Todo[]> {
    context.commit(StoreKeys.shared.mutations.SET_LOADING, true)

    const todos = await Api.loadTodosAsync()

    context.commit(StoreKeys.shared.mutations.SET_DATA, todos)
    context.commit(StoreKeys.shared.mutations.SET_LOADING, false)

    return todos
  }

  // async [NuxtKeys.store.actions.nuxtServerInit](context: any): Promise<Todo[]> {
  //   return await this[StoreKeys.shared.actions.INITIALIZE](context)
  // }
}
