<template>
  <form @submit.prevent="onSubmit" class="review-list-form review-form-border">
    <!-- <label for="score">평점: </label>
    <input type="text" id="score" v-model="score" required> -->
    <p style="color:gray;">리뷰</p>
    <textarea style="resize:none;width:100%;" rows="2" type="text" id="content" v-model="content" required class="mt-1 mr-2"></textarea>
    <br>
    <p style="color:gray;">별점</p>
    <div class="star-rating">
      <input type="radio" id="5-stars" name="rating" value="5" v-model="score"/>
      <label for="5-stars" class="star">&#9733;</label>
      <input type="radio" id="4-stars" name="rating" value="4" v-model="score"/>
      <label for="4-stars" class="star">&#9733;</label>
      <input type="radio" id="3-stars" name="rating" value="3" v-model="score"/>
      <label for="3-stars" class="star">&#9733;</label>
      <input type="radio" id="2-stars" name="rating" value="2" v-model="score"/>
      <label for="2-stars" class="star">&#9733;</label>
      <input type="radio" id="1-star" name="rating" value="1" v-model="score"/>
      <label for="1-star" class="star">&#9733;</label>
    </div>
    <div class="d-flex justify-content-end">
      <input type="image" src="data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHZpZXdCb3g9IjAgMCAxNzIgMTcyIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2UtbGluZWNhcD0iYnV0dCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2UtZGFzaGFycmF5PSIiIHN0cm9rZS1kYXNob2Zmc2V0PSIwIiBmb250LWZhbWlseT0ibm9uZSIgZm9udC13ZWlnaHQ9Im5vbmUiIGZvbnQtc2l6ZT0ibm9uZSIgdGV4dC1hbmNob3I9Im5vbmUiIHN0eWxlPSJtaXgtYmxlbmQtbW9kZTogbm9ybWFsIj48cGF0aCBkPSJNMCwxNzJ2LTE3MmgxNzJ2MTcyeiIgZmlsbD0ibm9uZSI+PC9wYXRoPjxnIGZpbGw9IiNmZmZmZmYiPjxwYXRoIGQ9Ik04Niw2Ljg4Yy05LjQ2LDAgLTE3LjIsNy43NCAtMTcuMiwxNy4ydjQ0LjcyaC00NC43MmMtOS40NiwwIC0xNy4yLDcuNzQgLTE3LjIsMTcuMnY2MS45MmMwLDkuNDYgNy43NCwxNy4yIDE3LjIsMTcuMmgxMjMuODRjOS40NiwwIDE3LjIsLTcuNzQgMTcuMiwtMTcuMnYtMTIzLjg0YzAsLTkuNDYgLTcuNzQsLTE3LjIgLTE3LjIsLTE3LjJ6TTg2LDEzLjc2aDYxLjkyYzUuNzM3ODEsMCAxMC4zMiw0LjU4MjE5IDEwLjMyLDEwLjMydjEyMy44NGMwLDUuNzM3ODEgLTQuNTgyMTksMTAuMzIgLTEwLjMyLDEwLjMyaC0xMjMuODRjLTUuNzM3ODEsMCAtMTAuMzIsLTQuNTgyMTkgLTEwLjMyLC0xMC4zMnYtNjEuOTJjMCwtNS43Mzc4MSA0LjU4MjE5LC0xMC4zMiAxMC4zMiwtMTAuMzJoNDQuNzJjMy43NjI1LDAgNi44OCwtMy4xMTc1IDYuODgsLTYuODh2LTQ0LjcyYzAsLTUuNzM3ODEgNC41ODIxOSwtMTAuMzIgMTAuMzIsLTEwLjMyek0xMTYuNjM3NSw1MS40OTI1Yy0wLjE0NzgxLDAuMDI2ODggLTAuMjk1NjIsMC4wNjcxOSAtMC40MywwLjEwNzVjLTEuNTk5MDYsMC4zNjI4MSAtMi43Mjc4MSwxLjgwMDYzIC0yLjY4NzUsMy40NHY0MS4yOGMwLDkuNTQwNjMgLTcuNjU5MzcsMTcuMiAtMTcuMiwxNy4yaC01MC4wOTVsMTQuNzI3NSwtMTQuNzI3NWMxLjExNTMxLC0xLjAzNDY5IDEuNDEwOTQsLTIuNjc0MDYgMC43MzkwNiwtNC4wMzEyNWMtMC42NTg0NCwtMS4zNzA2MiAtMi4xNSwtMi4xMjMxMiAtMy42NDE1NiwtMS44ODEyNWMtMC43NjU5NCwwLjA4MDYzIC0xLjQ5MTU2LDAuNDMgLTIuMDQyNSwwLjk2NzVsLTIwLjEwMjUsMjAuMjFjLTAuMTg4MTIsMC4xMjA5NCAtMC4zNzYyNSwwLjI2ODc1IC0wLjUzNzUsMC40M2MtMC4wODA2MiwwLjA2NzE5IC0wLjE0NzgxLDAuMTM0MzggLTAuMjE1LDAuMjE1Yy0wLjE2MTI1LDAuMjAxNTYgLTAuMzA5MDYsMC40MTY1NiAtMC40MywwLjY0NWMtMC4wNDAzMSwwLjA2NzE5IC0wLjA4MDYyLDAuMTQ3ODEgLTAuMTA3NSwwLjIxNWMwLDAuMDQwMzEgMCwwLjA2NzE5IDAsMC4xMDc1Yy0wLjA0MDMxLDAuMDY3MTkgLTAuMDgwNjIsMC4xNDc4MSAtMC4xMDc1LDAuMjE1Yy0wLjA0MDMxLDAuMTM0MzggLTAuMDgwNjIsMC4yODIxOSAtMC4xMDc1LDAuNDNjLTAuMDUzNzUsMC4zNjI4MSAtMC4wNTM3NSwwLjcxMjE5IDAsMS4wNzVjMCwwLjA2NzE5IDAsMC4xNDc4MSAwLDAuMjE1YzAsMC4wNDAzMSAwLDAuMDY3MTkgMCwwLjEwNzVjMC4wMjY4OCwwLjA2NzE5IDAuMDY3MTksMC4xNDc4MSAwLjEwNzUsMC4yMTVjMCwwLjA0MDMxIDAsMC4wNjcxOSAwLDAuMTA3NWMwLjAyNjg4LDAuMDY3MTkgMC4wNjcxOSwwLjE0NzgxIDAuMTA3NSwwLjIxNWMwLjAyNjg4LDAuMDY3MTkgMC4wNjcxOSwwLjE0NzgxIDAuMTA3NSwwLjIxNWMwLDAuMDQwMzEgMCwwLjA2NzE5IDAsMC4xMDc1YzAuMTIwOTQsMC4yMjg0NCAwLjI2ODc1LDAuNDQzNDQgMC40MywwLjY0NWMwLjA2NzE5LDAuMDgwNjMgMC4xMzQzOCwwLjE0NzgxIDAuMjE1LDAuMjE1YzAuMTA3NSwwLjA4MDYzIDAuMjE1LDAuMTQ3ODEgMC4zMjI1LDAuMjE1bDIwLjMxNzUsMjAuNDI1YzEuMzcwNjMsMS4zNzA2MyAzLjU3NDM4LDEuMzcwNjMgNC45NDUsMGMxLjM3MDYzLC0xLjM3MDYyIDEuMzcwNjMsLTMuNTc0MzcgMCwtNC45NDVsLTE0LjcyNzUsLTE0LjcyNzVoNTAuMDk1YzEzLjI2MjgxLDAgMjQuMDgsLTEwLjgxNzE5IDI0LjA4LC0yNC4wOHYtNDEuMjhjMC4wNDAzMSwtMC45OTQzNyAtMC4zNjI4MSwtMS45NDg0NCAtMS4wNzUsLTIuNjIwMzFjLTAuNzI1NjIsLTAuNjg1MzEgLTEuNzA2NTYsLTEuMDIxMjUgLTIuNjg3NSwtMC45MjcxOXoiPjwvcGF0aD48L2c+PC9nPjwvc3ZnPg==" alt="제출버튼" width="40">
    </div>
  </form>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'ReviewListForm',
  data() {
    return {
      score: '',
      content: ''
    }
  },
  computed: {
    ...mapGetters([
      'movie'
    ]),
  },
  methods: {
    ...mapActions(['createReview']),
    onSubmit() {
      this.createReview({ moviePk: this.movie.pk, score: this.score, content: this.content, })
      this.score = ''
      this.content = ''
    }
  }
}
</script>

<style>
.star-rating {
  border:solid 1px #333333;
  display:flex;
  flex-direction: row-reverse;
  font-size:1.5em;
  justify-content:space-around;
  padding:0 .2em;
  text-align:center;
  width:5em;
}

.star-rating input {
  display:none;
}

.star-rating label {
  color:#ccc;
  cursor:pointer;
}

.star-rating :checked ~ label {
  color:#f90;
}

.star-rating label:hover,
.star-rating label:hover ~ label {
  color:#fc0;
}

.review-form-border {
  border:solid 1px gray;
  padding: 1rem;
}
</style>