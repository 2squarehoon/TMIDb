<template>
  <nav class="navbar navbar-light nav-bg">
    <div class="container-fluid">
      <router-link :to="{ name: 'home' }">
        <img src="@/assets/logo.png" alt="logo" height="40">
        <!-- 이미지 나중에 만들어서 적용 -->
      </router-link>&nbsp;&nbsp;
      <router-link style="color:whitesmoke" :to="{ name: 'recommend' }">추천영화</router-link>&nbsp;&nbsp;
      <router-link style="color:whitesmoke" :to="{ name: 'movie', params: { moviePk: this.randomPk} }">무작위영화</router-link>&nbsp;&nbsp;
      <router-link style="color:whitesmoke" :to="{ name: 'articles' }">커뮤니티</router-link>
      <form class="d-flex ms-auto">
        <input 
          type="text"
          placeholder="영화제목을 검색하세요"
          v-model="keyword"
          @keyup.enter="searchMovies(keyword)"
          class="form-control me-2"
        >
        <button type="submit" @click="searchMovies(keyword)" class="btn btn-outline-light">search</button>
      </form>
      <div class="navbar-nav ms-auto d-flex">
        <div v-if="!isLoggedIn">
          <router-link class="nav-item text-light" :to="{ name: 'login' }">로그인</router-link>
          <span> | </span>
          <router-link :to="{ name: 'signup' }" class="nav-item text-light">회원가입</router-link>
        </div>
        <div v-if="isLoggedIn">
          <router-link :to="{ name: 'profile', params: { username } }" class="nav-item text-light">{{ currentUser.username }}님의 프로필</router-link>
          <span> | </span>
          <router-link :to="{ name: 'logout' }" class="nav-item text-light">로그아웃</router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import _ from 'lodash'

export default {
  name: 'NavBar',
  data() {
    return {
      keyword: '',
      randomPk: ''
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
  },
  created () {
    this.randomPk = _.sample(_.range(1, 915))
  }
}

</script>

<style>
.nav-item {
  flex-direction: row
}

.nav-bg {
  background-color: #666E82;
}
</style>