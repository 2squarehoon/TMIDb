<template>
  <div class="comment-list-item mx-2 my-1">
    <router-link style="color:whitesmoke;" :to="{ name: 'profile', params: { username: comment.user.username } }">
      {{ comment.user.username }}
    </router-link> 
    
    <div style="color:whitesmoke;" v-if="!isEditing">
      {{ payload.content }}
    </div>

    <span v-if="isEditing">
      <textarea style="resize:none;width:100%;" rows="2" type="text" id="content" v-model="payload.content" required class="mt-1 mr-2"></textarea>
      <button @click="onUpdate">완료</button>&nbsp;
      <button @click="switchIsEditing">취소</button>
    </span>

    <span v-if="currentUser.username === comment.user.username && !isEditing">
      <button @click="switchIsEditing">수정</button>&nbsp;
      <button @click="deleteComment(payload)">삭제</button>
    </span>
    <hr>
  </div>
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