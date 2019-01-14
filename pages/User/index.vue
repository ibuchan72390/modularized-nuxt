<template>
  <div>
    <h1>Test User Page</h1>
    <div v-if="!loading">
      <user-panel
        v-for="user of users"
        :user="user"
        :key="user.id">
      </user-panel>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, namespace, Action, State } from 'nuxt-property-decorator'
import { NamespaceKeys, StoreKeys, User } from '~/models';

const usr = namespace(NamespaceKeys.user)

@Component
export default class UserPage extends Vue {

  public async created(): Promise<void> {
    await this.init()
  }

  @usr.State(StoreKeys.shared.store.loading)
  public loading: boolean

  @usr.State(StoreKeys.shared.store.data)
  public users: User[]

  @usr.Action(StoreKeys.shared.actions.initialize)
  private init: () => Promise<void>
}
</script>
