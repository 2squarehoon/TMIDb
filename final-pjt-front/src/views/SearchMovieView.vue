<template>
  <div id="searchResult">
    <h1>Movie Search</h1>
    <p>총 {{ movies.length }}개의 영화가 검색되었습니다.</p>
    <ul>
      <li v-for="movie in movies" :key="movie.pk">
        <router-link :to="{ name: 'movie', params: { moviePk: movie.pk} }">
          {{ movie.korean_title }}
        </router-link>
        <!-- <p>{{ movie.korean_title }}</p> -->
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
      keyword: ''
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
    console.log(this.keyword)
    console.log('hi')
  },
}
</script>

<style>

</style>