<template>
  <div>
    <h1>Post Details</h1>
    <span v-if="loading">Loading!</span>
    <div v-if="!loading">
      <post-card :post="post"></post-card>

      <h3>Comments</h3>
      <comment-list :comments="comments"></comment-list>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, namespace } from 'nuxt-property-decorator'
import { NamespaceKeys, StoreKeys, Post, Comment } from '~/models'

import PostCard from '../_components/post/PostCard.vue'
import CommentList from '../_components/comment/CommentList.vue'

const postDet = namespace(NamespaceKeys.postDetail)

@Component({
  components: {
    PostCard,
    CommentList
  }
})
export default class ExternalPostDetailPage extends Vue {
  public async created(): Promise<void> {
    const id = parseInt(this.$route.params.id, 10)
    console.log('Initializing with: ', id)
    await this.init(id)
  }

  @postDet.Action(StoreKeys.shared.actions.initialize)
  private init: (postId: number) => Promise<void>

  @postDet.State(StoreKeys.postDetail.store.post)
  public post: Post

  @postDet.State(StoreKeys.postDetail.store.comments)
  public comments: Comment[]

  @postDet.Getter(StoreKeys.postDetail.getters.loading)
  public loading: boolean
}
</script>
