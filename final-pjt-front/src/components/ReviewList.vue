<template>
  <div class="review-list">
    <ul>
      <review-list-item 
        v-for="review in reviews" 
        :review="review" 
        :key="review.pk">
      </review-list-item>        
    </ul>
    <!-- 이미 쓴 사람은 리뷰작성 폼이 안뜨게하려면 어떻게 해야할까 currentUser까지는 가져오긴 했는데 -->
    <div v-for="review in reviews" :key="review.pk">
      <span v-if="currentUser.username === review.user.username">
        <review-list-form v-if="noReview"></review-list-form>
      </span>
    </div>

  </div>  
</template>

<script>
import ReviewListItem from '@/components/ReviewListItem.vue'
import ReviewListForm from '@/components/ReviewListForm.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'ReviewList',
  components: { ReviewListForm, ReviewListItem },
  props: { reviews: Array },
  data() {
    return {
      noReview: true,
    }
  },
  computed: {
    ...mapGetters(['currentUser']),
  },
  methods: {
    switchNoReview() {
      this.noReview = !this.noReview
    }
  }
}
</script>

<style>

</style>