<template>
  <div class="article-detail container px-1 min-vh-100">
    <h1>{{ article.title }}</h1>
    <h3 class="author">작성자 : 
      <router-link :to="{ name: 'profile', params: { username: article.user.username} }">
        {{ article.user.username }}
      </router-link>
    </h3>
    <div v-if="isAuthor">
      <router-link :to="{ name: 'articleEdit', params: { articlePk: article.pk} }">
        <button class="btn btn-primary">Edit</button>
      </router-link> 
      <button @click="deleteArticle({ articlePk: article.pk })" class="btn btn-warning">Delete</button>
    </div>
    <h3>
      {{ article.content }}
    </h3>
    <!-- Article Edit/Delete UI -->

    <!-- Article Like UI -->
    <div>
      추천 <button @click="likeArticle({ articlePk: article.pk })">{{ like_count }}</button>
    </div>
    
    <hr>
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
      articlePk: ''
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
    ...mapActions(['fetchArticle', 'likeArticle', 'deleteArticle'])
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
  color: #2c3e50;
}
</style>