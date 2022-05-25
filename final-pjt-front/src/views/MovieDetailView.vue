<template>
<!-- 영화 하나 클릭하면 나오는 상세페이지, 평점 및 댓글을 구현하기 위함. -->
  <div>
    <h1>{{ movie.korean_title }}</h1>
    <p>{{ movie.overview }}</p>
    <div>
      Likeit: <button @click="likeMovie({ moviePk: movie.pk })">{{ like_count }}</button>
    </div>
    <hr>
    <review-list :reviews="movie.reviews"></review-list>
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

</style>