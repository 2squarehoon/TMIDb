<template>
<!-- 메인화면 -->
  <div>
    <h1 class="my-4">Home</h1>
    <ul class="container-fluid">
      <li v-for="movie in movies" :key="movie.pk">
        <router-link :to="{ name: 'movie', params: { moviePk: movie.pk} }">
          <img :src="movie.poster_url" :alt="movie.korean_title" width="280px" class="mx-2">
          <h4>{{ movie.korean_title }}</h4>
        </router-link>
        <!-- 해야할것 : 이미지들 가운데정렬, 영화제목 한줄 넘어가면 다음줄로 -->
      </li>
    </ul>
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
h1 {
  text-align: center;
}

ul li {
  list-style-type: none; float: left;
  text-decoration: none;
}

ul li a {
  text-decoration: none;
  color: #2c3e50;
  text-align: center;
}
</style>