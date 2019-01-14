<template>
  <div v-if="init">
    <h1 style="margin-bottom: 24px">Photos List</h1>
    <photo-list :photos="photos"></photo-list>
  </div>
</template>

<script lang="ts">
import Component from 'nuxt-class-component'
import Vue from 'vue'
import { Action, namespace } from 'vuex-class'
import { NamespaceKeys, Photo, StoreKeys } from '~/models'
import { StoreUtil } from '~/util';

import PhotoList from '../_components/photo/PhotoList.vue'

import PhotoStore from '../_store/photo'

const photo = namespace(NamespaceKeys.photo)

@Component({
  components: {
    PhotoList
  }
})
export default class ExternalPhotoListPage extends Vue {

  public init: boolean = false


  public async beforeCreate(): Promise<void> {
    await StoreUtil.EnsureStoreRegistered(
      this.$store,
      NamespaceKeys.photo,
      PhotoStore)
  }

  public async created(): Promise<void> {
    console.log('Created store: ', this.$store)
  }

  public async mounted(): Promise<void> {
    console.log('Mounted store: ', this.$store)
    await this.reinitialize()
    this.init = true
  }

  @photo.State(StoreKeys.shared.store.loading)
  public loading: boolean

  @photo.State(StoreKeys.shared.store.data)
  public photos: Photo[]

  @photo.Action(StoreKeys.shared.actions.initialize)
  public reinitialize: () => Promise<Photo[]>

}
</script>
