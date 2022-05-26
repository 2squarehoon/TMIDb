<template>
<!-- 영화추천페이지, 장르와 출시연도, 한국영화/외국영화 여부 등으로 검색 -->
  <div>
    <div class="d-flex justify-content-center">
      <p>당신이 설정한 평점 중요도를 바탕으로 10가지 영화를 추천해드립니다!</p>
    </div>
    <movie-list></movie-list>
  </div>
</template>

<script>
import MovieList from '@/components/MovieList.vue'

export default {
  name: 'MovieRecommend',
  components: {
    MovieList
  },
}
</script>

<style>

</style>