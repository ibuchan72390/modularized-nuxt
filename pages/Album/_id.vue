<template>
  <div v-if="init">
    <div>
      <h2>Title: {{ album.title }}</h2>
      <h2>Id: {{album.id}}</h2>
      <h3>Owned by User:
        <nuxt-link :to="{ name: 'User-id', params: { id: album.userId } }">{{ album.userId }}</nuxt-link>
      </h3>
      <photo-list :photos="pictures"></photo-list>
    </div>
  </div>
</template>

<script lang="ts">
import Component, { namespace } from 'nuxt-class-component'
import Vue from 'vue'
import { Route } from 'vue-router'
import { NamespaceKeys } from '~/models/const/namespace.keys'
import { StoreKeys } from '~/models/const/store.keys'
import { Album } from '~/models/entity/Album'
import { Photo } from '~/models/entity/Photo'

import PhotoList from '~/components/photo/PhotoList.vue'

const albm = namespace(NamespaceKeys.album)
const photo = namespace(NamespaceKeys.photo)

@Component({
  components: {
    PhotoList
  }
})
export default class AlbumIdPage extends Vue {
  public init: boolean = false
  public albumId: number = 0
  public album: Album
  public pictures: Photo[]

  @albm.Action(StoreKeys.shared.actions.initialize)
  private initAlbum: (albumId: number) => Promise<Album[]>

  @photo.Action(StoreKeys.photo.actions.initAlbumId)
  private initByAlbumId: (albumId: number) => Promise<Photo[]>

  @albm.Getter(StoreKeys.shared.getters.getByIdFn)
  private getById: (id: number) => Album

  @photo.Getter(StoreKeys.photo.getters.getByAlbumIdFn)
  private getByAlbumId: (albumId: number) => Photo[]

  public async created(): Promise<void> {
    /* tslint:disable:no-string-literal */
    this.albumId = await parseInt(this.$route.params['id'], 10)
    /* tslint:enable:no-string-literal */

    // Ensure our stores are initialized
    await Promise.all([
      this.initAlbum(this.albumId),
      this.initByAlbumId(this.albumId)
    ])

    this.album = this.getById(this.albumId)
    this.pictures = this.getByAlbumId(this.albumId)
    this.init = true
  }
}
</script>
