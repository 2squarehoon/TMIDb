<template>
  <div id="app">
    <nav-bar></nav-bar>
    <hr>
    <router-view/>
  </div>
</template>
<script>
import NavBar from '@/components/NavBar.vue'
// 자꾸 빨간줄뜨는거 개빡치네

import { mapActions } from 'vuex'

export default {
  name: 'App',
  components: { NavBar },
  methods: {
    ...mapActions(['fetchCurrentUser'])
  },
  created() {
    this.fetchCurrentUser()
  }
}
</script>

<style>

</style>
