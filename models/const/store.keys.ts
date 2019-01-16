// Call this the expected store "interface"
const shared = {
  actions: {
    clear: 'clear',
    initialize: 'initialize'
  },
  getters: {
    count: 'count'
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

const albumDetail = {
  getters: {
    initialized: 'initialized',
    photoCount: 'photoCount'
  },
  mutations: {
    setAlbum: 'SET_ALBUM',
    setPhotos: 'SET_PHOTOS'
  },
  store: {
    album: 'album',
    photos: 'photos'
  }
}

const post = {}

const postDetail = {
  getters: {
    loading: 'loading'
  },
  mutations: {
    setComments: 'SET_COMMENTS',
    setPost: 'SET_POST'
  },
  store: {
    post: 'post',
    comments: 'comments'
  }
}

const user = {}

export const StoreKeys = {
  album,
  albumDetail,
  photo,
  post,
  postDetail,
  shared,
  user
}
