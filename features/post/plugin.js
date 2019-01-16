// Models
import { NamespaceKeys } from '~/models'

// Components
import CommentListPage from './_pages/CommentListPage.vue'
import PostDetailPage from './_pages/PostDetailPage.vue'
import PostListPage from './_pages/PostListPage.vue'

// Stores
import CommentStore from './_store/comment'
import PostStore from './_store/post'
import PostDetailStore from './_store/post-detail'

const install = (vue) => {
  vue.component(CommentListPage.name, CommentListPage)
  vue.component(PostDetailPage.name, PostDetailPage)
  vue.component(PostListPage.name, PostListPage)
}

const configureStores = (context, opts) => {
  context.store.registerModule(NamespaceKeys.comment, CommentStore)
  context.store.registerModule(NamespaceKeys.post, PostStore)
  context.store.registerModule(NamespaceKeys.postDetail, PostDetailStore)
}

export const PostPlugin = {
  install,
  configureStores
}

export default PostPlugin
