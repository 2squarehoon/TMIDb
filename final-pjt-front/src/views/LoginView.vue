<template>
  <div>
    <br>
    <account-error-list v-if="isAuthError"></account-error-list>
    <form @submit.prevent="login(credentials)">
      <div class="d-flex justify-content-center">
        <div>
          <h1>로그인</h1>
          <div>
            <label for="username">사용자 이름</label>
          </div>
            <input v-model="credentials.username" type="text" id="username" required>
          <div>
          </div>
          <div>
            <label for="password">비밀번호</label>
          </div>
          <div>
            <input v-model="credentials.password" type="password" id="password" required>
          </div>
          <br>
          <div class="d-flex justify-content-end">
            <input type="image" src="data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHZpZXdCb3g9IjAgMCAxNzIgMTcyIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2UtbGluZWNhcD0iYnV0dCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2UtZGFzaGFycmF5PSIiIHN0cm9rZS1kYXNob2Zmc2V0PSIwIiBmb250LWZhbWlseT0ibm9uZSIgZm9udC13ZWlnaHQ9Im5vbmUiIGZvbnQtc2l6ZT0ibm9uZSIgdGV4dC1hbmNob3I9Im5vbmUiIHN0eWxlPSJtaXgtYmxlbmQtbW9kZTogbm9ybWFsIj48cGF0aCBkPSJNMCwxNzJ2LTE3MmgxNzJ2MTcyeiIgZmlsbD0ibm9uZSI+PC9wYXRoPjxnIGZpbGw9IiNmZmZmZmYiPjxwYXRoIGQ9Ik04Niw2Ljg4Yy0zMy41MTI3MSwwIC02Mi4xODMxMywyMC44Nzc5NSAtNzMuNjk3OTcsNTAuMzUwMzFjLTAuNTE0MDcsMS4xNTc2NyAtMC4zNTA0MSwyLjUwNDE4IDAuNDI2LDMuNTA1MDFjMC43NzY0MSwxLjAwMDgyIDIuMDM5OTgsMS40OTQwNSAzLjI4OTEsMS4yODM4OWMxLjI0OTEyLC0wLjIxMDE3IDIuMjgxNzEsLTEuMDg5NzMgMi42ODc4NywtMi4yODk1MmMxMC41MDgwNCwtMjYuODk1NDcgMzYuNjM3OTUsLTQ1Ljk2OTY5IDY3LjI5NSwtNDUuOTY5NjljMzkuOTM2OCwwIDcyLjI0LDMyLjMwMzIgNzIuMjQsNzIuMjRjMCwzOS45MzY4IC0zMi4zMDMyLDcyLjI0IC03Mi4yNCw3Mi4yNGMtMzAuNjU3MDUsMCAtNTYuNzg2OTYsLTE5LjA3NDIxIC02Ny4yOTUsLTQ1Ljk2OTY5Yy0wLjQwNjE2LC0xLjE5OTc5IC0xLjQzODc1LC0yLjA3OTM1IC0yLjY4Nzg3LC0yLjI4OTUyYy0xLjI0OTEyLC0wLjIxMDE3IC0yLjUxMjY5LDAuMjgzMDYgLTMuMjg5MSwxLjI4Mzg5Yy0wLjc3NjQxLDEuMDAwODIgLTAuOTQwMDcsMi4zNDczMyAtMC40MjYsMy41MDUwMWMxMS41MTQ4MywyOS40NzIzNyA0MC4xODUyNiw1MC4zNTAzMSA3My42OTc5Nyw1MC4zNTAzMWM0My42NTUyLDAgNzkuMTIsLTM1LjQ2NDggNzkuMTIsLTc5LjEyYzAsLTQzLjY1NTIgLTM1LjQ2NDgsLTc5LjEyIC03OS4xMiwtNzkuMTJ6TTg5LjQwNjQsNTUuMDA2NGMtMS4zOTk4MiwwLjAwMDM3IC0yLjY1OTg0LDAuODQ4ODQgLTMuMTg2NTgsMi4xNDU3N2MtMC41MjY3NCwxLjI5NjkzIC0wLjIxNTE2LDIuNzgzNyAwLjc4Nzk5LDMuNzYwMDFsMjEuNjQ3ODEsMjEuNjQ3ODFoLTk4LjMzNTYzYy0xLjI0MDU5LC0wLjAxNzU0IC0yLjM5NDUyLDAuNjM0MjUgLTMuMDE5OTMsMS43MDU4Yy0wLjYyNTQxLDEuMDcxNTUgLTAuNjI1NDEsMi4zOTY4NCAwLDMuNDY4MzljMC42MjU0MSwxLjA3MTU1IDEuNzc5MzUsMS43MjMzNSAzLjAxOTkzLDEuNzA1OGg5OC4zMzU2M2wtMjEuNjQ3ODEsMjEuNjQ3ODFjLTAuODk4NjcsMC44NjI4MSAtMS4yNjA2OCwyLjE0NDA0IC0wLjk0NjQxLDMuMzQ5NTZjMC4zMTQyNywxLjIwNTUyIDEuMjU1NywyLjE0Njk2IDIuNDYxMjIsMi40NjEyMmMxLjIwNTUyLDAuMzE0MjcgMi40ODY3NSwtMC4wNDc3NCAzLjM0OTU2LC0wLjk0NjQxbDI3LjUyLC0yNy41MmMxLjM0Mjg3LC0xLjM0MzQyIDEuMzQyODcsLTMuNTIwOTUgMCwtNC44NjQzN2wtMjcuNTIsLTI3LjUyYy0wLjY0NzY1LC0wLjY2NTc1IC0xLjUzNjk4LC0xLjA0MTM1IC0yLjQ2NTc4LC0xLjA0MTQxeiI+PC9wYXRoPjwvZz48L2c+PC9zdmc+" width="30">
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
  name: 'LoginView',
  data () {
    return {
      credentials: {
        username: '',
        password: '',
      }
    }
  },
  computed: {
    ...mapGetters(['isAuthError'])
  },
  methods: {
    ...mapActions(['login'])
  },
}
</script>

<style>
.error-messages {
  color: red;
}
</style>