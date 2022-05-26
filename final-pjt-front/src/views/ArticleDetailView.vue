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
        <img src="data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHZpZXdCb3g9IjAgMCAxNzIgMTcyIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2UtbGluZWNhcD0iYnV0dCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2UtZGFzaGFycmF5PSIiIHN0cm9rZS1kYXNob2Zmc2V0PSIwIiBmb250LWZhbWlseT0ibm9uZSIgZm9udC13ZWlnaHQ9Im5vbmUiIGZvbnQtc2l6ZT0ibm9uZSIgdGV4dC1hbmNob3I9Im5vbmUiIHN0eWxlPSJtaXgtYmxlbmQtbW9kZTogbm9ybWFsIj48cGF0aCBkPSJNMCwxNzJ2LTE3MmgxNzJ2MTcyeiIgZmlsbD0ibm9uZSI+PC9wYXRoPjxnIGZpbGw9IiNmZmZmZmYiPjxwYXRoIGQ9Ik0xNTAuODc2OTIsNDQuNzQwODNjLTUuMTY2OTMsLTUuMTUwNjcgLTEzLjA2Mzk3LC02LjM4NTkgLTE5LjU1Njk0LC0zLjA1OTA1di0xMi4xMTkyOGMtMC4wMTA1NSwtOS4yNzIyOCAtNy41MjQ1OSwtMTYuNzg2MzIgLTE2Ljc5Njg3LC0xNi43OTY4N2gtODIuOTk1MDRjLTkuMjcyMjgsMC4wMTA1NSAtMTYuNzg2MzIsNy41MjQ1OSAtMTYuNzk2ODcsMTYuNzk2ODh2MTEyLjg3NWMwLjAxMDU1LDkuMjcyMjggNy41MjQ1OSwxNi43ODYzMiAxNi43OTY4OCwxNi43OTY4OGg4Mi45OTUzOGM5LjI3MjI4LC0wLjAxMDU1IDE2Ljc4NjMyLC03LjUyNDU5IDE2Ljc5Njg4LC0xNi43OTY4N3YtNTEuNDQwNzdsMjEuMDI5NjksLTIxLjAyOTY5YzYuNTU5NDQsLTYuNTU5NTYgNi41NTk0NCwtMTcuMTk0NTggMCwtMjMuNzU0MTR6TTc2Ljg3MzI1LDEwNy44NzYyNWwxMi4yMzYxOSwxMi4zNDk0bC0xNi42NTQ3Nyw0LjQxODU5ek05NS41OTIwMiwxMTcuMjIyN2wtMTUuNzI1OTEsLTE1Ljg3MDM2bDQ1LjM5MDUzLC00NS4yNjA4NmwxNS43MzQzLDE1LjczMTk1ek0xMjQuNjAxMjMsMTQyLjQzNzVjLTAuMDA2MjksNS41NjMzOSAtNC41MTQ3NCwxMC4wNzE4MyAtMTAuMDc4MTIsMTAuMDc4MTNoLTgyLjk5NTA0Yy01LjU2MzM5LC0wLjAwNjI5IC0xMC4wNzE4MywtNC41MTQ3NCAtMTAuMDc4MTIsLTEwLjA3ODEydi0xMTIuODc1YzAuMDA2MjksLTUuNTYzMzkgNC41MTQ3NCwtMTAuMDcxODMgMTAuMDc4MTMsLTEwLjA3ODEyaDgyLjk5NTM4YzUuNTYzMzksMC4wMDYyOSAxMC4wNzE4Myw0LjUxNDc0IDEwLjA3ODEzLDEwLjA3ODEzdjE3LjY5MjE1bC01MS44NTA5NSw1MS43MDMxM2MtMC40MjIxNiwwLjQyMDc5IC0wLjcyNDY4LDAuOTQ2MzkgLTAuODc2NDYsMS41MjI4bC03LjM4NzYsMjguMDM2Yy0wLjMwNDc4LDEuMTU2NjYgMC4wMjg0NSwyLjM4ODEzIDAuODc0OSwzLjIzMzI3YzAuODQ2NDUsMC44NDUxNCAyLjA3ODQ0LDEuMTc2NDUgMy4yMzQ2MiwwLjg2OTg3bDI3Ljg0NjUzLC03LjM4Nzk0YzAuNTcyNzEsLTAuMTUxODcgMS4wOTUwNiwtMC40NTI1MSAxLjUxNDA3LC0wLjg3MTQybDI2LjY0NDU1LC0yNi42NDQ1NXpNMTQ3LjU5ODE3LDY1LjIxNjIybC0xLjg1NjM5LDEuODU2NzNsLTE1LjcyNzU5LC0xNS43Mjc1OWwxLjg3MjE4LC0xLjg2NjhjMy45NDEyMiwtMy45MTUzMyAxMC4zMDU1MywtMy45MDk2MiAxNC4yMzk3MiwwLjAxMjc3bDEuNDcyNDEsMS40NzI0MWMzLjkyOTQ2LDMuOTM4MzYgMy45MjkzMSwxMC4zMTQzMSAtMC4wMDAzNCwxNC4yNTI0OHoiPjwvcGF0aD48L2c+PC9nPjwvc3ZnPg==" alt="edit" width="30">
      </router-link>&nbsp;
      <input type="image" @click="deleteArticle({ articlePk: article.pk })" src="data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHZpZXdCb3g9IjAgMCAxNzIgMTcyIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2UtbGluZWNhcD0iYnV0dCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2UtZGFzaGFycmF5PSIiIHN0cm9rZS1kYXNob2Zmc2V0PSIwIiBmb250LWZhbWlseT0ibm9uZSIgZm9udC13ZWlnaHQ9Im5vbmUiIGZvbnQtc2l6ZT0ibm9uZSIgdGV4dC1hbmNob3I9Im5vbmUiIHN0eWxlPSJtaXgtYmxlbmQtbW9kZTogbm9ybWFsIj48cGF0aCBkPSJNMCwxNzJ2LTE3MmgxNzJ2MTcyeiIgZmlsbD0ibm9uZSI+PC9wYXRoPjxnIGZpbGw9IiNmZmZmZmYiPjxwYXRoIGQ9Ik04Niw2Ljg4Yy00My42NTUyLDAgLTc5LjEyLDM1LjQ2NDggLTc5LjEyLDc5LjEyYzAsNDMuNjU1MiAzNS40NjQ4LDc5LjEyIDc5LjEyLDc5LjEyYzQzLjY1NTIsMCA3OS4xMiwtMzUuNDY0OCA3OS4xMiwtNzkuMTJjMCwtNDMuNjU1MiAtMzUuNDY0OCwtNzkuMTIgLTc5LjEyLC03OS4xMnpNODYsMTMuNzZjMzkuOTM2OCwwIDcyLjI0LDMyLjMwMzIgNzIuMjQsNzIuMjRjMCwzOS45MzY4IC0zMi4zMDMyLDcyLjI0IC03Mi4yNCw3Mi4yNGMtMzkuOTM2OCwwIC03Mi4yNCwtMzIuMzAzMiAtNzIuMjQsLTcyLjI0YzAsLTM5LjkzNjggMzIuMzAzMiwtNzIuMjQgNzIuMjQsLTcyLjI0ek0xMTMuNDg2NCw1NC45OTI5N2MtMC45MDczNywwLjAyMTQ1IC0xLjc2OTUxLDAuNDAwNiAtMi4zOTg1OSwxLjA1NDg1bC0yNS4wODc4MSwyNS4wODc4MWwtMjUuMDg3ODEsLTI1LjA4NzgxYy0wLjY0NzY1LC0wLjY2NTc1IC0xLjUzNjk4LC0xLjA0MTM1IC0yLjQ2NTc4LC0xLjA0MTQxYy0xLjM5OTgyLDAuMDAwMzcgLTIuNjU5ODQsMC44NDg4NCAtMy4xODY1OCwyLjE0NTc3Yy0wLjUyNjc0LDEuMjk2OTMgLTAuMjE1MTYsMi43ODM3IDAuNzg3OTksMy43NjAwMWwyNS4wODc4MSwyNS4wODc4MWwtMjUuMDg3ODEsMjUuMDg3ODFjLTAuODk4NjcsMC44NjI4MSAtMS4yNjA2OCwyLjE0NDA0IC0wLjk0NjQxLDMuMzQ5NTZjMC4zMTQyNywxLjIwNTUyIDEuMjU1NywyLjE0Njk2IDIuNDYxMjIsMi40NjEyMmMxLjIwNTUyLDAuMzE0MjcgMi40ODY3NSwtMC4wNDc3NCAzLjM0OTU2LC0wLjk0NjQxbDI1LjA4NzgxLC0yNS4wODc4MWwyNS4wODc4MSwyNS4wODc4MWMwLjg2MjgxLDAuODk4NjcgMi4xNDQwNCwxLjI2MDY4IDMuMzQ5NTYsMC45NDY0MWMxLjIwNTUyLC0wLjMxNDI3IDIuMTQ2OTYsLTEuMjU1NyAyLjQ2MTIyLC0yLjQ2MTIyYzAuMzE0MjcsLTEuMjA1NTIgLTAuMDQ3NzQsLTIuNDg2NzUgLTAuOTQ2NDEsLTMuMzQ5NTZsLTI1LjA4NzgxLC0yNS4wODc4MWwyNS4wODc4MSwtMjUuMDg3ODFjMS4wMjI1MSwtMC45ODMyNSAxLjMzNjY5LC0yLjQ5MzMgMC43OTExOSwtMy44MDI3OWMtMC41NDU1LC0xLjMwOTQ5IC0xLjgzODgxLC0yLjE0OTkgLTMuMjU2OTcsLTIuMTE2NDN6Ij48L3BhdGg+PC9nPjwvZz48L3N2Zz4=" width="30">
    </div>
    <hr>
    <div style="color:gray;">
      <button v-if="is_liked" @click="likeArticle({ articlePk: article.pk })"><font-awesome-icon icon="fa-solid fa-thumbs-up" /></button>
      <button v-else @click="likeArticle({ articlePk: article.pk })"><font-awesome-icon icon="fa-regular fa-thumbs-up" /></button>
      {{ like_count }}명이 이 글을 추천합니다
    </div>
    
    <!-- Comment UI -->
    <comment-list :comments="article.comments"></comment-list>
    <div class="d-flex justify-content-end mx-4">
      <router-link :to="{ name: 'articles' }"><img src="@/assets/back2.png" alt="back" height="40"></router-link>
    </div>
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
      is_liked: '',
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

h2 {
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>