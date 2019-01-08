// Call this the expected store "interface"
const shared = {
  actions: {
    CLEAR: 'CLEAR',
    INITIALIZE: 'INITIALIZE'
  },
  getters: {
    COUNT: 'COUNT'
  },
  mutations: {
    SET_DATA: 'SET_DATA',
    SET_LOADING: 'SET_LOADING'
  },
  store: {
    // These can't be made into key refs,
    // just make sure they match on every store
    DATA: 'DATA',
    LOADING: 'LOADING'
  }
}

/**
 * This should lay out each of our store-specific keys
 */
const album = {}

const photo = {}

const post = {}

const todo = {
  mutations: {
    CREATE_TODO: 'CREATE_TODO',
    REMOVE_TODO: 'REMOVE_TODO',
    TOGGLE_TODO_COMPLETE: 'TOGGLE_TODO_COMPLETE'
  }
}

const user = {}

export const StoreKeys = {
  album,
  photo,
  post,
  shared,
  todo
}
