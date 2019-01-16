export interface IBaseState<T> {
  // It does not appear that this is possible via TS
  // [StoreKeys.shared.store.DATA]: T[] = [];
  // [StoreKeys.shared.store.LOADING]: boolean = true;

  data: T[] | null
  loading: boolean // This can probably just be a getter data === null
}
