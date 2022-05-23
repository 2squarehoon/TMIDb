import api from "./api"

// const END_POINT = 'movies'

export default {
  create(moviePk, data) {
    return api({
      method: "post",
      url: `movies/${moviePk}/comments/`,
      data: data,
    })
  },
  update(moviePk, reviewPk, data) {
    return api({
      method: "put",
      url: `movies/${moviePk}/comments/${reviewPk}/`,
      data: data,
    })
  },
  delete(moviePk, reviewPk) {
    return api({
      method: "delete",
      url: `articles/${moviePk}/comments/${reviewPk}/`,
    })
  },
}
