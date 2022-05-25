<template>
<!-- 영화 하나 클릭하면 나오는 상세페이지, 평점 및 댓글을 구현하기 위함. -->
  <div class="container-fluid">
    <h1>{{ movie.korean_title }}</h1>
    <div class="row">
      <img :src="movie.poster_url" :alt="movie.korean_title" class="col-8 col-sm-4 offset-2">
      <div class="col-8 col-sm-4">
        <h4>장르 : {{ movie.genres }}</h4>
        <h4>출시연도 : {{ movie.year }}</h4>
        <h4>예산 : {{ movie.budget }}</h4>
        <h4>네이버 평점 : {{ movie.naver_rating }} / 10</h4>
        <h4>왓챠 평점 : {{ movie.watcha_rating }} / 5</h4>
        <h4>IMDb 평점 : {{ movie.imdb_rating }} / 10</h4>
        <h4>Metacritic 평점 : {{ movie.mc_rating }} / 100</h4>
        <h4>Rotten Tomatoes 평점 : {{ movie.rt_rating }} / 100</h4>
        <hr>
        <h5>{{ movie.overview }}</h5>
        <div>
          좋아요 : <button @click="likeMovie({ moviePk: movie.pk })">{{ like_count }}</button>
        </div>
        <hr>
        <review-list :reviews="movie.reviews"></review-list>
      </div>
    </div>
  </div>
</template>

<script>
import ReviewList from '@/components/ReviewList.vue'

import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'MovieDetail',
  components: { ReviewList },
  data() {
    return {
      moviePk: ''
    }
  },
  computed: {
    ...mapGetters(['movie', 'currentUser']),
    like_count() {
      // return article.like_users ? this.article.like_users.length : undefined
      return this.movie.like_users?.length
    },
  },
  methods: {
    ...mapActions(['fetchMovie', 'likeMovie'])
  },
  created() {
    this.moviePk = this.$route.params.moviePk
    this.fetchMovie({ moviePk: this.moviePk})
  }

}
</script>

<style>
.card-img-top {
  height: 800px;
}
</style>