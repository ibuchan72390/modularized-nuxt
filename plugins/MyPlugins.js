import { PluginUtil } from '~/util'

// import { PhotoPlugin } from '~/features/photo/plugin'
// import { PostPlugin } from '~/features/post/plugin'
// import { TodoPlugin } from 'nuxt-todo-lib/NuxtTodoLib.common'
import PhotoPlugin from '~/features/photo/plugin'
import PostPlugin from '~/features/post/plugin'
import TodoPlugin from 'nuxt-todo-lib/NuxtTodoLib.common'

export default async (context) => {
  [
    PhotoPlugin,
    PostPlugin,
    TodoPlugin
  ].map(plugin => PluginUtil.configurePlugin(plugin, context))
}
