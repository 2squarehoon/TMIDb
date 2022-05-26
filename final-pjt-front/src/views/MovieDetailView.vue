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
        <div style="color:gray;">
          <div v-if="is_liked">
            <button @click="likeMovie({ moviePk: movie.pk })"><font-awesome-icon icon="fa-solid fa-heart" /></button>{{ like_count }}명이 이 영화를 좋아합니다
          </div>
          <div v-if="!is_liked">
            <button @click="likeMovie({ moviePk: movie.pk })"><font-awesome-icon icon="fa-regular fa-heart" /></button>{{ like_count }}명이 이 영화를 좋아합니다
          </div>
          <!-- <div v-for="user in movie.like_users" :key="user.pk">
            <div v-if="user.pk===currentUser.pk">
              <button @click="likeMovie({ moviePk: movie.pk })"><font-awesome-icon icon="fa-solid fa-heart" /></button>
              {{ like_count }}명이 이 영화를 좋아합니다
            </div>
          </div>
          <div v-for="user in movie.like_users" :key="user.pk">
            <div v-if="user.pk===currentUser.pk"></div>
            <div v-else>
              <button @click="likeMovie({ moviePk: movie.pk })"><font-awesome-icon icon="fa-regular fa-heart" /></button>
              {{ like_count }}명이 이 영화를 좋아합니다
            </div>
          </div> -->
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
      moviePk: '',
      // is_liked: false,
    }
  },
  computed: {
    ...mapGetters(['movie', 'currentUser', 'is_liked']),
    like_count() {
      // return article.like_users ? this.article.like_users.length : undefined
      return this.movie.like_users?.length
    },
  },
  methods: {
    ...mapActions(['fetchMovie']),
    likeMovie() {
      // if (!this.is_liked) {
      // this.is_liked = !this.is_liked
      // }
      // console.log(this.is_liked)
      this.$store.dispatch('likeMovie', {moviePk: this.moviePk})
      location.reload()
    },
    // check() {
    //   this.movie.like_users?.forEach(user => {
    //     if (user.username === this.currentUser.username) {
    //       this.is_liked = !this.is_liked
    //     }
    //   })
    //   return this.is_liked
    // }
  },
  created() {
    this.moviePk = this.$route.params.moviePk
    this.fetchMovie({ moviePk: this.moviePk})
    // console.log(this.movie.korean_title)
    // this.check()
  },
  // mounted() {
  //   console.log(this.movie.korean_title)
  // },
  // updated() {
    // console.log(this.movie.korean_title)
    // this.check()
  // }
}
</script>

<style>
.card-img-top {
  height: 800px;
}

.star-ratings {
  color: #aaa9a9; 
  position: relative;
  unicode-bidi: bidi-override;
  width: max-content;
}
 
.star-ratings-fill {
  /* color: #fff58c; */
  color: gold;
  padding: 0;
  position: absolute;
  z-index: 1;
  display: flex;
  top: 0;
  left: 0;
  overflow: hidden;
}
 
.star-ratings-base {
  z-index: 0;
  padding: 0;
}
</style>