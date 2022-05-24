<template>
  <div>
    <h1>Edit Profile</h1>
    <profile-edit-form :username="username" action="edit"></profile-edit-form>
  </div>
</template>

<script>
import ProfileEditForm from '@/components/ProfileEditForm.vue'

import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'ProfileEditView',
  components: { ProfileEditForm },
  data() {
    return {
      username: '',
    }
  },
  computed: {
    ...mapGetters(['profile']),
  },
  methods: {
    ...mapActions(['fetchProfile'])
  },
  created() {
    this.username = this.$route.params.username
    this.fetchProfile({ username: this.username })
    console.log(this.username)
  }
}
</script>

<style>

</style>