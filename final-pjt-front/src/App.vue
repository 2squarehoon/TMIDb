<template>
  <div id="app">
    <nav-bar></nav-bar>
    <hr>
    <div>
      <ul>
        <li>
          <router-link :to="{ name: 'home' }">Home</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'recommend' }">MovieRecommend</router-link>
        </li>
        <li>
        <router-link :to="{ name: 'articles' }">Community</router-link>
        </li>
      </ul>
    </div>
    <router-view/>
  </div>
</template>
<script>
import NavBar from '@/components/NavBar.vue'

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
