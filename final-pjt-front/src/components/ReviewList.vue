<template>
  <div class="review-list">
    <div v-if="isReview">평점은 한 번만 남길 수 있어요!</div>
    <review-list-form v-if="!isReview"></review-list-form>
    <ul>
      <review-list-item 
        v-for="review in reviews" 
        :review="review" 
        :key="review.pk">
      </review-list-item>        
    </ul>
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
  computed: {
    ...mapGetters(['isReview']),
  }
}
</script>

<style>

</style>