<template>
  <div>
    <ul class="mylist">
      <li v-for="movie in profile.like_movies" :key="movie.pk">
        <router-link class="routertext" :to="{ name: 'movie', params: { moviePk: movie.pk } }">
          {{ movie.korean_title }}
        </router-link>
      </li>
    </ul>
    <div class="d-flex justify-content-end mx-4">
      <router-link :to="{ name: 'profile' }"><img src="@/assets/back2.png" alt="back" height="40"></router-link>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'LikeMovieList',
  data() {
    return {
      username: ''
    }
  },
  computed: {
    ...mapGetters(['profile'])
  },
  methods: {
    ...mapActions(['fetchProfile'])
  },
  created() {
    this.username = this.$route.params.username
    this.fetchProfile({ username: this.username})  
  },
}
</script>

<style>

</style>