<template>
  <div class="review-list-item">
    <router-link style="color:whitesmoke;" :to="{ name: 'profile', params: { username: review.user.username } }">
      {{ review.user.username }}
    </router-link>
    <span v-if="!isEditing"> 
      <div class="star-ratings">
        <div 
          class="star-ratings-fill space-x-2 text-lg"
          :style="{ width: score + '%' }"
        >
          <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
        </div>
        <div class="star-ratings-base space-x-2 text-lg">
          <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
        </div>
      </div>
      <div class="content">
        {{ payload.content }}
      </div>
    </span>
  
    <span v-if="isEditing">
      <div class="star-rating">
        <input type="radio" id="5-stars" name="rating" value="5" v-model="payload.score"/>
        <label for="5-stars" class="star">&#9733;</label>
        <input type="radio" id="4-stars" name="rating" value="4" v-model="payload.score"/>
        <label for="4-stars" class="star">&#9733;</label>
        <input type="radio" id="3-stars" name="rating" value="3" v-model="payload.score"/>
        <label for="3-stars" class="star">&#9733;</label>
        <input type="radio" id="2-stars" name="rating" value="2" v-model="payload.score"/>
        <label for="2-stars" class="star">&#9733;</label>
        <input type="radio" id="1-star" name="rating" value="1" v-model="payload.score"/>
        <label for="1-star" class="star">&#9733;</label>
      </div>
      <textarea style="resize:none;width:100%;" rows="2" type="text" id="content" v-model="payload.content" required class="mt-1 mr-2 contentedit"></textarea>
      <input type="image" @click="onUpdate" src="data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHZpZXdCb3g9IjAgMCAxNzIgMTcyIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2UtbGluZWNhcD0iYnV0dCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2UtZGFzaGFycmF5PSIiIHN0cm9rZS1kYXNob2Zmc2V0PSIwIiBmb250LWZhbWlseT0ibm9uZSIgZm9udC13ZWlnaHQ9Im5vbmUiIGZvbnQtc2l6ZT0ibm9uZSIgdGV4dC1hbmNob3I9Im5vbmUiIHN0eWxlPSJtaXgtYmxlbmQtbW9kZTogbm9ybWFsIj48cGF0aCBkPSJNMCwxNzJ2LTE3MmgxNzJ2MTcyeiIgZmlsbD0ibm9uZSI+PC9wYXRoPjxnIGZpbGw9IiNmZmZmZmYiPjxwYXRoIGQ9Ik04Niw2Ljg4Yy00My42NTUyLDAgLTc5LjEyLDM1LjQ2NDggLTc5LjEyLDc5LjEyYzAsNDMuNjU1MiAzNS40NjQ4LDc5LjEyIDc5LjEyLDc5LjEyYzQzLjY1NTIsMCA3OS4xMiwtMzUuNDY0OCA3OS4xMiwtNzkuMTJjMCwtNDMuNjU1MiAtMzUuNDY0OCwtNzkuMTIgLTc5LjEyLC03OS4xMnpNODYsMTMuNzZjMzkuOTM2OCwwIDcyLjI0LDMyLjMwMzIgNzIuMjQsNzIuMjRjMCwzOS45MzY4IC0zMi4zMDMyLDcyLjI0IC03Mi4yNCw3Mi4yNGMtMzkuOTM2OCwwIC03Mi4yNCwtMzIuMzAzMiAtNzIuMjQsLTcyLjI0YzAsLTM5LjkzNjggMzIuMzAzMiwtNzIuMjQgNzIuMjQsLTcyLjI0ek0xMjAuMzU5NjksNTEuNTU5NjljLTEuMTM0ODYsMC4wMjIzNyAtMi4xODU2NCwwLjYwMzA3IC0yLjgwODQ0LDEuNTUyMDNsLTM1LjA5MjAzLDUxLjcyNzY1bC0yNS4wODEwOSwtMjMuMjczNzVjLTAuODk2NzYsLTAuODYyOSAtMi4xODk2MSwtMS4xNzQyMyAtMy4zODA4OCwtMC44MTQxNGMtMS4xOTEyNiwwLjM2MDA5IC0yLjA5NTE5LDEuMzM1NDQgLTIuMzYzODEsMi41NTA2Yy0wLjI2ODYyLDEuMjE1MTYgMC4xMzk5NSwyLjQ4MDY1IDEuMDY4NDMsMy4zMDkzMmwzMC45NDY1NiwyOC43MTU5NGwzOS42MDAzMSwtNTguMzU5MDZjMC43NDA2NCwtMS4wNjEyNSAwLjgyMzA3LC0yLjQ0ODM2IDAuMjEzMzMsLTMuNTg5ODZjLTAuNjA5NzQsLTEuMTQxNSAtMS44MDg1LC0xLjg0NDI1IC0zLjEwMjM5LC0xLjgxODczeiI+PC9wYXRoPjwvZz48L2c+PC9zdmc+" width="25">
      <input type="image" @click="switchIsEditing" src="data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHZpZXdCb3g9IjAgMCAxNzIgMTcyIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2UtbGluZWNhcD0iYnV0dCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2UtZGFzaGFycmF5PSIiIHN0cm9rZS1kYXNob2Zmc2V0PSIwIiBmb250LWZhbWlseT0ibm9uZSIgZm9udC13ZWlnaHQ9Im5vbmUiIGZvbnQtc2l6ZT0ibm9uZSIgdGV4dC1hbmNob3I9Im5vbmUiIHN0eWxlPSJtaXgtYmxlbmQtbW9kZTogbm9ybWFsIj48cGF0aCBkPSJNMCwxNzJ2LTE3MmgxNzJ2MTcyeiIgZmlsbD0ibm9uZSI+PC9wYXRoPjxnIGZpbGw9IiNmZmZmZmYiPjxwYXRoIGQ9Ik04Niw2Ljg4Yy00My42NTg0NCwwIC03OS4xMiwzNS40NjE1NiAtNzkuMTIsNzkuMTJjMCw0My42NTg0NCAzNS40NjE1Niw3OS4xMiA3OS4xMiw3OS4xMmM0My42NTg0NCwwIDc5LjEyLC0zNS40NjE1NiA3OS4xMiwtNzkuMTJjMCwtNDMuNjU4NDQgLTM1LjQ2MTU2LC03OS4xMiAtNzkuMTIsLTc5LjEyek04NiwxMy43NmMzOS45MzYyNSwwIDcyLjI0LDMyLjMwMzc1IDcyLjI0LDcyLjI0YzAsMzkuOTM2MjUgLTMyLjMwMzc1LDcyLjI0IC03Mi4yNCw3Mi4yNGMtMzkuOTM2MjUsMCAtNzIuMjQsLTMyLjMwMzc1IC03Mi4yNCwtNzIuMjRjMCwtMzkuOTM2MjUgMzIuMzAzNzUsLTcyLjI0IDcyLjI0LC03Mi4yNHpNNjguOCw2MS45MmwtMjQuMDgsMjQuMDhsMjQuMDgsMjQuMDh2LTIwLjY0aDYxLjkydi02Ljg4aC02MS45MnoiPjwvcGF0aD48L2c+PC9nPjwvc3ZnPg==" width="25">
    </span>

    <span v-if="currentUser.username === review.user.username && !isEditing">
      <input type="image" @click="switchIsEditing" src="data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHZpZXdCb3g9IjAgMCAxNzIgMTcyIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2UtbGluZWNhcD0iYnV0dCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2UtZGFzaGFycmF5PSIiIHN0cm9rZS1kYXNob2Zmc2V0PSIwIiBmb250LWZhbWlseT0ibm9uZSIgZm9udC13ZWlnaHQ9Im5vbmUiIGZvbnQtc2l6ZT0ibm9uZSIgdGV4dC1hbmNob3I9Im5vbmUiIHN0eWxlPSJtaXgtYmxlbmQtbW9kZTogbm9ybWFsIj48cGF0aCBkPSJNMCwxNzJ2LTE3MmgxNzJ2MTcyeiIgZmlsbD0ibm9uZSI+PC9wYXRoPjxnIGZpbGw9IiNmZmZmZmYiPjxwYXRoIGQ9Ik0xNTAuODc2OTIsNDQuNzQwODNjLTUuMTY2OTMsLTUuMTUwNjcgLTEzLjA2Mzk3LC02LjM4NTkgLTE5LjU1Njk0LC0zLjA1OTA1di0xMi4xMTkyOGMtMC4wMTA1NSwtOS4yNzIyOCAtNy41MjQ1OSwtMTYuNzg2MzIgLTE2Ljc5Njg3LC0xNi43OTY4N2gtODIuOTk1MDRjLTkuMjcyMjgsMC4wMTA1NSAtMTYuNzg2MzIsNy41MjQ1OSAtMTYuNzk2ODcsMTYuNzk2ODh2MTEyLjg3NWMwLjAxMDU1LDkuMjcyMjggNy41MjQ1OSwxNi43ODYzMiAxNi43OTY4OCwxNi43OTY4OGg4Mi45OTUzOGM5LjI3MjI4LC0wLjAxMDU1IDE2Ljc4NjMyLC03LjUyNDU5IDE2Ljc5Njg4LC0xNi43OTY4N3YtNTEuNDQwNzdsMjEuMDI5NjksLTIxLjAyOTY5YzYuNTU5NDQsLTYuNTU5NTYgNi41NTk0NCwtMTcuMTk0NTggMCwtMjMuNzU0MTR6TTc2Ljg3MzI1LDEwNy44NzYyNWwxMi4yMzYxOSwxMi4zNDk0bC0xNi42NTQ3Nyw0LjQxODU5ek05NS41OTIwMiwxMTcuMjIyN2wtMTUuNzI1OTEsLTE1Ljg3MDM2bDQ1LjM5MDUzLC00NS4yNjA4NmwxNS43MzQzLDE1LjczMTk1ek0xMjQuNjAxMjMsMTQyLjQzNzVjLTAuMDA2MjksNS41NjMzOSAtNC41MTQ3NCwxMC4wNzE4MyAtMTAuMDc4MTIsMTAuMDc4MTNoLTgyLjk5NTA0Yy01LjU2MzM5LC0wLjAwNjI5IC0xMC4wNzE4MywtNC41MTQ3NCAtMTAuMDc4MTIsLTEwLjA3ODEydi0xMTIuODc1YzAuMDA2MjksLTUuNTYzMzkgNC41MTQ3NCwtMTAuMDcxODMgMTAuMDc4MTMsLTEwLjA3ODEyaDgyLjk5NTM4YzUuNTYzMzksMC4wMDYyOSAxMC4wNzE4Myw0LjUxNDc0IDEwLjA3ODEzLDEwLjA3ODEzdjE3LjY5MjE1bC01MS44NTA5NSw1MS43MDMxM2MtMC40MjIxNiwwLjQyMDc5IC0wLjcyNDY4LDAuOTQ2MzkgLTAuODc2NDYsMS41MjI4bC03LjM4NzYsMjguMDM2Yy0wLjMwNDc4LDEuMTU2NjYgMC4wMjg0NSwyLjM4ODEzIDAuODc0OSwzLjIzMzI3YzAuODQ2NDUsMC44NDUxNCAyLjA3ODQ0LDEuMTc2NDUgMy4yMzQ2MiwwLjg2OTg3bDI3Ljg0NjUzLC03LjM4Nzk0YzAuNTcyNzEsLTAuMTUxODcgMS4wOTUwNiwtMC40NTI1MSAxLjUxNDA3LC0wLjg3MTQybDI2LjY0NDU1LC0yNi42NDQ1NXpNMTQ3LjU5ODE3LDY1LjIxNjIybC0xLjg1NjM5LDEuODU2NzNsLTE1LjcyNzU5LC0xNS43Mjc1OWwxLjg3MjE4LC0xLjg2NjhjMy45NDEyMiwtMy45MTUzMyAxMC4zMDU1MywtMy45MDk2MiAxNC4yMzk3MiwwLjAxMjc3bDEuNDcyNDEsMS40NzI0MWMzLjkyOTQ2LDMuOTM4MzYgMy45MjkzMSwxMC4zMTQzMSAtMC4wMDAzNCwxNC4yNTI0OHoiPjwvcGF0aD48L2c+PC9nPjwvc3ZnPg==" width="25">
      <input type="image" @click="deleteReview(payload)" src="data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHZpZXdCb3g9IjAgMCAxNzIgMTcyIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2UtbGluZWNhcD0iYnV0dCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2UtZGFzaGFycmF5PSIiIHN0cm9rZS1kYXNob2Zmc2V0PSIwIiBmb250LWZhbWlseT0ibm9uZSIgZm9udC13ZWlnaHQ9Im5vbmUiIGZvbnQtc2l6ZT0ibm9uZSIgdGV4dC1hbmNob3I9Im5vbmUiIHN0eWxlPSJtaXgtYmxlbmQtbW9kZTogbm9ybWFsIj48cGF0aCBkPSJNMCwxNzJ2LTE3MmgxNzJ2MTcyeiIgZmlsbD0ibm9uZSI+PC9wYXRoPjxnIGZpbGw9IiNmZmZmZmYiPjxwYXRoIGQ9Ik04Niw2Ljg4Yy00My42NTUyLDAgLTc5LjEyLDM1LjQ2NDggLTc5LjEyLDc5LjEyYzAsNDMuNjU1MiAzNS40NjQ4LDc5LjEyIDc5LjEyLDc5LjEyYzQzLjY1NTIsMCA3OS4xMiwtMzUuNDY0OCA3OS4xMiwtNzkuMTJjMCwtNDMuNjU1MiAtMzUuNDY0OCwtNzkuMTIgLTc5LjEyLC03OS4xMnpNODYsMTMuNzZjMzkuOTM2OCwwIDcyLjI0LDMyLjMwMzIgNzIuMjQsNzIuMjRjMCwzOS45MzY4IC0zMi4zMDMyLDcyLjI0IC03Mi4yNCw3Mi4yNGMtMzkuOTM2OCwwIC03Mi4yNCwtMzIuMzAzMiAtNzIuMjQsLTcyLjI0YzAsLTM5LjkzNjggMzIuMzAzMiwtNzIuMjQgNzIuMjQsLTcyLjI0ek0xMTMuNDg2NCw1NC45OTI5N2MtMC45MDczNywwLjAyMTQ1IC0xLjc2OTUxLDAuNDAwNiAtMi4zOTg1OSwxLjA1NDg1bC0yNS4wODc4MSwyNS4wODc4MWwtMjUuMDg3ODEsLTI1LjA4NzgxYy0wLjY0NzY1LC0wLjY2NTc1IC0xLjUzNjk4LC0xLjA0MTM1IC0yLjQ2NTc4LC0xLjA0MTQxYy0xLjM5OTgyLDAuMDAwMzcgLTIuNjU5ODQsMC44NDg4NCAtMy4xODY1OCwyLjE0NTc3Yy0wLjUyNjc0LDEuMjk2OTMgLTAuMjE1MTYsMi43ODM3IDAuNzg3OTksMy43NjAwMWwyNS4wODc4MSwyNS4wODc4MWwtMjUuMDg3ODEsMjUuMDg3ODFjLTAuODk4NjcsMC44NjI4MSAtMS4yNjA2OCwyLjE0NDA0IC0wLjk0NjQxLDMuMzQ5NTZjMC4zMTQyNywxLjIwNTUyIDEuMjU1NywyLjE0Njk2IDIuNDYxMjIsMi40NjEyMmMxLjIwNTUyLDAuMzE0MjcgMi40ODY3NSwtMC4wNDc3NCAzLjM0OTU2LC0wLjk0NjQxbDI1LjA4NzgxLC0yNS4wODc4MWwyNS4wODc4MSwyNS4wODc4MWMwLjg2MjgxLDAuODk4NjcgMi4xNDQwNCwxLjI2MDY4IDMuMzQ5NTYsMC45NDY0MWMxLjIwNTUyLC0wLjMxNDI3IDIuMTQ2OTYsLTEuMjU1NyAyLjQ2MTIyLC0yLjQ2MTIyYzAuMzE0MjcsLTEuMjA1NTIgLTAuMDQ3NzQsLTIuNDg2NzUgLTAuOTQ2NDEsLTMuMzQ5NTZsLTI1LjA4NzgxLC0yNS4wODc4MWwyNS4wODc4MSwtMjUuMDg3ODFjMS4wMjI1MSwtMC45ODMyNSAxLjMzNjY5LC0yLjQ5MzMgMC43OTExOSwtMy44MDI3OWMtMC41NDU1LC0xLjMwOTQ5IC0xLjgzODgxLC0yLjE0OTkgLTMuMjU2OTcsLTIuMTE2NDN6Ij48L3BhdGg+PC9nPjwvZz48L3N2Zz4=" width="25">
    </span>
    <hr>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'ReviewListItem',
  props: { review: Object },
  data() {
    return {
      isEditing: false,
      payload: {
        moviePk: this.review.movie,
        reviewPk: this.review.pk,
        score: this.review.score,
        content: this.review.content
      },
      
    }
  },
  computed: {
    ...mapGetters(['currentUser']),
  },
  methods: {
    ...mapActions(['updateReview', 'deleteReview']),
    switchIsEditing() {
      this.isEditing = !this.isEditing
    },
    onUpdate() {
      this.updateReview(this.payload)
      this.isEditing = false
      location.reload()
    },
  },
  created() {
    this.score = this.payload.score * 20 + 1.5
  }
}
</script>

<style>
.star-rating {
  border:solid 1px #ccc;
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

.star-ratings {
  color: #aaa9a9; 
  position: relative;
  unicode-bidi: bidi-override;
  width: max-content;
}
 
.star-ratings-fill {
  /* color: #fff58c; */
  color: gold;
  padding: 0;
  position: absolute;
  z-index: 1;
  display: flex;
  top: 0;
  left: 0;
  overflow: hidden;
}
 
.star-ratings-base {
  z-index: 0;
  padding: 0;
}
</style>