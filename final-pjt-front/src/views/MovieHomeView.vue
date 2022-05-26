<template>
<!-- 메인화면 -->
  <div class="container-fluid">
    <div class="row">
      <div v-for="movie in movies" :key="movie.pk" class="movie-card col-3 mb-4">
        <router-link :to="{ name: 'movie', params: { moviePk: movie.pk} }" >
          <img :src="movie.poster_url" :alt="movie.korean_title" class="movie-card-img col-12 justify-content-center">
        </router-link>
        <div class="inner-content">
          <span class="title">{{ movie.korean_title }}</span>
          <hr>
          <span class="rating">Naver
            <div class="star-ratings">
              <div 
                class="star-ratings-fill text-lg"
                :style="{ width: movie.naver_rating * 10 + '%' }"
              >
                <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
              </div>
              <div class="star-ratings-base text-lg">
                <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
              </div>
            </div>
          </span>
          <span class="rating">Watcha
            <div class="star-ratings">
              <div 
                class="star-ratings-fill text-lg"
                :style="{ width: movie.watcha_rating * 20 + '%' }"
              >
                <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
              </div>
              <div class="star-ratings-base text-lg">
                <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
              </div>
            </div>
          </span>
          <span class="rating">IMDb 
            <div class="star-ratings">
              <div 
                class="star-ratings-fill text-lg"
                :style="{ width: movie.imdb_rating * 10 + '%' }"
              >
                <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
              </div>
              <div class="star-ratings-base text-lg">
                <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
              </div>
            </div>
          </span>
          <span class="rating">Metacritic 
            <div class="star-ratings">
              <div 
                class="star-ratings-fill text-lg"
                :style="{ width: movie.mc_rating + '%' }"
              >
                <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
              </div>
              <div class="star-ratings-base text-lg">
                <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
              </div>
            </div>
          </span> 
          <span class="rating">Rotten Tomatoes
            <div class="star-ratings">
              <div 
                class="star-ratings-fill text-lg"
                :style="{ width: movie.rt_rating + '%' }"
              >
                <span>&nbsp;&nbsp;&nbsp;&nbsp;</span><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
              </div>
              <div class="star-ratings-base text-lg">
                <span>&nbsp;&nbsp;&nbsp;&nbsp;</span><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
              </div>
            </div>
          </span>
          <hr>
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
  z-index: 0;
  padding: 0;
}
</style>