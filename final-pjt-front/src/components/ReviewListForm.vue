<template>
  <form @submit.prevent="onSubmit" class="review-list-form">
    <label for="score">평점: </label>
    <input type="text" id="score" v-model="score" required>
    <label for="content">댓글: </label>
    <input type="text" id="content" v-model="content" required>
    <button>작성</button>
  </form>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'ReviewListForm',
  data() {
    return {
      score: '',
      content: ''
    }
  },
  computed: {
    ...mapGetters([
      'movie'
    ]),
  },
  methods: {
    ...mapActions(['createReview']),
    onSubmit() {
      this.createReview({ moviePk: this.movie.pk, score: this.score, content: this.content, })
      this.score = ''
      this.content = ''
    }
  }
}
</script>

<style>

</style>