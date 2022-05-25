<template>
  <div id="app">
    <nav-bar></nav-bar>
    <hr>
    <nav class="main">
      <router-link :to="{ name: 'home' }" class="mx-4">Home</router-link>  | 
      <router-link :to="{ name: 'recommend' }" class="mx-4">MovieRecommend</router-link>  | 
      <router-link :to="{ name: 'articles' }" class="mx-4">Community</router-link>
    </nav>
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
h1 {
  text-align: center;
  padding-top: 10px;
  padding-top: 5px;
}

.main {
  text-align: center;
  font-size: 25px;
  margin-bottom: 10px;
}
nav {
  padding: 10px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
}

nav a.router-link-exact-active {
  color: #42b983;
}

.movie-card {
  border: 1px solid black;
  display: flex;
  text-align: center;
  text-decoration: none;
}
.movie-card a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
}
/* .movie-card-img {
  margin-left: 15px;
  margin-right: 15px;
} */
</style>
