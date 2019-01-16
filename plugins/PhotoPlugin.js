import { PhotoPlugin } from '~/features/photo/plugin'
import { PluginUtil } from '~/util'

export default async (context) => {
  PluginUtil.configurePlugin(PhotoPlugin, context)
}
