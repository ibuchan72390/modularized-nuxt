<template>
  <div>
    <label for="todo-name">Todo Name:&nbsp;</label>
    <input
      type="text"
      name="todo-name"
      id="todo-name"
      v-focus
      :value="newDoTitle"
      @keyup="setTitleFn($event.target.value)"
    >
    &nbsp;
    <button @click="createDo()" v-bind:disabled="submitDisabled">Add</button>
  </div>
</template>


<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Getter, Mutation, namespace } from 'vuex-class'
import { NamespaceKeys, StoreKeys, Todo, KeyValue } from '~/models'
import { StoreUtil } from '~/util'

import TodoFormStore from '../_store/todo-form'

const todo = namespace(NamespaceKeys.todoForm)

@Component
export default class TodoForm extends Vue {
  // Set this on created & remove it on destroyed
  public localKey: string
  // public init: boolean = false

  public get newDoTitle(): string {
    const title = this.getKeyedItemTitle(this.localKey)
    console.log(title)
    return title
  }

  public get submitDisabled(): boolean {
    return this.getSubmitDisabled(this.localKey)
  }

  public setTitle(title): void {
    const keyedEvent = new KeyValue<any>(this.localKey, title)
    this.setTitleFn(keyedEvent)
  }

  // public async createDo(): Promise<void> {
  //   await this.createTodo(this.localKey)
  // }

  public beforeCreate(): void {
    StoreUtil.EnsureStoreRegistered(
      this.$store,
      NamespaceKeys.todoForm,
      TodoFormStore
    )
  }

  public async mounted(): Promise<void> {
    this.localKey = await this.initializeForm()
  }

  public destroyed(): void {
    this.destroyForm(this.localKey)
  }

  @todo.State(StoreKeys.todoForm.store.maxLength)
  public maxLength: number

  @todo.Getter(StoreKeys.todoForm.getters.submitDisabledFn)
  public getSubmitDisabled: (key: string) => boolean

  @todo.Getter(StoreKeys.todoForm.getters.inputLengthFn)
  public getInputLength: (key: string) => number

  @todo.Getter(StoreKeys.todoForm.getters.getKeyedItemTitleFn)
  private getKeyedItemTitle: (key: string) => string

  @todo.Mutation(StoreKeys.todoForm.mutations.setTitle)
  private setTitleFn: (keyedEvent: KeyValue<string>) => void

  @todo.Mutation(StoreKeys.todoForm.mutations.removeEntry)
  private destroyForm: (key: string) => void

  @todo.Action(StoreKeys.todoForm.actions.create)
  private createTodo: (key: string) => Promise<void>

  @todo.Action(StoreKeys.todoForm.actions.initializeForm)
  private initializeForm: () => Promise<string>
}
</script>
