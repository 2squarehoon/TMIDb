<template>
  <form @submit.prevent="onSubmit" class="review-list-form">
    <!-- <label for="score">평점: </label>
    <input type="text" id="score" v-model="score" required> -->
    <div class="star-rating">
      <input type="radio" id="5-stars" name="rating" value="5" v-model="score"/>
      <label for="5-stars" class="star">&#9733;</label>
      <input type="radio" id="4-stars" name="rating" value="4" v-model="score"/>
      <label for="4-stars" class="star">&#9733;</label>
      <input type="radio" id="3-stars" name="rating" value="3" v-model="score"/>
      <label for="3-stars" class="star">&#9733;</label>
      <input type="radio" id="2-stars" name="rating" value="2" v-model="score"/>
      <label for="2-stars" class="star">&#9733;</label>
      <input type="radio" id="1-star" name="rating" value="1" v-model="score"/>
      <label for="1-star" class="star">&#9733;</label>
    </div>
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
.star-rating {
  border:solid 1px #ccc;
  display:flex;
  flex-direction: row-reverse;
  font-size:1.5em;
  justify-content:space-around;
  padding:0 .2em;
  text-align:center;
  width:5em;
}

.star-rating input {
  display:none;
}

.star-rating label {
  color:#ccc;
  cursor:pointer;
}

.star-rating :checked ~ label {
  color:#f90;
}

.star-rating label:hover,
.star-rating label:hover ~ label {
  color:#fc0;
}
</style>