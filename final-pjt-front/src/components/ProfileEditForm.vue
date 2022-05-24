<template>
  <form @submit.prevent="onSubmit">
    <div>
      <label for="user_or_critic">user_or_critic: </label>
      <input type="text" id="user_or_critic" v-model="newProfile.user_or_critic">
    </div>
    <div>
      <label for="foreign_or_domestic">foreign_or_domestic: </label>
      <input type="text" id="foreign_or_domestic" v-model="newProfile.foreign_or_domestic">
    </div>
    <div>
      <button>{{ action }}</button>
    </div>
  </form>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'ProfileEditForm',
  props: {
    profile: {
      type: Object,
    },
    action: String,
  },
  data() {
    return {
      newProfile: {
        user_or_critic: this.profile.user_or_critic,
        foreign_or_domestic: this.profile.foreign_or_domestic
      }
    }
  },
  methods: {
    ...mapActions(['updateProfile', 'fetchProfile']),
    onSubmit() {
      const payload = { username: this.username, ...this.newProfile}
      this.updateProfile(payload)
      console.log(this.profile)
    }
  },
  watch: {
    profile: {
      handler() {
        this.newProfile = this.profile
      }
    }
  },
  created() {
    console.log(this.profile)
    const payload = { username: this.$route.params.username }
    this.fetchProfile(payload)
  }
}
</script>

<style>

</style>