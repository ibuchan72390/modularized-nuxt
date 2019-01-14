import axios, { AxiosResponse } from 'axios'
import { Todo } from '~/models'

async function loadTodosAsync(): Promise<Todo[]> {
  const response: AxiosResponse<Todo[]> = await axios.get<Todo[]>(
    'https://jsonplaceholder.typicode.com/todos'
  )
  return response.data
}

export const TodoApi = {
  loadTodosAsync
}
