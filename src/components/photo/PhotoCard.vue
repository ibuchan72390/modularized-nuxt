<template>
  <div
    class="photo-card card-border">
    <div>
      <img v-bind:src="photo.thumbnailUrl">
    </div>
    <div>
      <div>Title: {{photo.title}}</div>
      <div>Url:
        <a v-bind:href="photo.url" target="_blank">
          {{photo.thumbnailUrl}}
        </a>
      </div>
      <div>
        Album Id:
        <nuxt-link :to="{ name: 'Album-id', params: { id: photo.albumId } }">
          {{photo.albumId}}
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// Sample Component
import Component from 'nuxt-class-component'
import { Prop } from 'nuxt-property-decorator'
import Vue from 'vue'
import { namespace } from 'vuex-class'
import { NamespaceKeys } from '~/models/const/namespace.keys'
import { Photo } from '~/models/entity/Photo'

const photo = namespace(NamespaceKeys.photo)

@Component
export default class PhotoCard extends Vue {
  @Prop()
  public photo: Photo
}
</script>

<style>
.photo-card {
  width: 350px;
  height: 350px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
