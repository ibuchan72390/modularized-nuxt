import { PostPlugin } from '~/features/post/plugin'
import { PluginUtil } from '~/util'

export default async (context) => {
  PluginUtil.configurePlugin(PostPlugin, context)
}
