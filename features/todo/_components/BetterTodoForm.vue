<template>
  <div>
    <div>
      <label for="todo-name">Todo Name:&nbsp;</label>
      <!-- <input
        type="text"
        name="todo-name"
        id="todo-name"
        v-focus
        :value="newDo"
        @keyup="newDo = $event.target.value"
      > -->
      <input
        type="text"
        name="todo-name"
        id="todo-name"
        v-focus
        v-model="newDo"
      >
      &nbsp;
      <button @click="createTodo(localId)" v-bind:disabled="submitDisabled">Add</button>
    </div>
  </div>
</template>


<script lang="ts">
import Vue from 'vue'
import { Component, namespace } from 'nuxt-property-decorator'
import { StoreUtil } from '~/util'
import { NamespaceKeys, StoreKeys, KeyValue } from '~/models'

import TodoFormStore from '../_store/todo-form'

const todo = namespace(NamespaceKeys.todoForm)

@Component
export default class BetterTodoForm extends Vue {
  // Public Interface
  private localId: string = ''

  public get newDo(): string {
    console.log('Binding new do')
    return this.getKeyedItemTitleFn(this.localId)
  }

  public set newDo(title) {
    console.log('Updating new do title')
    this.setTitle(new KeyValue<string>(this.localId, title))
  }

  public get submitDisabled(): boolean {
    return this.submitDisabledFn(this.localId)
  }

  // Lifecycle Hooks
  public async mounted(): Promise<void> {
    this.localId = await this.initializeForm()
  }

  // Vuex Assignments
  @todo.Getter(StoreKeys.todoForm.getters.getKeyedItemTitleFn)
  private getKeyedItemTitleFn: (key: string) => string

  @todo.Getter(StoreKeys.todoForm.getters.submitDisabledFn)
  private submitDisabledFn: (key: string) => boolean

  @todo.Action(StoreKeys.todoForm.actions.initializeForm)
  private initializeForm: () => Promise<string>

  @todo.Action(StoreKeys.todoForm.actions.create)
  private createTodo: (key: string) => Promise<void>

  @todo.Mutation(StoreKeys.todoForm.mutations.setTitle)
  private setTitle: (kv: KeyValue<string>) => void
}
</script>
