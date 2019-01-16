// Models
import { NamespaceKeys } from '~/models'

// Components
import AlbumIdPage from './_pages/AlbumIdPage.vue'
import AlbumListPage from './_pages/AlbumListPage.vue'
import PhotoListPage from './_pages/PhotoListPage.vue'

// Stores
import AlbumStore from './_store/album'
import AlbumDetailStore from './_store/album-detail'
import PhotoStore from './_store/photo'

export const PhotoPlugin = {
  install: (vue) => {
    vue.component(AlbumIdPage.name, AlbumIdPage)
    vue.component(AlbumListPage.name, AlbumListPage)
    vue.component(PhotoListPage.name, PhotoListPage)
  },
  configureStores: (context, opts) => {
    context.store.registerModule(NamespaceKeys.album, AlbumStore, opts)
    context.store.registerModule(NamespaceKeys.albumDetail, AlbumDetailStore, opts)
    context.store.registerModule(NamespaceKeys.photo, PhotoStore, opts)
  }
}

export default PhotoPlugin
