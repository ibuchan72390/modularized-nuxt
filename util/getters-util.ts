import { IBaseState, BaseEntity, StoreKeys } from '~/models'

export class GetterUtility {
  public static getByIdFn<
    TStore extends IBaseState<TReturn>,
    TReturn extends BaseEntity
  >(STATE: TStore): (id: number) => TReturn {
    return (id: number) => {
      const data: TReturn[] = STATE[StoreKeys.shared.store.data]
      const result = data.filter(x => x.id === id)
      if (result.length === 1) {
        return result[0]
      } else if (result.length > 1) {
        // This is a heinous issue if this comes up
        // tslint:disable-next-line:no-console
        console.log('Found multiple items with the same Id')
      }
      return null as any
    }
  }
}
