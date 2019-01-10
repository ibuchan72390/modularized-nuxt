<template>
  <div class="album-card card-border">
    <nuxt-link :to="{ name: 'Album-id', params: { id: album.id } }">
        View Album
    </nuxt-link>
    <div>Album Id: {{album.id}}</div>
    <div>Title: {{album.title}}</div>
    <div>Owning User Id:
      <nuxt-link :to="{ name: 'User-id', params: { id: album.userId } }">{{album.userId}}</nuxt-link>
    </div>
  </div>
</template>

<script lang="ts">
import Component from 'nuxt-class-component'
import Vue from 'vue'
import { Prop } from 'nuxt-property-decorator'
import { Album } from '~/models/entity/Album'

@Component
export default class AlbumCard extends Vue {
  @Prop()
  public album: Album
}
</script>

<style>
.album-card {
  width: 200px;
  height: 200px;
  display: flex;
  flex-direction: column;
}
</style>

