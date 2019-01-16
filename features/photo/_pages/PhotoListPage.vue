<template>
  <div>
    <h1 style="margin-bottom: 24px">Photos List</h1>
    <div v-if="!loading">
      <photo-list :photos="photos"></photo-list>
    </div>
    <span v-if="loading">Loading!</span>
  </div>
</template>

<script lang="ts">
import Component from 'nuxt-class-component'
import Vue from 'vue'
import { Action, namespace } from 'vuex-class'
import { NamespaceKeys, Photo, StoreKeys } from '~/models'
import { StoreUtil } from '~/util'

import PhotoList from '../_components/photo/PhotoList.vue'

const photo = namespace(NamespaceKeys.photo)

@Component({
  components: {
    PhotoList
  }
})
export default class ExternalPhotoListPage extends Vue {
  public async mounted(): Promise<void> {
    console.log(this.$store)
    const photos = await this.reinitialize()
  }

  @photo.State(StoreKeys.shared.store.loading)
  public loading: boolean

  @photo.State(StoreKeys.shared.store.data)
  public photos: Photo[]

  @photo.Action(StoreKeys.shared.actions.initialize)
  public reinitialize: () => Promise<Photo[]>
}
</script>
