<template>
  <form @submit.prevent="onSubmit" class="comment-list-form">
    <label for="comment">댓글 : </label>
    <input type="text" id="comment" v-model="content" required class="mx-3">
    <button class="btn btn-primary">작성</button>
  </form>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'CommentListForm',
  data() {
    return {
      content: ''
    }
  },
  computed: {
    ...mapGetters([
      'article'
    ]),
  },
  methods: {
    ...mapActions(['createComment']),
    onSubmit() {
      this.createComment({ articlePk: this.article.pk, content: this.content, })
      this.content = ''
    }
  }
}
</script>

<style>
.comment-list-form {
  border: 1px solid black;
  margin: 1rem;
  padding: 1rem;
}

.comment-list-form input {
  margin-left: 1rem;
  margin-right: 1rem;
}
</style>