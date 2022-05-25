<template>
<!-- 영화 하나 클릭하면 나오는 상세페이지, 평점 및 댓글을 구현하기 위함. -->
  <div class="container-fluid">
    <div class="row">
      <img :src="movie.poster_url" :alt="movie.korean_title" class="col-8 col-sm-4 offset-2">
      <div class="col-8 col-sm-4">
        <h3>{{ movie.korean_title }}({{ movie.year }})</h3>
        <h5>{{ movie.genres }}</h5>
        <h5>예산 : {{ movie.budget }}</h5>
        <hr>
        <h5>Naver : {{ movie.naver_rating }}/10.00</h5>
        <h5>Watcha : {{ movie.watcha_rating }}/5.0</h5>
        <h5>IMDb : {{ movie.imdb_rating }}/10.0</h5>
        <h5>Metacritic : {{ movie.mc_rating }}/100</h5>
        <h5>Rotten Tomatoes : {{ movie.rt_rating }}/100</h5>
        <hr>
        <p>{{ movie.overview }}</p>
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