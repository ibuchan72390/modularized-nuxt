<template>
  <div class="text-center">
    <label for="todo-name">Todo Name:&nbsp;</label>
    <input
      type="text"
      name="todo-name"
      id="todo-name"
      v-focus
      v-text="newDo.title"
      v-on:keyup="setTitle"
    >
    &nbsp;
    <button @click="createTodo()" v-bind:disabled="submitDisabled">Add</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Getter, Mutation, namespace } from 'vuex-class'
import { NamespaceKeys, StoreKeys, Todo } from '~/models'

const todo = namespace(NamespaceKeys.todoForm)

@Component
export default class TodoForm extends Vue {
  @todo.State(StoreKeys.shared.store.data)
  public newDo: Todo

  @todo.Getter(StoreKeys.todoForm.getters.submitDisabled)
  public submitDisabled: boolean

  @todo.Mutation(StoreKeys.todoForm.mutations.setTitleHtml)
  public setTitle: (title: any) => void

  @todo.Action(StoreKeys.todoForm.actions.create)
  private createTodo!: (todo: Todo) => void
}
</script>
