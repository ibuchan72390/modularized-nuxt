import AlbumIdPage from './_pages/AlbumIdPage.vue'
import AlbumListPage from './_pages/AlbumListPage.vue'
import PhotoListPage from './_pages/PhotoListPage.vue'

export default {
  install(vue, options) {
    vue.component(AlbumIdPage.name, AlbumIdPage)
    vue.component(AlbumListPage.name, AlbumListPage)
    vue.component(PhotoListPage.name, PhotoListPage)
  }
}
