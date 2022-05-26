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
          <div>
            <button>로그인</button>
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