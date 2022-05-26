<template>
  <div>
    <h1>Signup</h1>

    <account-error-list v-if="isAuthError"></account-error-list>

    <form @submit.prevent="signup(credentials)">
      <div>
        <label for="username">Username: </label>
        <input type="text" id="username" v-model="credentials.username" required>
      </div>
      <div>
        <label for="password1">Password: </label>
        <input type="password" id="password1" v-model="credentials.password1" required>
      </div>
      <div>
        <label for="password2">Password Confirmation:</label>
        <input type="password" id="password2" v-model="credentials.password2" required>
      </div>
      <div class="customizing-range">
        <label for="user_or_critic">user_or_critic: &nbsp;</label>
        <input type="range" min="1" max="9" value="5" id="user_or_critic" class="slider" oninput="document.getElementById('user_or_critic_value').innerHTML=this.value;" v-model="credentials.user_or_critic" required>&nbsp;
        <span id="user_or_critic_value" class="value">5</span>
      </div>
      <div class="customizing-range">
        <label for="foreign_or_domestic">foreign_or_domestic: &nbsp;</label>
        <input type="range" min="1" max="9" value="5" id="foreign_or_domestic" class="slider" oninput="document.getElementById('foreign_or_domestic_value').innerHTML=this.value;" v-model="credentials.foreign_or_domestic" required>&nbsp;
        <span id="foreign_or_domestic_value" class="value">5</span>
      </div>
      <div>
        <button>Signup</button>
      </div>
    </form>
  </div>
</template>

<script>
import AccountErrorList from '@/components/AccountErrorList.vue'
import { mapActions, mapGetters } from 'vuex'

export default {
  components: { AccountErrorList },
  name: 'SignupView',
  data() {
    return {
      credentials: {
        username: '',
        password1: '',
        password2: '',
        user_or_critic: '',
        foreign_or_domestic: '',
      },
    }
  },
  computed: {
    ...mapGetters(['isAuthError'])
  },
  methods: {
    ...mapActions(['signup'])
  }
}
</script>

<style>
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