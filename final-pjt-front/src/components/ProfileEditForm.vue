<template>
  <form @submit.prevent="onSubmit">
    <h3>{{ newProfile.username }}님의 프로필 변경</h3>
      <div class="customizing-range">
        <label for="user_or_critic">user_or_critic: &nbsp;</label>
        <input type="range" min="1" max="9" value="5" id="user_or_critic" class="slider" oninput="document.getElementById('user_or_critic_value').innerHTML=this.value;" v-model="newProfile.user_or_critic" required>&nbsp;
        <span id="user_or_critic_value" class="value"></span>
      </div>
      <div class="customizing-range">
        <label for="foreign_or_domestic">foreign_or_domestic: &nbsp;</label>
        <input type="range" min="1" max="9" value="5" id="foreign_or_domestic" class="slider" oninput="document.getElementById('foreign_or_domestic_value').innerHTML=this.value;" v-model="newProfile.foreign_or_domestic" required>&nbsp;
        <span id="foreign_or_domestic_value" class="value"></span>
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
        username: this.username,
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
      console.log(payload)
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
    // console.log(this.profile)
    const payload = { username: this.$route.params.username }
    this.fetchProfile(payload)
  }
}
</script>

<style>
h3 {
  color: whitesmoke;
}
.value {
  color: whitesmoke;
}
.customizing-range input[type=range] {
    -webkit-appearance: none;
}
.customizing-range  input[type=range]:focus {
    outline: none;
}
.customizing-range input[type=range]::-webkit-slider-runnable-track {
    width: 100%;
    height: 5px;
    cursor: pointer;
    background: #2497E3;
}
.customizing-range input[type=range]::-webkit-slider-thumb {
    border: 1px solid #2497E3;
    height: 15px;
    width: 10px;
    background: #ffffff;
    cursor: pointer;
    -webkit-appearance: none;
    margin-top: -5px; /*chrome의 경우 margin-top값을 부여해야합니다.*/
}
.customizing-range input[type=range]:focus::-webkit-slider-runnable-track {
    background: #2497E3; /*네모버튼에 포커스를 줬을때 뒤에 라인(ㅡ)의 효과*/
}
</style>