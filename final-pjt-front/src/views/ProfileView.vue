<template>
  <div>
    <h1>{{ profile.username }}</h1>

    <h2>작성한 글</h2>
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
    <h3 v-if="isMe">
      <router-link :to="{ name: 'profileEdit', params: { username: this.username } }">프로필 수정</router-link>
    </h3>
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
    console.log(this.profile)
  },
}
</script>

<style>

</style>