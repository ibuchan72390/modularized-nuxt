<template>
  <div v-if="init">
    <input v-model="title">
    <button :disabled="submitDisabled()">Add</button>
    <div
      style="text-align: right; width: 220px;"
    >Length: {{getInputLength(localId)}} / {{maxLength}}</div>
    <div v-if="submitDisabled()">
      <span v-for="error of getErrors(localId)" :key="error">{{error}}</span>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, namespace } from 'nuxt-property-decorator'
import { StoreUtil } from '~/util'
import { NamespaceKeys, StoreKeys, KeyValue } from '~/models'

import TodoFormStore from '../_store/todo-form'

const tf = namespace(NamespaceKeys.todoForm)

const defaultLocalId = 'WAITING'

@Component
export default class TodoFormRedo extends Vue {
  // Controller Items
  public localId: string = defaultLocalId

  public get init(): boolean {
    return this.localId != defaultLocalId
  }

  public get title(): string {
    return this.getTitle(this.localId)
  }

  public set title(event) {
    this.updateTitle(event)
  }

  public updateTitle(title: string) {
    this.setTitle(new KeyValue<string>(this.localId, title))
  }

  public submitDisabled(): boolean {
    return this.getSubmitDisabled(this.localId)
  }

  // Lifecycle Hooks
  public beforeCreate(): void {
    StoreUtil.EnsureStoreRegistered(
      this.$store,
      NamespaceKeys.todoForm,
      TodoFormStore
    )
  }

  public async mounted(): Promise<void> {
    this.localId = await this.initForm()
  }

  public destroyed(): void {
    this.removeForm(this.localId)
  }

  // Store Assignments
  @tf.Action(StoreKeys.todoForm.actions.initializeForm)
  private initForm: () => Promise<string>

  @tf.Getter(StoreKeys.todoForm.getters.getKeyedItemTitleFn)
  public getTitle: (key: string) => string

  @tf.Getter(StoreKeys.todoForm.getters.inputLengthFn)
  public getInputLength: (key: string) => number

  @tf.Getter(StoreKeys.todoForm.getters.submitDisabledFn)
  public getSubmitDisabled: (key: string) => boolean

  @tf.Getter(StoreKeys.todoForm.getters.errorsFn)
  public getErrors: (key: string) => string[]

  @tf.Mutation(StoreKeys.todoForm.mutations.removeEntry)
  private removeForm: (key: string) => void

  @tf.Mutation(StoreKeys.todoForm.mutations.setTitle)
  private setTitle: (key: KeyValue<string>) => void

  @tf.State(StoreKeys.todoForm.store.maxLength)
  public maxLength: number
}
</script>

