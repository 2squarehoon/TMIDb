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
          <br>
          <div class="d-flex justify-content-end">
            <input type="image" src="data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHZpZXdCb3g9IjAgMCAxNzIgMTcyIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2UtbGluZWNhcD0iYnV0dCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2UtZGFzaGFycmF5PSIiIHN0cm9rZS1kYXNob2Zmc2V0PSIwIiBmb250LWZhbWlseT0ibm9uZSIgZm9udC13ZWlnaHQ9Im5vbmUiIGZvbnQtc2l6ZT0ibm9uZSIgdGV4dC1hbmNob3I9Im5vbmUiIHN0eWxlPSJtaXgtYmxlbmQtbW9kZTogbm9ybWFsIj48cGF0aCBkPSJNMCwxNzJ2LTE3MmgxNzJ2MTcyeiIgZmlsbD0ibm9uZSI+PC9wYXRoPjxnIGZpbGw9IiNmZmZmZmYiPjxwYXRoIGQ9Ik04NS45NDYyNSw2LjgzMjk3Yy0xLjg5NzIyLDAuMDI5NjYgLTMuNDEyMjMsMS41ODk3NiAtMy4zODYyNSwzLjQ4NzAzdjk4LjMzNTYzbC0yMS42NDc4MSwtMjEuNjQ3ODFjLTAuNjQ3NjUsLTAuNjY1NzUgLTEuNTM2OTgsLTEuMDQxMzUgLTIuNDY1NzgsLTEuMDQxNDFjLTEuMzk5ODIsMC4wMDAzNyAtMi42NTk4NCwwLjg0ODg0IC0zLjE4NjU4LDIuMTQ1NzdjLTAuNTI2NzQsMS4yOTY5MyAtMC4yMTUxNiwyLjc4MzcgMC43ODc5OSwzLjc2MDAxbDI3LjUyLDI3LjUyYzEuMzQzNDIsMS4zNDI4NyAzLjUyMDk1LDEuMzQyODcgNC44NjQzNywwbDI3LjUyLC0yNy41MmMwLjg5ODY3LC0wLjg2MjgxIDEuMjYwNjgsLTIuMTQ0MDQgMC45NDY0MSwtMy4zNDk1NmMtMC4zMTQyNywtMS4yMDU1MiAtMS4yNTU3LC0yLjE0Njk2IC0yLjQ2MTIyLC0yLjQ2MTIyYy0xLjIwNTUyLC0wLjMxNDI3IC0yLjQ4Njc1LDAuMDQ3NzQgLTMuMzQ5NTYsMC45NDY0MWwtMjEuNjQ3ODEsMjEuNjQ3ODF2LTk4LjMzNTYzYzAuMDEyNzMsLTAuOTI5ODMgLTAuMzUxNDksLTEuODI1MjIgLTEuMDA5NjcsLTIuNDgyMTRjLTAuNjU4MTksLTAuNjU2OTIgLTEuNTU0MjcsLTEuMDE5NDIgLTIuNDg0MDgsLTEuMDA0ODl6TTExMy40MzI2NSwxMi4wMDY0MWMtMS42OTUzNCwtMC4wMjkyOSAtMy4xNTkyMywxLjE4MTAyIC0zLjQ0OTExLDIuODUxNjVjLTAuMjg5ODksMS42NzA2MyAwLjY4MDY3LDMuMzAzMzYgMi4yODY3NywzLjg0Njk0YzI2Ljg5NTQ3LDEwLjUwODA0IDQ1Ljk2OTY5LDM2LjYzNzk1IDQ1Ljk2OTY5LDY3LjI5NWMwLDM5LjkzNjggLTMyLjMwMzIsNzIuMjQgLTcyLjI0LDcyLjI0Yy0zOS45MzY4LDAgLTcyLjI0LC0zMi4zMDMyIC03Mi4yNCwtNzIuMjRjMCwtMzAuNjU3MDUgMTkuMDc0MjEsLTU2Ljc4Njk2IDQ1Ljk2OTY5LC02Ny4yOTVjMS41NjI3LC0wLjU5MDQ4IDIuNDc1MzcsLTIuMjE4MjIgMi4xNjQwMSwtMy44NTk0OGMtMC4zMTEzNiwtMS42NDEyNiAtMS43NTY3NiwtMi44MjE2NiAtMy40MjcxMywtMi43OTg4Yy0wLjQyNDMsMC4wMDgxMyAtMC44NDM0NCwwLjA5NDY5IC0xLjIzNjI1LDAuMjU1MzFjLTI5LjQ3MjM3LDExLjUxNDgzIC01MC4zNTAzMSw0MC4xODUyNiAtNTAuMzUwMzEsNzMuNjk3OTdjMCw0My42NTUyIDM1LjQ2NDgsNzkuMTIgNzkuMTIsNzkuMTJjNDMuNjU1MiwwIDc5LjEyLC0zNS40NjQ4IDc5LjEyLC03OS4xMmMwLC0zMy41MTI3MSAtMjAuODc3OTUsLTYyLjE4MzEzIC01MC4zNTAzMSwtNzMuNjk3OTdjLTAuNDIxMzcsLTAuMTg3MTQgLTAuODc2MDUsLTAuMjg3NjcgLTEuMzM3MDMsLTAuMjk1NjJ6Ij48L3BhdGg+PC9nPjwvZz48L3N2Zz4=" width="30">
          </div>
        </div>
      </div>
      <br>
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