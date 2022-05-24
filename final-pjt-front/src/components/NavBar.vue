<template>
  <nav>
    <ul>
      <!-- 나중에 home으로 가는 라우터에 로고 추가 -->
      <li>
        <router-link :to="{ name: 'home' }">Home</router-link>
      </li>
      <li>
        <span>
          <input 
            type="text"
            placeholder="영화제목을 검색하세요"
            v-model="keyword"
            @keyup.enter="searchMovie(keyword)"
          >
          <button type="submit" @click="searchMovie(keyword)">검색</button>
        </span>
      </li>
      <li v-if="!isLoggedIn">
        <router-link :to="{ name: 'login' }">Login</router-link>
      </li>
      <li v-if="!isLoggedIn">
        <router-link :to="{ name: 'signup' }">Signup</router-link>
      </li>
      <li v-if="isLoggedIn">
        <router-link :to="{ name: 'profile', params: { username } }">
          {{ currentUser.username }}'s page
        </router-link>
      </li>
      <li v-if="isLoggedIn">
        <router-link :to="{ name: 'logout' }">Logout</router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'NavBar',
  data() {
    return {
      keyword: ''
    }
  },
  computed: {
    ...mapGetters(['isLoggedIn', 'currentUser']),
    username() {
      return this.currentUser.username ? this.currentUser.username : 'guest'
    }
  },
  methods: {
    searchMovie(keyword) {
      if (keyword !== ''){
        this.$router.push({
          name: "searchMovie",
          params: {
            keyword: this.keyword,
            isResultShow: true,
          },
        })
        this.keyword = ''
        console.log(keyword)
      } else {
        alert('검색어 입력 웨않함?')
      }
    }
  }
}
</script>

<style>

</style>