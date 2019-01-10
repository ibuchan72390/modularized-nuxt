<template>
  <div>
    <h1 style="margin-bottom: 24px">Photos List</h1>
    <photo-list :photos="photos"></photo-list>
  </div>
</template>

<script lang="ts">
import Component from 'nuxt-class-component'
import Vue from 'vue'
import { Action, namespace } from 'vuex-class'
import PhotoList from '~/components/photo/PhotoList.vue'
import { NamespaceKeys } from '~/models/const/namespace.keys'
import { StoreKeys } from '~/models/const/store.keys'
import { Photo } from '~/models/entity/Photo'

const photo = namespace(NamespaceKeys.photo)

@Component({
  components: {
    PhotoList
  }
})
export default class PhotoPage extends Vue {
  @photo.State(StoreKeys.shared.store.data)
  public photos: Photo[]

  @photo.Action(StoreKeys.shared.actions.initialize)
  public reinitialize: () => Promise<Photo[]>

  public async created(): Promise<Photo[]> {
    const photos = await this.reinitialize()
    return photos
  }
}
</script>
