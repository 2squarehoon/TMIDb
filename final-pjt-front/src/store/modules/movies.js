import router from "@/router"
import movie from "@/api/movie"
// import review from "@/api/review"

export default {
  state: {
    movies: [],
    movie: { title: "", overview: ""}
  },

  getters: {
    movies: (state) => state.movies,
    movie: (state) => state.movie,
    // isAuthor: (state, getters) => {
    //   return state.review.user?.username === getters.currentUser?.username
    // },
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
          commit("SET_MOVIES", res.data);
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
    // likeMovie({ commit }, { moviePk }) {
    //   movie
    //     .like(moviePk)
    //     .then((res) => {
    //       commit("SET_MOVIE", res.data);
    //     })
    //     .catch((err) => console.error(err.response))
    // },
    // createReview({ commit }, { moviePk, score, content }) {
    //   const body = { score, content }
    //   review
    //     .create(moviePk, body)
    //     .then((res) => {
    //       commit("SET_MOVIE_REVIEWS", res.data)
    //     })
    //     .catch((err) => console.error(err.response))
    // },
    // updateReview({ commit }, { moviePk, reviewPk, score, content }) {
    //   const body = { score, content }
    //   review
    //     .update(moviePk, reviewPk, body)
    //     .then((res) => {
    //       commit("SET_MOVIE_REVIEWTS", res.data)
    //     })
    //     .catch((err) => console.error(err.response))
    // },
    // deleteReview({ commit }, { moviePk, reviewPk }) {
    //   review
    //     .delete(moviePk, reviewPk)
    //     .then((res) => {
    //       commit("SET_MOVIE_REVIEWS", res.data)
    //     })
    //     .catch((err) => console.error(err.response))
    // },
  },

}