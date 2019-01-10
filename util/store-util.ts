export class StoreUtil {
  public static EnsureStoreRegistered(
    $store: any,
    key: string,
    newStore: any
  ): void {
    // Want to check in case they already have it registered
    // I think duplicate registration may be a scary concept
    if (!this.keyInStore($store, key)) {
      $store.registerModule(key, newStore)
    }
  }

  public static RemoveStoreRegistration($store: any, key: string): void {
    if (this.keyInStore($store, key)) {
      $store.unregisterModule(key)
    }
  }

  private static keyInStore($store: any, key: string): boolean {
    const anyStore = $store as any
    return key in anyStore._modules.root._children
  }
}
