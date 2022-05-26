<template>
  <div>
    <h1>게시물 수정</h1>
    <article-form :article="article" action="update"></article-form>
  </div>
</template>

<script>
import ArticleForm from '@/components/ArticleForm.vue'

import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'ArticleEditView',
  components: { ArticleForm },
  data() {
    return {
      articlePk: '',
    }
  },
  computed: {
    ...mapGetters(['article']),
  },  
  methods: {
    ...mapActions(['fetchArticle'])
  },
  created () {
    console.log('edit')
    this.articlePk = this.$route.params.articlePk
    this.fetchArticle({ articlePk: this.articlePk })
  },
}
</script>

<style>

</style>