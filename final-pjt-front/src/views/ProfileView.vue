<template>
  <div class="container-fluid">
    <h1>{{ profile.username }}님의 프로필</h1>
    <div class="col-6 offset-3">
      <div class="d-flex justify-content-end">
        <div class="button-3" v-if="isMe">
          <div class="eff-3"></div>
          <router-link :to="{ name: 'profileEdit', params: { username: this.username } }">프로필 수정</router-link>
        </div>
      </div>
      <div>
      <br><br>
      <div class="d-flex justify-content-center">
        <div class="btn-group" role="group" aria-label="Basic example">
          <button type="button" class="btn btn-outline-light"><router-link class="routertext" :to="{ name: 'writeArticleList', params: { username: this.username } }">작성한 게시글</router-link></button>
          <button type="button" class="btn btn-outline-light"><router-link class="routertext" :to="{ name: 'likeArticleList', params: { username: this.username } }">좋아요한 게시글</router-link></button>
          <button type="button" class="btn btn-outline-light"><router-link class="routertext" :to="{ name: 'likeMovieList', params: { username: this.username } }">좋아요한 영화</router-link></button>
        </div>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'ProfileView',
  data() {
    return {
      username: '',
      randomPk: ''
    }
  },
  computed: {
    ...mapGetters(['profile', 'isMe'])
  },
  methods: {
    ...mapActions(['fetchProfile']),
  },
  created() {
    // const payload = { username: this.$route.params.username }
    // this.fetchProfile(payload)
    this.username = this.$route.params.username
    this.fetchProfile({ username: this.username})
  },
}
</script>

<style>


.btn:hover a{
  color: black;
}
</style>