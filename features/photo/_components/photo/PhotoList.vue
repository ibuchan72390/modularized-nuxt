<template>
  <div class="photo-card-container">
    <photo-card v-for="photo of photos" :key="photo.id" :photo="photo"></photo-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'nuxt-class-component'
import { Prop } from 'nuxt-property-decorator'
import { Photo } from '~/models/entity/Photo'

import PhotoCard from './PhotoCard.vue'

@Component({
  components: {
    PhotoCard
  }
})
export default class PhotoList extends Vue {
  @Prop()
  public photos: Photo[]
}
</script>

<style>
.photo-card-container {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}
</style>

