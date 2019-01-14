export class StoreUtil {
  // This is used to guarantee your store is registered prior to instantiating a component
  // Use this in your component's created hook in order to ensure a dependent store is ready
  public static async EnsureStoreRegistered(
    $store: any,
    key: string,
    newStore: any
  ): Promise<void> {
    // Want to check in case they already have it registered
    // I think duplicate registration may be a scary concept
    if (!this.keyInStore($store, key)) {
      console.log('Registering store to key: ' + key)

      return await new Promise<void>(async (resolve, reject) => {
        await setTimeout(() => {
          $store.registerModule(key, newStore)
          resolve()
        }, 500)
      })
    }
  }

  // Use this at your page level component on a destroy method (I THINK)
  // This should completley remove the store from the registration
  // BE CAREFUL!!!! - If any dependent components are instantiated, things will explode
  public static RemoveStoreRegistration($store: any, key: string): void {
    if (this.keyInStore($store, key)) {
      $store.unregisterModule(key)
    }
  }

  // This method implementation is extremely flawed....
  // Originally, the idea was that form stores need to be replicated per every component instance
  // This is an inherently bad design as we replicate all: Actions, Mutations, & Getters
  // This issue is specifically laid out by Linus Borg of the vue team at the following url:
  // https://forum.vuejs.org/t/creating-re-usable-vuex-store-with-store-registermodule/33754/4
  // public static GenerateNewRegistration($store: any, newStore: any): string {
  //   let key = StringUtil.GetKey()

  //   while (this.keyInStore($store, key)) {
  //     key = StringUtil.GetKey()
  //   }

  //   this.EnsureStoreRegistered($store, key, newStore)
  //   return key
  // }

  private static keyInStore($store: any, key: string): boolean {
    const anyStore = $store as any
    return key in anyStore._modules.root._children
  }
}
