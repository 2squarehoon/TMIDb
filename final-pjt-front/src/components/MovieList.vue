<template>
  <div>
    <h1>Movie List</h1>
    <ul>
      <li v-for="movie in movies" :key="movie.pk">
        <router-link :to="{ name: 'movie', params: { moviePk: movie.pk} }">
          <img :src="movie.poster_url" :alt="movie.korean_title" width="280px" class="mx-2">
          <h4>{{ movie.korean_title }}</h4>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'MovieList',
  computed: {
    ...mapGetters(['movies'])
  },
  methods: {
    ...mapActions(['fetchRecommendMovies'])
  },
  created() {
    this.fetchRecommendMovies()
  }
}
</script>

<style>

</style>