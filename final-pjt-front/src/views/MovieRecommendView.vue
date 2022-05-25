<template>
<!-- 영화추천페이지, 장르와 출시연도, 한국영화/외국영화 여부 등으로 검색 -->
  <div>
    <h1>Movie Recommend</h1>
    <movie-list-form></movie-list-form>
    <movie-list></movie-list>
  </div>
</template>

<script>
import MovieList from '@/components/MovieList.vue'
import MovieListForm from '@/components/MovieListForm.vue'

export default {
  name: 'MovieRecommend',
  components: {
    MovieList, MovieListForm
  },
}
</script>

<style>

</style>