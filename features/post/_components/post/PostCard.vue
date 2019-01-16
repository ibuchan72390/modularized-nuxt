<template>
  <div class="post-card">
    <div class="post-title">Title: {{post.title}}</div>
    <div class="post-body">Body: {{post.body}}</div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Prop, Component } from 'nuxt-property-decorator'
import { Post } from '~/models'

@Component
export default class PostCard extends Vue {
  @Prop()
  public post: Post
}
</script>

<style>
.post-card {
  padding: 12px;
  border: 1px solid black;
}

.post-title {
  font-weight: bold;
  font-size: 16px;
}

.post-body {
  font-size: 12px;
}
</style>
