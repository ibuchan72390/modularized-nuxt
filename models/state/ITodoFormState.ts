import { Todo } from '~/models'

export interface ITodoFormState {
  // Properly typed Dictionary Object
  // https://stackoverflow.com/questions/51266816/how-to-use-c-sharp-dictionary-in-typescript
  data: { [id: string]: Todo }
  maxLength: number
}
