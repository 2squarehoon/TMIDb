<template>
  <form class="mx-3" @submit.prevent="onSubmit">
      <label for="title">title: </label>
    <div>
      <input style="width:50%" type="text" id="title" v-model="newArticle.title">
    </div>
      <label for="content">content: </label>
    <div>
      <textarea style="resize:none;width:50%" rows="10" type="text" id="content" v-model="newArticle.content"></textarea>
    </div>
    <div>
      <button>{{ action }}</button>
    </div>
  </form>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'ArticleForm',
  props: {
    article: {
      type: Object,
    },
    // title: String, 
    // content: String,
    action: String,
  },
  data() {
    return {
      newArticle: {
        title: this.article.title,
        content: this.article.content
      }
    }
  },
  methods: {
    ...mapActions(['createArticle', 'updateArticle',]),
    onSubmit() {
      if (this.action === 'create') {
        const payload = this.newArticle
        this.createArticle(payload)
      } else if (this.action === 'update') {
        const payload = { articlePk: this.article.pk, ...this.newArticle}
        this.updateArticle(payload)
      }
    }
  },
  watch: {
    article: {
      handler() {
        this.newArticle = this.article
      }
    }
  }
}
</script>

<style>

</style>