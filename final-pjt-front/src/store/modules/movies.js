import router from "@/router"
import movie from "@/api/movie"
import review from "@/api/review"
import _ from "lodash"

export default {
  state: {
    movies: [],
    movie: {},
  },

  getters: {
    movies: (state) => state.movies,
    movie: (state) => state.movie,
    // isAuthor: (state, getters) => {
    //   return state.review.user?.username === getters.currentUser?.username
    // },
    // isReview: (state, getters) => {
    //   const reviewed = state.reviews.some((review) => {
    //     return review.user.username === getters.currentUser
    //   })
    //   console.log(reviewed)
    //   return reviewed
    // } // 1인1리뷰 시도중...
  },

  mutations: {
    SET_MOVIES: (state, movies) => (state.movies = movies),
    SET_MOVIE: (state, movie) => (state.movie = movie),
    SET_MOVIE_REVIEWS: (state, reviews) => (state.movie.reviews = reviews),
  },

  actions: {
    fetchMovies({ commit }) {
      movie
        .all()
        .then((res) => {
          // 홈 화면에서 랜덤으로 영화 6개 뽑아서 보여주기위함.
          const random_movie = _.sampleSize(res.data, 6)
          // console.log(random_movie)
          commit("SET_MOVIES", random_movie);
        })
        .catch((err) => console.error(err.response))
    },
    fetchMovie({ commit }, { moviePk }) {
      movie
        .detail(moviePk)
        .then((res) => {
          commit("SET_MOVIE", res.data)
        })
        .catch((err) => {
          console.error(err.response);
          if (err.response.status === 404) {
            router.push({ name: "NotFound404" });
          }
        })
        // .catch((err) => console.error(err.response))
    },
    likeMovie({ commit }, { moviePk }) {
      movie
        .like(moviePk)
        .then((res) => {
          commit("SET_MOVIE", res.data);
        })
        .catch((err) => console.error(err.response))
    },
    createReview({ commit }, { moviePk, score, content }) {
      const body = { score, content }
      review
        .create(moviePk, body)
        .then((res) => {
          commit("SET_MOVIE_REVIEWS", res.data)
        })
        .catch((err) => console.error(err.response))
    },
    updateReview({ commit }, { moviePk, reviewPk, score, content }) {
      const body = { score, content }
      review
        .update(moviePk, reviewPk, body)
        .then((res) => {
          commit("SET_MOVIE_REVIEWS", res.data)
        })
        .catch((err) => console.error(err.response))
    },
    deleteReview({ commit }, { moviePk, reviewPk }) {
      review
        .delete(moviePk, reviewPk)
        .then((res) => {
          commit("SET_MOVIE_REVIEWS", res.data)
        })
        .catch((err) => console.error(err.response))
    },
    searchMovie({ commit }, { keyword }) {
      movie
        .search(keyword)
        .then((res) => {
          commit("SET_MOVIES", res.data)
        })
    }
  },

}