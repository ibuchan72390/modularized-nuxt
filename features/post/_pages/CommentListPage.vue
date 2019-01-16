<template>
  <div>
    <h1>Comment List</h1>
    <span v-if="loading">Loading!</span>
    <comment-list v-if="!loading" :comments="comments"></comment-list>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, namespace } from 'nuxt-property-decorator'
import { NamespaceKeys, Comment, StoreKeys } from '~/models'

import CommentList from '../_components/comment/CommentList.vue'

const cmnt = namespace(NamespaceKeys.comment)

@Component({
  components: {
    CommentList
  }
})
export default class ExternalCommentListPage extends Vue {
  public async created(): Promise<void> {
    await this.init()
  }

  @cmnt.State(StoreKeys.shared.store.data)
  public comments: Comment[]

  // I know this doesn't follow pattern, I'm trying something new
  @cmnt.Getter(StoreKeys.shared.store.loading)
  public loading: boolean

  @cmnt.Action(StoreKeys.shared.actions.initialize)
  public init: () => Promise<void>
}
</script>
