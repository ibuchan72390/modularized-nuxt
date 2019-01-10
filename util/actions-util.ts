import { BaseEntity, StoreKeys } from '~/models'

export class ActionsUtility {
  public static async initializeAsync<TReturn extends BaseEntity>(
    context: any,
    initFn: () => Promise<TReturn[]>
  ): Promise<TReturn[]> {
    context.commit(StoreKeys.shared.mutations.setLoading, true)
    const results = await initFn()
    context.commit(StoreKeys.shared.mutations.setData, results)
    context.commit(StoreKeys.shared.mutations.setLoading, false)
    return results
  }
}
