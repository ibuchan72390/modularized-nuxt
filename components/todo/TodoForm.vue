<template>
  <div class="text-center">
    <label for="todo-name">Todo Name:&nbsp;</label>
    <input type="text" name="todo-name" id="todo-name" v-focus v-model="newDo.title">
    &nbsp;
    <button @click="create()" v-bind:disabled="submitDisabled()">Add</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Getter, Mutation, namespace } from 'vuex-class'
import { StoreKeys } from '~/models/const/store.keys'
import { Todo } from '~/models/todo.model'

const todo = namespace('todo')

// import focusDirective from '@/directives/focus.directive';

@Component({
  // This should be registered in plugins/directives.ts
  // directives: {
  //     focus: focusDirective,
  // },
})
export default class TodoForm extends Vue {
  // Local attribute for component management
  public newDo!: Todo

  // Decorated attributes obtained from Vuex
  @todo.Mutation(StoreKeys.todo.mutations.CREATE_TODO)
  private createTodo!: (todo: Todo) => void

  // Setup todo base to stop TSLint from bitching and call to Super
  constructor() {
    super()
    this.newDo = new Todo()
  }

  public submitDisabled(): boolean {
    return this.newDo.title.length === 0
  }

  public create(): void {
    this.createTodo(this.newDo)
    this.newDo = new Todo()
  }
}
</script>


