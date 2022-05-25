import router from "@/router"
import account from "@/api/account"

export default {
  state: {
    token: localStorage.getItem("token") || "",
    currentUser: {},
    profile: {},
    authError: null,
  },

  getters: {
    isLoggedIn: (state) => !!state.token,
    // config: state => ({ headers: { Authorization: `Token ${state.token}` } }),
    currentUser: (state) => state.currentUser,
    profile: (state) => state.profile,
    authError: (state) => state.authError,
    isAuthError: (state) => !!state.authError,
    isMe: (state, getters) => {
      // return state.article.user.username === getters.currentUser.user.username
      return state.profile?.username === getters.currentUser?.username
    },
  },

  mutations: {
    SET_TOKEN: (state, token) => (state.token = token),
    SET_CURRENT_USER: (state, user) => (state.currentUser = user),
    SET_PROFILE: (state, profile) => (state.profile = profile),
    SET_AUTH_ERROR: (state, error) => (state.authError = error),
  },

  actions: {
    login({ commit, dispatch }, credentials) {
      account
        .login(credentials)
        .then((res) => {
          const token = res.data.key
          // Token setting
          commit("SET_TOKEN", token)
          localStorage.setItem("token", token)
          // currentUser setting
          dispatch("getCurrentUser")
          // page 이동
          router.push({ name: "home" })
        })
        .catch((err) => {
          // console.error(err.response.data)
          commit("SET_AUTH_ERROR", err.response.data)
        });
    },

    signup({ commit, dispatch }, credentials) {
      account
        .signup(credentials)
        .then((res) => {
          const token = res.data.key
          commit("SET_TOKEN", token)
          localStorage.setItem("token", token)
          dispatch("fetchCurrentUser")
          router.push({ name: "home" })
        })
        .catch((err) => {
          // console.log(err.response.data)
          commit("SET_AUTH_ERROR", err.response.data)
        })
    },

    logout({ commit }) {
      account
        .logout()
        .then(() => {
          commit("SET_TOKEN", "")
          localStorage.setItem("token", "")
          alert("성공적으로 logout 되었습니다.")
          router.push({ name: "login" })
        })
        .catch((err) => console.error(err));
    },

    fetchCurrentUser({ commit, getters }) {
      if (getters.isLoggedIn) {
        account.currentUser().then((res) => {
          commit("SET_CURRENT_USER", res.data)
        });
      }
    },

    fetchProfile({ commit }, { username }) {
      account.profile(username).then((res) => {
        commit("SET_PROFILE", res.data)
      })
    },
    updateProfile({ commit, getters }, {username, user_or_critic, foreign_or_domestic}) {
      const body = { username, user_or_critic, foreign_or_domestic }
      // username이 안넘어가서 너무너무 머리가 아팠는데 body에 넣어주니까 되네
      account
        .edit(username, body)
        .then((res) => {
          commit("SET_PROFILE", res.data)
          router.push({
            name: "profile",
            params: { username: getters.profile.username},
          })
        })
        .catch((err) => console.error(err.response))
    }
  },
}