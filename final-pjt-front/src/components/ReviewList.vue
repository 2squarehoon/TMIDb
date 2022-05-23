<template>
  <div class="review-list">
    <ul>
      <review-list-item 
        v-for="review in reviews" 
        :review="review" 
        :key="review.pk">
      </review-list-item>        
    </ul>

    <review-list-form></review-list-form>
  </div>  
</template>

<script>
import ReviewListItem from '@/components/ReviewListItem.vue'
import ReviewListForm from '@/components/ReviewListForm.vue'

export default {
  name: 'ReviewList',
  components: { ReviewListForm, ReviewListItem },
  props: { comments: Array },
}
</script>

<style>

</style>