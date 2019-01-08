<template>
  <div>
    <todo-form></todo-form>

    <button @click="clearAll()">Clear All</button>

    <button @click="reinitialize()">Reinitialize</button>

    <todo-list></todo-list>
  </div>
</template>

<script lang="ts">
import Component from 'nuxt-class-component'
import Vue from 'vue'
import { Action, Getter, Mutation, namespace, State } from 'vuex-class'

import TodoForm from '~/components/todo/TodoForm.vue'
import TodoList from '~/components/todo/TodoList.vue'
import { NuxtKeys } from '~/models/const/nuxt.keys'
import { StoreKeys } from '~/models/const/store.keys'

const todo = namespace('todo')

@Component({
  components: {
    TodoForm,
    TodoList
  }
})
export default class Todo extends Vue {
  @todo.Action(StoreKeys.shared.actions.CLEAR)
  public clearAll!: () => void

  @todo.Action(StoreKeys.shared.actions.INITIALIZE)
  public reinitialize!: () => void

  public async created(): Promise<null> {
    await this.reinitialize()
    return null
  }
}
</script>
