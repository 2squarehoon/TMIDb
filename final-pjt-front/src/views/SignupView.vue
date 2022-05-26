<template>
  <div>
    <br>
    <account-error-list v-if="isAuthError"></account-error-list>
    <form @submit.prevent="signup(credentials)">
      <div class="d-flex justify-content-center">
        <div>
          <h1>회원가입</h1>
          <div>
            <label for="username">사용자 이름</label>
            <div>
              <input type="text" id="username" v-model="credentials.username" required>
            </div>
          </div>
          <div>
            <label for="password1">비밀번호</label>
            <div>
              <input type="password" id="password1" v-model="credentials.password1" required>
            </div>
          </div>
          <div>
            <label for="password2">비밀번호 확인</label>
            <div>
              <input type="password" id="password2" v-model="credentials.password2" required>
            </div>
          </div>
          <hr>
          <h3>평점 중요도(이후 프로필에서 수정할 수 있습니다)</h3>
          <br>
          <p>1. 관객의 평점과 비평가의 평점 중 어느 것이 더 중요하다고 생각하시나요?</p>
          <p class="text-secondary">(관객의 평점이 중요하다면 1에 가깝게, 비평가의 평점이 중요하다면 9에 가깝게 설정해주세요)</p>
          <div class="customizing-range">
            <input type="range" min="1" max="9" value="5" id="user_or_critic" class="slider" oninput="document.getElementById('user_or_critic_value').innerHTML=this.value;" v-model="credentials.user_or_critic" required>&nbsp;
            <span id="user_or_critic_value" class="value"></span>
            <br><br>
          </div>
          <br>
          <div class="customizing-range">
            <p>2. 전세계인의 평점과 한국인의 평점 중 어느 것이 더 중요하다고 생각하시나요?</p>
            <p class="text-secondary">(전세계의 평점이 중요하다면 1에 가깝게, 한국인의 평점이 중요하다면 9에 가깝게 설정해주세요)</p>
            <input type="range" min="1" max="9" value="5" id="foreign_or_domestic" class="slider" oninput="document.getElementById('foreign_or_domestic_value').innerHTML=this.value;" v-model="credentials.foreign_or_domestic" required>&nbsp;
            <span id="foreign_or_domestic_value" class="value"></span>
          </div>
          <div>
            <br>
            <button>가입하기</button>
          </div>
        </div>
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