<template>
  <div>
    <div class="container px-1 min-vh-100">
      <h1>Community</h1>
      <router-link :to="{ name: 'articleNew' }" v-if="isLoggedIn" class="btn btn-sm btn-info float-right mb-2 mr-3">글 작성하기</router-link>
      <table class="table row m-0">
        <thead class="col-12 thead-dark">
          <tr class="row w-100 m-0">
            <th class="p-1 text-center col-1" >num</th>
            <th class="p-1 col-8">제목</th>
            <th class="p-1 col-3">작성자</th>
          </tr>
        </thead>
        <tbody v-for="article in articles" :key="article.pk" class="col-12">
          <tr class="row m-0">
            <th class="col-1 p-1 text-center">
              {{ article.pk }}
            </th>
            <th class="col-8 p-1 text-truncate">
              <router-link :to="{ name: 'article', params: { articlePk: article.pk } }">
              {{ article.title }} ({{ article.comment_count }}) | +{{ article.like_count }}
              </router-link>
            </th>
            <th class="col-3 p-1 text-center text-truncate">
              <router-link :to="{ name: 'profile', params: { username: article.user.username} }" class="row m-0">
              {{ article.user.username }}
              </router-link>
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

</style>