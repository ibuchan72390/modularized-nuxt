<template>
  <div class="home">
    <h1
      class="text-center"
    >This is my silly little homepage to demonstrate our data initialization for the application.</h1>

    <h3>Albums Loaded: {{!albumLoading}}</h3>
    <h3>Photos Loaded: {{!photoLoading}}</h3>
    <h3>Posts Loaded: {{!postLoading}}</h3>
    <h3>Todos Loaded: LAZY INIT</h3>
    <h3>Users Loaded: {{!userLoading}}</h3>
    <!--
    <hello-world></hello-world>
    -->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { namespace } from 'vuex-class'

const album = namespace('album')
const photo = namespace('photo')
const post = namespace('post')
const user = namespace('user')

const baseLoading = 'LOADING'

@Component
export default class Home extends Vue {
  @album.State(baseLoading)
  public albumLoading!: boolean
  @photo.State(baseLoading)
  public photoLoading!: boolean
  @post.State(baseLoading)
  public postLoading!: boolean
  @user.State(baseLoading)
  public userLoading!: boolean
}
</script>


<style>
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
