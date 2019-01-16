import Vue from 'vue'

import { IPluginModule } from '~/models/plugin/PluginModule'

export class PluginUtil {
  public static configurePlugin(
    externalImport: IPluginModule,
    context: any
  ): void {
    // This will work because externalImport has an install function
    // Install is only EVER executed once, so do NOT register Store classes in here
    Vue.use(externalImport)

    // If we want to configure extra items outside the install
    // For working inside of HMR functionality
    if (externalImport.configureStores) {
      const opts: any = {}
      if (context.isClient) {
        opts.preserveState = true
      }

      externalImport.configureStores(context, opts)
    }
  }
}
