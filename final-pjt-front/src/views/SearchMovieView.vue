<template>
  <div id="searchResult">
    <h1>Movie Search</h1>
    <p>총 {{ movies.length }}개의 영화가 검색되었습니다.</p>
    <ul class="container-fluid">
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