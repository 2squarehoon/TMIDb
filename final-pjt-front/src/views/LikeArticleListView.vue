<template>
  <div>
    <ul class="mylist">
      <li v-for="article in profile.like_articles" :key="article.pk">
        <router-link class="routertext" :to="{ name: 'article', params: { articlePk: article.pk } }">
          {{ article.title }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'LikeArticleList',
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