<template>
  <div>
    <h1>Post List</h1>
    <span v-if="loading">Loading</span>
    <div v-if="!loading">
      <nuxt-link
        style="cursor: pointer"
        v-for="post of posts"
        :key="post.id"
        :to="{ name: 'Post-id', params: { id: post.id } }">
        <post-card
          style="margin-bottom: 12px;"
          :post="post">
        </post-card>
      </nuxt-link>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, namespace } from 'nuxt-property-decorator'
import { NamespaceKeys, StoreKeys, Post } from '~/models'
import PostCard from '../_components/post/PostCard.vue'

const postList = namespace(NamespaceKeys.post)

@Component({
  components: {
    PostCard
  }
})
export default class ExternalPostListPage extends Vue {
  public async created(): Promise<void> {
    await this.init()
  }

  @postList.Action(StoreKeys.shared.actions.initialize)
  private init: () => Promise<void>

  @postList.State(StoreKeys.shared.store.data)
  public posts: Post[]

  @postList.State(StoreKeys.shared.store.loading)
  public loading: boolean
}
</script>
