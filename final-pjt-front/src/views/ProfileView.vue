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
        <h2>작성한 글</h2>
      </div>
      <ul>
        <li v-for="article in profile.articles" :key="article.pk">
          <router-link :to="{ name: 'article', params: { articlePk: article.pk } }">
            {{ article.title }}
          </router-link>
        </li>
      </ul>

      <h2>좋아요 한 글</h2>
      <ul>
        <li v-for="article in profile.like_articles" :key="article.pk">
          <router-link :to="{ name: 'article', params: { articlePk: article.pk } }">
            {{ article.title }}
          </router-link>
        </li>
      </ul>
      <h2>좋아요 누른 영화</h2>
      <ul>
        <li v-for="movie in profile.like_movies" :key="movie.pk">
          <router-link :to="{ name: 'movie', params: { moviePk: movie.pk } }">
            {{ movie.korean_title }}
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'


export default {
  name: 'ProfileView',
  data() {
    return {
      username: ''
    }
  },
  computed: {
    ...mapGetters(['profile', 'isMe'])
  },
  methods: {
    ...mapActions(['fetchProfile'])
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
.button-3{
  width:120px;
  height:40px;
  border:2px solid #34495e;
  text-align:center;
  cursor:pointer;
  position:relative;
  box-sizing:border-box;
  overflow:hidden;
  ;
}
.button-3 a{
  font-family:arial;
  font-size:16px;
  color:#34495e;
  text-decoration:none;
  line-height:40px;
  transition:all .5s ease;
  z-index:2;
  position:relative;
}
.eff-3{
  width:120px;
  height:40px;
  bottom:-50px;
  background:#34495e;
  position:absolute;
  transition:all .5s ease;
  z-index:1;
}
.button-3:hover .eff-3{
  bottom:0;
}
.button-3:hover a{
  color:#fff;
}
</style>