<template>
  <div>
    <external-todo-page></external-todo-page>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'nuxt-property-decorator'
import ExternalTodoPage from '~/features/todo'

@Component({
  components: {
    ExternalTodoPage
  }
})
export default class TodoPage extends Vue {}
</script>
