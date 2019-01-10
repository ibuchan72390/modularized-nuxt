import { Todo } from '../entity/Todo'
import { IBaseState } from './IBaseState'

export interface ITodoState extends IBaseState<Todo> {}
