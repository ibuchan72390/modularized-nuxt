<template>
  <external-photo-page></external-photo-page>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'nuxt-property-decorator'
import ExternalPhotoPage from '~/features/photo/_pages/PhotoListPage.vue'

@Component({
  components: {
    ExternalPhotoPage
  }
})
export default class PhotoPage extends Vue {}
</script>
