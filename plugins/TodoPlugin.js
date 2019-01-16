import TodoPlugin from 'nuxt-todo-lib/NuxtTodoLib.common'
import { PluginUtil } from '~/util'

export default async (context) => {
  PluginUtil.configurePlugin(TodoPlugin, context)
}
