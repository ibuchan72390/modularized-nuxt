<template>
  <div>
    <h1>Test User Id Page</h1>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component, { namespace } from 'nuxt-class-component'
import { NamespaceKeys } from '~/models/const/namespace.keys'
import { StoreKeys } from '~/models/const/store.keys'
import { User } from '~/models/entity/User'

const usr = namespace(NamespaceKeys.user)

@Component
export default class UserIdPage extends Vue {
  @usr.Action(StoreKeys.shared.actions.initialize)
  private init: () => Promise<User[]>

  @usr.Getter(StoreKeys.shared.getters.getByIdFn)
  private getByIdFn: (id: number) => User
}
</script>
