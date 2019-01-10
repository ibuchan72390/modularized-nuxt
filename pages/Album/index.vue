<template>
  <div>
    <h1>Test Album page</h1>
    <div class="flex-wrap-container">
      <album-card
        v-for="album of albums"
        :key="album.id"
        :album="album">
      </album-card>
    </div>
  </div>
</template>

<script lang="ts">
import Component from 'nuxt-class-component'
import { namespace } from 'nuxt-property-decorator'
import Vue from 'vue'
import { NamespaceKeys } from '~/models/const/namespace.keys'
import { StoreKeys } from '~/models/const/store.keys'
import { Album } from '~/models/entity/Album'
import AlbumCard from '~/components/album/AlbumCard.vue'

const albm = namespace(NamespaceKeys.album)

@Component({
  components: {
    AlbumCard
  }
})
export default class AlbumPage extends Vue {
  @albm.State(StoreKeys.shared.store.data)
  public albums: Album[]

  @albm.Action(StoreKeys.shared.actions.initialize)
  public reinitialize: () => Album[]

  public async created(): Promise<Album[]> {
    return await this.reinitialize()
  }
}
</script>
