<template>
  <div class="photo-card-container">
    <photo-card v-for="photo of photos" :key="photo.id" :photo="photo"></photo-card>
  </div>
</template>

<script lang="ts">
import Component from 'nuxt-class-component'
import { namespace, Prop } from 'nuxt-property-decorator'
import Vue from 'vue'
import { StoreKeys } from '~/models/const/store.keys'
import { Photo } from '~/models/entity/Photo'
import PhotoCard from './PhotoCard.vue'
import { NamespaceKeys } from '~/models/const/namespace.keys'

const photo = namespace(NamespaceKeys.photo)

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

