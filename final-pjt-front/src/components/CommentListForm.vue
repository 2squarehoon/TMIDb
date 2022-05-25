<template>
  <form @submit.prevent="onSubmit" class="comment-list-form">
    <div>
      <textarea style="resize:none;width:100%;" rows="2" type="text" id="content" v-model="content" required class="mt-1 mr-2"></textarea>

    </div>
    <div class="d-flex justify-content-end">
      <button class="btn btn-primary">댓글 달기</button>
    </div>
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