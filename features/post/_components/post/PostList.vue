<template>
  <div>
    <div
      v-for="post of posts"
      :key="post.id">
      {{post.id}}
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'nuxt-property-decorator'
import { Post } from '~/models';

@Component
export default class PostListComponent extends Vue {
  @Prop()
  posts: Post[]
}
</script>
