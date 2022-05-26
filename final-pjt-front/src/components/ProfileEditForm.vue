<template>
  <div>

    <form @submit.prevent="onSubmit">
      <div class="d-flex justify-content-center">
        <div>
          <h1>{{ newProfile.username }}님의 프로필 변경</h1>
          <br>
          <p>1. 관객의 평점과 비평가의 평점 중 어느 것이 더 중요하다고 생각하시나요?</p>
          <p class="text-secondary">(관객의 평점이 중요하다면 1에 가깝게, 비평가의 평점이 중요하다면 9에 가깝게 설정해주세요)</p>
          <div class="customizing-range">
            <input type="range" min="1" max="9" value="5" id="user_or_critic" class="slider" oninput="document.getElementById('user_or_critic_value').innerHTML=this.value;" v-model="newProfile.user_or_critic" required>&nbsp;
            <span id="user_or_critic_value" class="value"></span>
          </div>
          <br>
          <p>2. 전세계인의 평점과 한국인의 평점 중 어느 것이 더 중요하다고 생각하시나요?</p>
            <p class="text-secondary">(전세계의 평점이 중요하다면 1에 가깝게, 한국인의 평점이 중요하다면 9에 가깝게 설정해주세요)</p>
          <div class="customizing-range">
            <input type="range" min="1" max="9" value="5" id="foreign_or_domestic" class="slider" oninput="document.getElementById('foreign_or_domestic_value').innerHTML=this.value;" v-model="newProfile.foreign_or_domestic" required>&nbsp;
            <span id="foreign_or_domestic_value" class="value"></span>
          </div>
          <br>
          <div class="d-flex justify-content-end">
            <input type="image" src="data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHZpZXdCb3g9IjAgMCAxNzIgMTcyIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2UtbGluZWNhcD0iYnV0dCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2UtZGFzaGFycmF5PSIiIHN0cm9rZS1kYXNob2Zmc2V0PSIwIiBmb250LWZhbWlseT0ibm9uZSIgZm9udC13ZWlnaHQ9Im5vbmUiIGZvbnQtc2l6ZT0ibm9uZSIgdGV4dC1hbmNob3I9Im5vbmUiIHN0eWxlPSJtaXgtYmxlbmQtbW9kZTogbm9ybWFsIj48cGF0aCBkPSJNMCwxNzJ2LTE3MmgxNzJ2MTcyeiIgZmlsbD0ibm9uZSI+PC9wYXRoPjxnIGZpbGw9IiNmZmZmZmYiPjxwYXRoIGQ9Ik04Niw2Ljg4Yy05LjQ2LDAgLTE3LjIsNy43NCAtMTcuMiwxNy4ydjQ0LjcyaC00NC43MmMtOS40NiwwIC0xNy4yLDcuNzQgLTE3LjIsMTcuMnY2MS45MmMwLDkuNDYgNy43NCwxNy4yIDE3LjIsMTcuMmgxMjMuODRjOS40NiwwIDE3LjIsLTcuNzQgMTcuMiwtMTcuMnYtMTIzLjg0YzAsLTkuNDYgLTcuNzQsLTE3LjIgLTE3LjIsLTE3LjJ6TTg2LDEzLjc2aDYxLjkyYzUuNzM3ODEsMCAxMC4zMiw0LjU4MjE5IDEwLjMyLDEwLjMydjEyMy44NGMwLDUuNzM3ODEgLTQuNTgyMTksMTAuMzIgLTEwLjMyLDEwLjMyaC0xMjMuODRjLTUuNzM3ODEsMCAtMTAuMzIsLTQuNTgyMTkgLTEwLjMyLC0xMC4zMnYtNjEuOTJjMCwtNS43Mzc4MSA0LjU4MjE5LC0xMC4zMiAxMC4zMiwtMTAuMzJoNDQuNzJjMy43NjI1LDAgNi44OCwtMy4xMTc1IDYuODgsLTYuODh2LTQ0LjcyYzAsLTUuNzM3ODEgNC41ODIxOSwtMTAuMzIgMTAuMzIsLTEwLjMyek0xMTYuNjM3NSw1MS40OTI1Yy0wLjE0NzgxLDAuMDI2ODggLTAuMjk1NjIsMC4wNjcxOSAtMC40MywwLjEwNzVjLTEuNTk5MDYsMC4zNjI4MSAtMi43Mjc4MSwxLjgwMDYzIC0yLjY4NzUsMy40NHY0MS4yOGMwLDkuNTQwNjMgLTcuNjU5MzcsMTcuMiAtMTcuMiwxNy4yaC01MC4wOTVsMTQuNzI3NSwtMTQuNzI3NWMxLjExNTMxLC0xLjAzNDY5IDEuNDEwOTQsLTIuNjc0MDYgMC43MzkwNiwtNC4wMzEyNWMtMC42NTg0NCwtMS4zNzA2MiAtMi4xNSwtMi4xMjMxMiAtMy42NDE1NiwtMS44ODEyNWMtMC43NjU5NCwwLjA4MDYzIC0xLjQ5MTU2LDAuNDMgLTIuMDQyNSwwLjk2NzVsLTIwLjEwMjUsMjAuMjFjLTAuMTg4MTIsMC4xMjA5NCAtMC4zNzYyNSwwLjI2ODc1IC0wLjUzNzUsMC40M2MtMC4wODA2MiwwLjA2NzE5IC0wLjE0NzgxLDAuMTM0MzggLTAuMjE1LDAuMjE1Yy0wLjE2MTI1LDAuMjAxNTYgLTAuMzA5MDYsMC40MTY1NiAtMC40MywwLjY0NWMtMC4wNDAzMSwwLjA2NzE5IC0wLjA4MDYyLDAuMTQ3ODEgLTAuMTA3NSwwLjIxNWMwLDAuMDQwMzEgMCwwLjA2NzE5IDAsMC4xMDc1Yy0wLjA0MDMxLDAuMDY3MTkgLTAuMDgwNjIsMC4xNDc4MSAtMC4xMDc1LDAuMjE1Yy0wLjA0MDMxLDAuMTM0MzggLTAuMDgwNjIsMC4yODIxOSAtMC4xMDc1LDAuNDNjLTAuMDUzNzUsMC4zNjI4MSAtMC4wNTM3NSwwLjcxMjE5IDAsMS4wNzVjMCwwLjA2NzE5IDAsMC4xNDc4MSAwLDAuMjE1YzAsMC4wNDAzMSAwLDAuMDY3MTkgMCwwLjEwNzVjMC4wMjY4OCwwLjA2NzE5IDAuMDY3MTksMC4xNDc4MSAwLjEwNzUsMC4yMTVjMCwwLjA0MDMxIDAsMC4wNjcxOSAwLDAuMTA3NWMwLjAyNjg4LDAuMDY3MTkgMC4wNjcxOSwwLjE0NzgxIDAuMTA3NSwwLjIxNWMwLjAyNjg4LDAuMDY3MTkgMC4wNjcxOSwwLjE0NzgxIDAuMTA3NSwwLjIxNWMwLDAuMDQwMzEgMCwwLjA2NzE5IDAsMC4xMDc1YzAuMTIwOTQsMC4yMjg0NCAwLjI2ODc1LDAuNDQzNDQgMC40MywwLjY0NWMwLjA2NzE5LDAuMDgwNjMgMC4xMzQzOCwwLjE0NzgxIDAuMjE1LDAuMjE1YzAuMTA3NSwwLjA4MDYzIDAuMjE1LDAuMTQ3ODEgMC4zMjI1LDAuMjE1bDIwLjMxNzUsMjAuNDI1YzEuMzcwNjMsMS4zNzA2MyAzLjU3NDM4LDEuMzcwNjMgNC45NDUsMGMxLjM3MDYzLC0xLjM3MDYyIDEuMzcwNjMsLTMuNTc0MzcgMCwtNC45NDVsLTE0LjcyNzUsLTE0LjcyNzVoNTAuMDk1YzEzLjI2MjgxLDAgMjQuMDgsLTEwLjgxNzE5IDI0LjA4LC0yNC4wOHYtNDEuMjhjMC4wNDAzMSwtMC45OTQzNyAtMC4zNjI4MSwtMS45NDg0NCAtMS4wNzUsLTIuNjIwMzFjLTAuNzI1NjIsLTAuNjg1MzEgLTEuNzA2NTYsLTEuMDIxMjUgLTIuNjg3NSwtMC45MjcxOXoiPjwvcGF0aD48L2c+PC9nPjwvc3ZnPg==" alt="제출버튼" width="40">
          </div>
          </div>
        </div>
    </form>
    <div class="d-flex justify-content-end mx-4">
      <router-link :to="{ name: 'profile' }"><img src="@/assets/back2.png" alt="back" height="40"></router-link>
    </div>
  </div>
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