<template>
  <div>
    <div class="comment-card" v-for="comment of comments" :key="comment.id">
      <div>
        <span>{{comment.name}}</span>
        (
        <a :href="'mailto:' + comment.email">{{comment.email}}</a>)
      </div>
      <div>{{comment.body}}</div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'nuxt-property-decorator'
import { Comment } from 'models'

@Component
export default class CommentList extends Vue {
  @Prop()
  public comments: Comment[]
}
</script>

<style>
.comment-card {
  border: 1px solid gray;
  padding: 12px;
  margin-bottom: 12px;
}
</style>

