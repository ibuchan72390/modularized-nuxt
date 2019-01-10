// Call this the expected store "interface"
const shared = {
  actions: {
    clear: 'clear',
    initialize: 'initialize'
  },
  getters: {
    count: 'count',
    getByIdFn: 'getByIdFn' // Suffix of -FN should indicate this is functional declration
  },
  mutations: {
    setData: 'SET_DATA',
    setLoading: 'SET_LOADING'
  },
  store: {
    // These can't be made into key refs,
    // just make sure they match on every store
    data: 'data',
    loading: 'loading'
  }
}

/**
 * This should lay out each of our store-specific keys
 */
const album = {}

const photo = {
  actions: {
    initAlbumId: 'initAlbumId'
  },
  getters: {
    getByAlbumIdFn: 'getByAlbumIdFn'
  }
}

const post = {}

const todo = {
  mutations: {
    createTodo: 'CREATE_TODO',
    removeTodo: 'REMOVE_TODO',
    toggleTodoComplete: 'TOGGLE_TODO_COMPLETE'
  }
}

const todoForm = {
  actions: {
    create: 'create'
  },
  getters: {
    submitDisabled: 'submitDisabled'
  },
  mutations: {
    setTitleHtml: 'setTitleHtml'
  }
}

const user = {}

export const StoreKeys = {
  album,
  photo,
  post,
  shared,
  todo,
  todoForm
}
