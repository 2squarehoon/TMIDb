<template>
  <div class="article-detail container p-3 min-vh-100">
    <h2>
      {{ article.title }}
    </h2>
    <p class="author">
      <router-link style="color:gray;" :to="{ name: 'profile', params: { username: article.user.username} }">
        작성자 : {{ article.user.username }}
      </router-link>
    </p>
    <hr>
    <p>
      {{ article.content }}
    </p>
    <div class="d-flex justify-content-end mx-4" v-if="isAuthor">
      <router-link :to="{ name: 'articleEdit', params: { articlePk: article.pk} }">
        <button>수정</button>
      </router-link>&nbsp;
      <button @click="deleteArticle({ articlePk: article.pk })">삭제</button>
    </div>
    <hr>
    <div style="color:gray;">
      <button @click="likeArticle({ articlePk: article.pk })">추천</button>
      {{ like_count }}명이 이 글을 추천합니다.
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
  color: black;
}

h2 {
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>