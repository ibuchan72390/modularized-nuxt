<template>
  <div v-if="init">
    <div>
      <h2>Title: {{ album.title }}</h2>
      <h2>Id: {{album.id}}</h2>
      <h3>Owned by User:
        <nuxt-link :to="{ name: 'User-id', params: { id: album.userId } }">{{ album.userId }}</nuxt-link>
      </h3>

      <h3>Album Photos:</h3>
      <photo-list :photos="photos"></photo-list>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component, { namespace } from 'nuxt-class-component'
import { Route } from 'vue-router'
import { Album, NamespaceKeys, Photo, StoreKeys } from '~/models'
import { StoreUtil } from '~/util'

import PhotoList from '../_components/photo/PhotoList.vue'

const albmDet = namespace(NamespaceKeys.albumDetail)

@Component({
  components: {
    PhotoList
  }
})
export default class ExternalAlbumIdPage extends Vue {
  @albmDet.State(StoreKeys.albumDetail.store.album)
  public album: Album

  @albmDet.State(StoreKeys.albumDetail.store.photos)
  public photos: Photo[]

  @albmDet.Getter(StoreKeys.albumDetail.getters.initialized)
  public init: boolean

  @albmDet.Action(StoreKeys.shared.actions.initialize)
  private initialize: (albumId: number) => Promise<void>

  @albmDet.Action(StoreKeys.shared.actions.clear)
  private clear: () => void

  public async mounted(): Promise<void> {
    /* tslint:disable:no-string-literal */
    const albumId: number = parseInt(this.$route.params['id'], 10)
    /* tslint:enable:no-string-literal */

    await this.initialize(albumId)
  }

  public destroyed(): void {
    this.clear()
  }
}
</script>
