<template>
  <div id="container-fluid">
    <h1>Movie Search</h1>
    <div class="row">
      <div v-for="movie in movies" :key="movie.pk" class="movie-card col-12 col-md-6 col-lg-4 col-xl-3 ">
        <router-link :to="{ name: 'movie', params: { moviePk: movie.pk} }" >
          <img :src="movie.poster_url" :alt="movie.korean_title" class="movie-card-img col-12 justify-content-center">
          <h4>{{ movie.korean_title }}</h4>
        </router-link>
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