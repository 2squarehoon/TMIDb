<template>
  <div class="article-detail container p-3 min-vh-100">
    <h2>
      {{ article.title }}
    </h2>
    <p class="author">
      <router-link style="color:whitesmoke;" :to="{ name: 'profile', params: { username: article.user.username} }">
        작성자 : {{ article.user.username }}
      </router-link>
    </p>
    <hr>
    <p>
      {{ article.content }}
    </p>
    <hr>
    <div class="d-flex justify-content-between">
      <div style="color:whitesmoke;">
        <button @click="likeArticle({ articlePk: article.pk })">{{ like_count }}</button>
        <span v-if="!is_liked">추천</span>
        <span v-else>추천 취소</span>
      </div>
      
      <div v-if="isAuthor">
        <router-link :to="{ name: 'articleEdit', params: { articlePk: article.pk} }">
          <button class="btn btn-primary">Edit</button>
        </router-link> 
        <button @click="deleteArticle({ articlePk: article.pk })" class="btn btn-warning">Delete</button>
      </div>
    </div>
    
    <!-- Comment UI -->
    <comment-list :comments="article.comments"></comment-list>
  </div>
</template>

<script>
import CommentList from '@/components/CommentList.vue'

import { mapGetters, mapActions } from 'vuex'


export default {
  name: 'ArticleDetail',
  components: { CommentList },
  data() {
    return {
      articlePk: '',
      is_liked: false,
    }
  },
  computed: {
    ...mapGetters(['article', 'currentUser', 'isAuthor']),
    like_count() {
      // return article.like_users ? this.article.like_users.length : undefined
      return this.article.like_users?.length
    },
  },
  methods: {
    ...mapActions(['fetchArticle', 'deleteArticle']),
    likeArticle() {
      this.is_liked = !this.is_liked
      this.$store.dispatch('likeArticle', {articlePk: this.articlePk})
    }
  },
  created() {
    this.articlePk = this.$route.params.articlePk
    this.fetchArticle({ articlePk: this.articlePk })
  },
}
</script>

<style>
.article-detail {
  border: 1px solid black;
}

.author a {
  text-decoration: none;
  color: black;
}
</style>