<template>
  <div>
    <div class="container px-1 min-vh-100">
      <div class="d-flex justify-content-center">
    </div>
      <div class="button-3">
        <div class="eff-3"></div>
        <router-link :to="{ name: 'articleNew' }" v-if="isLoggedIn">글 작성하기</router-link>
      </div>
      <table class="table row m-0">
        <thead class="col-12 thead-dark">
          <tr class="row w-100 m-0">
            <th class="p-2 text-center col-1" >#</th>
            <th class="p-2 col-7">제목</th>
            <th class="p-2 col-2">작성자</th>
            <th class="p-2 col-2 text-center">추천 수</th>
          </tr>
        </thead>
        <tbody v-for="article in articles" :key="article.pk" class="col-12">
          <tr class="row m-0">
            <th class="col-1 p-2 text-center">
              {{ article.pk }}
            </th>
            <th class="col-7 p-2 text-truncate">
              <router-link style="color:whitesmoke;" :to="{ name: 'article', params: { articlePk: article.pk } }">
              {{ article.title }} ({{ article.comment_count }})
              </router-link>
            </th>
            <th class="col-2 p-2 text-center">
              <router-link style="color:whitesmoke;" :to="{ name: 'profile', params: { username: article.user.username} }" class="row m-0 ">
              {{ article.user.username }}
              </router-link>
            </th>
            <th class="col-2 p-2 text-center">
              {{ article.like_count }}
            </th>
          </tr>
        </tbody>
      </table>
    </div>

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'



export default {
  name: 'ArticleList',
  computed: {
    ...mapGetters(['articles', 'isLoggedIn'])
  },
  methods: {
    ...mapActions(['fetchArticles'])
  },
  created() {
    this.fetchArticles()
  },
}
</script>

<style>
th a{
  text-decoration: none;
  color: #2c3e50;
}
</style>