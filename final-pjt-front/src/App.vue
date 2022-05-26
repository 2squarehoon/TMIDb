<template>
  <div class="background" id="app">
    <nav-bar></nav-bar>
    <hr>
    <nav class="main">
      <router-link :to="{ name: 'home' }" tag="button" class="btn-outline-dark mx-4">홈</router-link>
      <router-link :to="{ name: 'recommend' }" tag="button" class="btn-outline-dark mx-4">추천 영화</router-link>
      <router-link :to="{ name: 'articles' }" tag="button" class="btn-outline-dark mx-4">자유게시판</router-link>
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
  color: whitesmoke;
}
h2 {
  color: whitesmoke;
}

p {
  color: whitesmoke;
}

th {
  color: whitesmoke;
}

label {
  color: whitesmoke;
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

.movie-card {
  border: 1px solid black;
  display: flex;
  width: 200px;
  text-align: center;
  text-decoration: none;
  justify-content: center;
  position: relative;
}

.movie-card a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
}

.movie-card-img {
  /* height: 350px; */
  height: 550px;
  margin-bottom: 10px;
  /* transform: scale(1.1) */
}

.movie-card:hover img {
  opacity: 0.2;
  /* transform: scale(1.25); */
}

.movie-card .inner-content {
  width: 80%;
  opacity: 0;
  transform: translateX(-50%) translateY(-50%);
  position: absolute;
  top: 80%;
  left: 50%;
  transition: all 600ms ease;
  color: whitesmoke;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.movie-card:hover .inner-content {
  opacity: 1;
  top: 50%;
}

.movie-card .inner-content .title {
  font-size: 1.5rem;
  font-weight: 700;
}

.movie-card .inner-content .rating {
  font-size: 1.2rem;
  font-weight: 700;
}

.movie-card .inner-content hr {
  border-top: 1px solid #f1f1f1;
  width: 100%;
}

.background{
  overflow: hidden;
  min-height:100vh;
  margin:0;
  background-color: #333333;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}
</style>
