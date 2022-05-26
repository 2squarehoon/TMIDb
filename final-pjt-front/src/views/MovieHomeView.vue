<template>
<!-- 메인화면 -->
  <div class="container-fluid">
    <h1>Home</h1>
    <div class="row">
      <div v-for="movie in movies" :key="movie.pk" class="movie-card col-3 mb-4">
        <router-link :to="{ name: 'movie', params: { moviePk: movie.pk} }" >
          <img :src="movie.poster_url" :alt="movie.korean_title" class="movie-card-img col-12 justify-content-center">
        </router-link>
        <div class="inner-content">
          <span class="title">{{ movie.korean_title }}</span>
          <hr>
          <span class="rating">Naver : 
            <div class="star-ratings">
              <div 
                class="star-ratings-fill space-x-2 text-lg"
                :style="{ width: naver_score + '%' }"
              >
                <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
              </div>
              <div class="star-ratings-base space-x-2 text-lg">
                <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
              </div>
            </div>
            {{ movie.naver_rating }}/10.0
          </span>
          <span class="rating">Watcha : 
            <div class="star-ratings">
              <div 
                class="star-ratings-fill space-x-2 text-lg"
                :style="{ width: watcha_score + '%' }"
              >
                <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
              </div>
              <div class="star-ratings-base space-x-2 text-lg">
                <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
              </div>
            </div>
            {{ movie.watcha_rating }}/5.0
          </span>
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
    name: 'MovieHome',
    computed: {
      ...mapGetters(['movies'])
    },
    methods: {
      ...mapActions(['fetchMovies'])
    },
    created() {
      this.fetchMovies()
      this.naver_score = this.movie.naver_rating * 10
      this.watcha_score = this.movie.watcha_rating * 20
      this.imdb_score = this.movie.imdb_rating * 10
      this.mc_score = this.movie.mc_rating * 20
      this.rt_score = this.movie.rt_rationg * 20
    },
  }
</script>

<style>
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
  color: black;
  z-index: 0;
  padding: 0;
}
</style>