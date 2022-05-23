import router from "@/router"
import movie from "@/api/movie"
import review from "@/api/review"

export default {
  state: {
    movies: [  {
      "model": "movies.movie",
      "fields": {
        "title_id": "tt0111161",
        "imdb_rating": 9.3,
        "num_votes": 2587400,
        "title": "The Shawshank Redemption",
        "korean_title": "쇼생크 탈출",
        "genres": "Drama",
        "year": 1994,
        "language": "영어",
        "budget": "$25,000,000 (estimated)",
        "mc_rating": 81,
        "rt_rating": 91,
        "naver_rating": 9.46,
        "naver_count": 18696,
        "watcha_rating": 4.4,
        "watcha_count": "80만명",
        "poster_url": "https://imdb-api.com/images/original/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_Ratio0.6751_AL_.jpg",
        "overview": "촉망받는 은행 간부 앤디 듀프레인은 아내와 그녀의 정부를 살해했다는 누명을 쓴다. 주변의 증언과 살해 현장의 그럴듯한 증거들로 그는 종신형을 선고받고 악질범들만 수용한다는 지옥같은 교도소 쇼생크로 향한다. 인간 말종 쓰레기들만 모인 그곳에서 그는 이루 말할 수 없는 억압과 짐승보다 못한 취급을 당한다. 그러던 어느 날, 간수의 세금을 면제받게 해 준 덕분에 그는 일약 교도소의 비공식 회계사로 일하게 된다. 그 와중에 교도소 소장은 죄수들을 이리저리 부리면서 검은 돈을 긁어 모으고 앤디는 이 돈을 세탁하여 불려주면서 그의 돈을 관리하는데..."
      }
    },
    {
      "model": "movies.movie",
      "fields": {
        "title_id": "tt0468569",
        "imdb_rating": 9,
        "num_votes": 2558047,
        "title": "The Dark Knight",
        "korean_title": "다크 나이트",
        "genres": "Action, Crime, Drama",
        "year": 2008,
        "language": "영어",
        "budget": "$185,000,000 (estimated)",
        "mc_rating": 84,
        "rt_rating": 94,
        "naver_rating": 9.34,
        "naver_count": 27372,
        "watcha_rating": 4.4,
        "watcha_count": "80만명",
        "poster_url": "https://imdb-api.com/images/original/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_Ratio0.6751_AL_.jpg",
        "overview": "범죄와 부정부패를 제거하여 고담시를 지키려는 배트맨. 그는 짐 고든 형사와 패기 넘치는 고담시 지방 검사 하비 덴트와 함께 도시를 범죄 조직으로부터 영원히 구원하고자 한다. 세 명의 의기투합으로 위기에 처한 악당들이 모인 자리에 보라색 양복을 입고 얼굴에 짙게 화장을 한 괴이한 존재가 나타나 배트맨을 죽이자는 사상 초유의 제안을 한다. 그는 바로 어떠한 룰도, 목적도 없는 사상 최악의 악당 미치광이 살인광대 조커. 배트맨을 죽이고 고담시를 끝장내버리기 위한 조커의 광기 어린 행각에 도시는 혼란에 빠지는데..."
      }
    },
    {
      "model": "movies.movie",
      "fields": {
        "title_id": "tt1375666",
        "imdb_rating": 8.8,
        "num_votes": 2270615,
        "title": "Inception",
        "korean_title": "인셉션",
        "genres": "Action, Adventure, Sci-Fi",
        "year": 2010,
        "language": "영어",
        "budget": "$160,000,000 (estimated)",
        "mc_rating": 74,
        "rt_rating": 87,
        "naver_rating": 9.24,
        "naver_count": 26240,
        "watcha_rating": 4.4,
        "watcha_count": "125만명",
        "poster_url": "https://imdb-api.com/images/original/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_Ratio0.6751_AL_.jpg",
        "overview": "타인의 꿈과 접속해 생각을 빼낼 수 있는 근미래, 돔 코브는 꿈의 보안 프로그래머이자 동시에 침입자다. 그는 일본인 사업가 사이토의 제안에 따라 거대 합병 기업의 총수가 될 피셔의 꿈을 설계하여 기업 합병을 막으려 든다. 그 일을 성사시키면 코브는 사이토의 도움으로 아내의 살해범으로 몰린 자신의 누명을 뒤로 하고 사랑스런 자녀들이 있는 집으로 돌아갈 수 있다. 마침내 코브 일행은 꿈 안의 꿈 안의 또 꿈이라는 경로를 거치며 피셔의 꿈과 무의식 깊숙한 곳을 설계하고 침투한다."
      }
    },
    {
      "model": "movies.movie",
      "fields": {
        "title_id": "tt0137523",
        "imdb_rating": 8.8,
        "num_votes": 2036894,
        "title": "Fight Club",
        "korean_title": "파이트 클럽",
        "genres": "Drama",
        "year": 1999,
        "language": "영어",
        "budget": "$63,000,000 (estimated)",
        "mc_rating": 66,
        "rt_rating": 79,
        "naver_rating": 8.79,
        "naver_count": 4848,
        "watcha_rating": 4.1,
        "watcha_count": "33만명",
        "poster_url": "https://imdb-api.com/images/original/MV5BNDIzNDU0YzEtYzE5Ni00ZjlkLTk5ZjgtNjM3NWE4YzA3Nzk3XkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_Ratio0.6751_AL_.jpg",
        "overview": "자동차 회사의 리콜 심사관으로 일하는 주인공(에드워드 노튼)은 일상의 무료함과 공허함 속에서 늘 새로운 탈출을 꿈꾼다. 그는 비행기에서 자신을 비누 제조업자라고 소개하는 타일러 더든(브래드 피트)을 만난다. 집에 돌아온 주인공은 아파트가 누군가에 의해 폭파되었음을 발견하고, 타일러에게 도움을 청해 함께 생활하게 된다. 어느 날 밤 타일러는 주인공에게 자신을 때려달라고 부탁한다. 사람은 싸워봐야 진정한 자신을 알 수 있다는 것이다. 결국 이들은 매주 토요일 밤 술집 지하에서 맨주먹으로 격투를 벌이는 파이트 클럽을 결성하기에 이르는데..."
      }
    },
    {
      "model": "movies.movie",
      "fields": {
        "title_id": "tt0109830",
        "imdb_rating": 8.8,
        "num_votes": 1996640,
        "title": "Forrest Gump",
        "korean_title": "포레스트 검프",
        "genres": "Drama, Romance",
        "year": 1994,
        "language": "영어",
        "budget": "$55,000,000 (estimated)",
        "mc_rating": 82,
        "rt_rating": 70,
        "naver_rating": 9.42,
        "naver_count": 8466,
        "watcha_rating": 4.3,
        "watcha_count": "56만명",
        "poster_url": "https://imdb-api.com/images/original/MV5BNWIwODRlZTUtY2U3ZS00Yzg1LWJhNzYtMmZiYmEyNmU1NjMzXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_Ratio0.6751_AL_.jpg",
        "overview": "불편한 다리, 남들보다 조금 떨어지는 지능을 가진 포레스트 검프는 헌신적인 어머니의 보살핌과 첫사랑 제니와의 만남으로 편견과 괴롭힘 속에서도 따뜻한 마음을 지니고 성장한다. 또래들의 괴롭힘을 피해 도망치던 포레스트는 누구보다 빠르게 달릴 수 있는 자신의 재능을 깨닫는다. 그의 재능을 알아 본 대학에서 그를 미식축구 선수로 발탁하고, 졸업 후에도 뛰어난 신체능력으로 군에 들어가 무공훈장을 수여받는 등 탄탄한 인생 가도에 오르게 된 포레스트. 하지만 어머니가 병에 걸려 죽음을 맞이하고, 첫사랑 제니 역시 그의 곁을 떠나가며 다시 한 번 인생의 전환점을 맞이하게 되는데..."
      }
    },],
    movie: { title: "123", overview: "456"}
  },

  getters: {
    movies: (state) => state.movies,
    movie: (state) => state.movie,
    isAuthor: (state, getters) => {
      return state.review.user?.username === getters.currentUser?.username
    },
  },

  mutations: {
    SET_MOVIES: (state, movies) => (state.movies = movies),
    SET_MOVIE: (state, movie) => (state.movie = movie),
    SET_MOVIE_REVIEWS: (state, Reviews) => (state.movie.Reviews = Reviews),
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
          commit("SET_MOVIE_REVIEWTS", res.data)
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
  },

}