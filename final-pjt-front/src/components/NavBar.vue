<template>
  <nav class="navbar navbar-light bg-light ">
    <div class="container-fluid">
        <!-- 나중에 home으로 가는 라우터에 로고 추가 -->
      <router-link :to="{ name: 'home' }">
        <img src="@/assets/logo.png" alt="#" height="40">
      </router-link>
      <form class="d-flex ms-auto">
        <input 
          type="text"
          placeholder="영화제목을 검색하세요"
          v-model="keyword"
          @keyup.enter="searchMovies(keyword)"
          class="form-control me-2"
        >
        <button type="submit" @click="searchMovies(keyword)" class="btn btn-outline-success">search</button>
      </form>
      <ul class="navbar-nav ms-auto">
        <li v-if="!isLoggedIn" class="nav-item">
          <router-link :to="{ name: 'login' }" class="nav-link">Login</router-link>
        </li>
        <li v-if="!isLoggedIn" class="nav-item">
          <router-link :to="{ name: 'signup' }" class="nav-link">Signup</router-link>
        </li>
        <li v-if="isLoggedIn" class="nav-item">
          <router-link :to="{ name: 'profile', params: { username } }" class="nav-link">
            {{ currentUser.username }}'s page
          </router-link>
        </li>
        <li v-if="isLoggedIn" class="nav-item">
          <router-link :to="{ name: 'logout' }" class="nav-link">Logout</router-link>
        </li>
      </ul>
      <!-- 왜 자꾸 줄바꿈되냐 ㅠㅠㅠㅠ -->
    </div>
  </nav>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'


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
    ...mapActions(['searchMovie']),
    searchMovies(keyword) {
      if (keyword.trim()){
        this.$router.push({
          name: "searchMovie",
          params: {
            keyword: this.keyword,
            isResultShow: true,
          },
        })
        this.keyword = ''
        // console.log(keyword) 
        location.reload()
      } else {
        alert('않이 검색어 입력 웨않함?')
      }
    }
  }
}

</script>

<style>
.nav-item {
  flex-direction: row
}

</style>