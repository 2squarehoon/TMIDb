<template>
<!-- 메인화면 -->
  <div>
    <h1>Home</h1>
    <ul>
      <li v-for="movie in movies" :key="movie.pk">
        <!-- <router-link :to="{ name: 'movie', params: { moviePk: movie.pk} }"> -->
          {{ movie.fields.title }}
        <!-- </router-link> -->
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

  export default {
    name: 'MovieHome',
    computed: {
      ...mapGetters(['movies'])
    },
    methods: {
      ...mapActions(['fetchMovies'])
    },
    created() {
      this.fetchMovies()
    },
  }
</script>

<style>

</style>