<template>
  <li class="comment-list-item mx-2 my-1">
    <router-link :to="{ name: 'profile', params: { username: comment.user.username } }">
      {{ comment.user.username }}
    </router-link>: 
    
    <span v-if="!isEditing">{{ payload.content }}</span>

    <span v-if="isEditing">
      <input type="text" v-model="payload.content">
      <button @click="onUpdate" class="btn btn-primary">Update</button> |
      <button @click="switchIsEditing" class="btn btn-warning">Cancel</button>
    </span>

    <span v-if="currentUser.username === comment.user.username && !isEditing">
      <button @click="switchIsEditing" class="btn btn-primary">Edit</button> 
      <button @click="deleteComment(payload)" class="btn btn-warning">Delete</button>
    </span>
  </li>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'CommentListItem',
  props: { comment: Object },
  data() {
    return {
      isEditing: false,
      payload: {
        articlePk: this.comment.article,
        commentPk: this.comment.pk,
        content: this.comment.content
      },
    }
  },
  computed: {
    ...mapGetters(['currentUser']),
  },
  methods: {
    ...mapActions(['updateComment', 'deleteComment']),
    switchIsEditing() {
      this.isEditing = !this.isEditing
    },
    onUpdate() {
      this.updateComment(this.payload)
      this.isEditing = false
    }
  },

}
</script>

<style>
.btn {
  margin-left: 10px;
}
</style>