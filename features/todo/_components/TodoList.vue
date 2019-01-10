<template>
  <div v-if="init">
    <h1>List is working ({{ todoCount }} Items)</h1>

    <span v-if="loading">Your data is loading!</span>

    <div v-if="!loading">
      <div v-for="(todo, index) of todos" :key="todo.id">
        <span>{{ index + 1 }})&nbsp;</span>
        <span>{{todo.title}}</span>

        <input type="checkbox" v-model="todo.completed" disabled="disabled">

        <div dir="rtl">
          <button @click="remove(todo)">Remove</button>
          &nbsp;
          <button @click="toggleComplete(todo)">Toggle</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop } from 'nuxt-property-decorator'
import Vue from 'vue'
import { Action, Getter, Mutation, namespace, State } from 'vuex-class'
import { NamespaceKeys } from '~/models/const/namespace.keys'
import { StoreKeys } from '~/models/const/store.keys'
import { Todo } from '~/models/entity/Todo'

const todo = namespace(NamespaceKeys.todo)

@Component
export default class TodoList extends Vue {
  public init: boolean = false

  @todo.State(StoreKeys.shared.store.data)
  public todos!: Todo[]

  @todo.State(StoreKeys.shared.store.loading)
  public loading!: boolean

  @todo.Getter(StoreKeys.shared.getters.count)
  public todoCount!: number

  @todo.Mutation(StoreKeys.todo.mutations.toggleTodoComplete)
  public toggleComplete!: (todo: Todo) => void

  @todo.Mutation(StoreKeys.todo.mutations.removeTodo)
  public remove!: (todo: Todo) => void

  // This pattern allows us to avoid component initialization until references have been setup
  // Due to the assignment of the above through the decorator pattern, they're not available at initialization
  // As such, we need to wait until the component has been created and we can reference them in our template
  public created(): void {
    this.init = true
  }
}
</script>

<style>
</style>
