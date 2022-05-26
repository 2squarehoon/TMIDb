import api from "./api"

const END_POINT = "movies"


export default {
  all() {
    return api({
      method: "get",
      url: `${END_POINT}/`,
    })
  },
  // all(page) { // page로 무한스크롤 불러오기 위함
  //   return api({
  //     method: "get",
  //     url: `${END_POINT}/${page}`,
  //   })
  // }, 
  detail(id) {
    return api({
      method: "get",
      url: `${END_POINT}/${id}/`,
    })
  },
  like(id) {
    return api({
      method: "post",
      url: `${END_POINT}/${id}/like/`,
    })
  },
  search(keyword) {
    return api({
      method: "get",
      url: `${END_POINT}/search/${keyword}/`
    })
  },
  recommend() {
    return api({
      method: "get",
      url: `${END_POINT}/recommendation/`
    })
  }
}