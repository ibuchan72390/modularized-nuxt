<template>
  <div>
    <todo-form></todo-form>

    <div style="margin-top: 12px; margin-bottom: 12px;">
      <button @click="clearAll()">Clear All</button>
      <button @click="reinitialize()">Reinitialize</button>
    </div>

    <todo-list></todo-list>
  </div>
</template>

<script lang="ts">
import Component from 'nuxt-class-component'
import Vue from 'vue'
import { Action, namespace } from 'vuex-class'
import { NamespaceKeys, NuxtKeys, StoreKeys, Todo } from '~/models'
import { StoreUtil } from '~/util/store-util'

import TodoForm from './_components/TodoForm.vue'
import TodoList from './_components/TodoList.vue'

import TodoStore from './_store/todo'
import TodoFormStore from './_store/todo-form'

const todo = namespace(NamespaceKeys.todo)
const todoForm = namespace(NamespaceKeys.todoForm)

@Component({
  components: {
    TodoForm,
    TodoList
  }
})
export default class ExternalTodoPage extends Vue {
  public ready: boolean = false

  @todo.Action(StoreKeys.shared.actions.clear)
  public clearAll!: () => void

  @todo.Action(StoreKeys.shared.actions.initialize)
  public reinitialize!: () => void

  public created() {
    console.log('Creating Todo Page')

    StoreUtil.EnsureStoreRegistered(this.$store, NamespaceKeys.todo, TodoStore)

    StoreUtil.EnsureStoreRegistered(
      this.$store,
      NamespaceKeys.todoForm,
      TodoFormStore
    )
  }

  public async mounted(): Promise<void> {
    await this.reinitialize()
  }

  public destroyed(): void {
    StoreUtil.RemoveStoreRegistration(this.$store, NamespaceKeys.todo)
    StoreUtil.RemoveStoreRegistration(this.$store, NamespaceKeys.todoForm)
  }
}
</script>
