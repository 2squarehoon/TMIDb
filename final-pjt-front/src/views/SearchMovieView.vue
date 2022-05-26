<template>
  <div class="container-fluid">
    <h1>Movie Search</h1>
    <div class="row">
      <div v-for="movie in movies" :key="movie.pk" class="movie-card col-3 mb-4">
        <router-link :to="{ name: 'movie', params: { moviePk: movie.pk} }" >
          <img :src="movie.poster_url" :alt="movie.korean_title" class="movie-card-img col-12 justify-content-center">
        </router-link>
        <div class="inner-content">
          <span class="title">{{ movie.korean_title }}</span>
          <hr>
          <span class="rating">Naver : {{ movie.naver_rating }}/10.0</span>
          <span class="rating">Watcha : {{ movie.watcha_rating }}/5.0</span>
          <span class="rating">IMDb : {{ movie.imdb_rating }}/10.0</span>
          <span class="rating">Metacritic : {{ movie.mc_rating }}/100</span> 
          <span class="rating">Rotten Tomatoes : {{ movie.rt_rating }}/100</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'searchMovie',
  data() {
    return {
      keyword: '',
      isResultShow: false,
    }
  },
  computed: {
    ...mapGetters(['movies'])
  },
  methods: {
    ...mapActions(['searchMovie'])
  },
  created() {
    this.keyword = this.$route.params.keyword
    this.searchMovie({keyword: this.keyword})
    // console.log(this.keyword)
    // console.log('hi')
  },
}
</script>

<style>

</style>