<template>
  <div>
    <h1>Test Album page</h1>
    <div class="flex-wrap-container">
      <album-card v-for="album of albums" :key="album.id" :album="album"></album-card>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'nuxt-class-component'

import { namespace } from 'nuxt-property-decorator'
import { Album, NamespaceKeys, StoreKeys } from '~/models'
import { StoreUtil } from '~/util'

import AlbumCard from '../_components/album/AlbumCard.vue'

const albm = namespace(NamespaceKeys.album)

@Component({
  components: {
    AlbumCard
  }
})
export default class ExternalAlbumListPage extends Vue {
  @albm.State(StoreKeys.shared.store.data)
  public albums: Album[]

  @albm.Action(StoreKeys.shared.actions.initialize)
  public reinitialize: () => Album[]

  public async created(): Promise<Album[]> {
    return await this.reinitialize()
  }
}
</script>
