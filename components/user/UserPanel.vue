<template>
  <div>
    <h1>This is my test user panel for User Id: {{user.id}}</h1>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'nuxt-class-component'
import { Prop } from 'nuxt-property-decorator'
import { User } from '~/models'

@Component
export default class UserPanel extends Vue {
  @Prop()
  public user: User
}
</script>

<style>
</style>

