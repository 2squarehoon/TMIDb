<template>
  <div class="background" id="app">
    <nav-bar></nav-bar>
    <br><br><br>
    <router-view/>
  </div>
</template>
<script>
import NavBar from '@/components/NavBar.vue'

import { mapActions } from 'vuex'

export default {
  name: 'App',
  components: { NavBar },
  methods: {
    ...mapActions(['fetchCurrentUser'])
  },
  created() {
    this.fetchCurrentUser()
  }
}
</script>

<style>
h1 {
  text-align: center;
  padding-top: 10px;
  padding-top: 5px;
  color: whitesmoke;
  font-family: SDMiSaeng;
  font-size: 4.02rem !important;
}

h2 {
  color: whitesmoke;
  font-family: SDMiSaeng;
  font-size: 3.32rem !important;
}

h3 {
  color: whitesmoke;
  font-family: SDMiSaeng;
  font-size: 2.93rem !important;
}

h5 {
  color: whitesmoke;
  font-family: SDMiSaeng;
  font-size: 2.16rem !important;
}

p, th, a, label {
  color: whitesmoke;
  font-family: SDMiSaeng;
  font-size: 1.73rem !important;
}

hr {
  border: solid 1px whitesmoke !important; 
}

label {
  color: whitesmoke;
}
.main {
  text-align: center;
  font-size: 25px;
  margin-bottom: 10px;
}
nav {
  padding: 10px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
}

.movie-card {
  border: 1px solid black;
  display: flex;
  width: 200px;
  text-align: center;
  text-decoration: none;
  justify-content: center;
  position: relative;
}

.movie-card a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
}

.movie-card-img {
  /* height: 350px; */
  height: 550px;
  margin-bottom: 10px;
  /* transform: scale(1.1) */
}

.movie-card:hover img {
  opacity: 0.2;
  /* transform: scale(1.25); */
}

.movie-card .inner-content {
  width: 80%;
  opacity: 0;
  transform: translateX(-50%) translateY(-50%);
  position: absolute;
  top: 80%;
  left: 50%;
  transition: all 600ms ease;
  color: whitesmoke;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.movie-card:hover .inner-content {
  opacity: 1;
  top: 50%;
}

.movie-card .inner-content .title {
  font-family: SDMiSaeng;
  font-size: 2rem !important;
  font-weight: 700;
}

.movie-card .inner-content .rating {
  font-family: SDMiSaeng;
  font-size: 1.5rem !important;
  font-weight: 700;
}

.movie-card .inner-content hr {
  border-top: 1px solid #f1f1f1;
  width: 100%;
}

.background{
  overflow: hidden;
  min-height:100vh;
  margin:0;
  background-color: #333333;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}

.button-3{
  width:120px;
  height:40px;
  border:2px solid whitesmoke;
  text-align:center;
  cursor:pointer;
  position:relative;
  box-sizing:border-box;
  overflow:hidden;
  ;
}
.button-3 a{
  font-family: SDMiSaeng;
  font-size: 1.73rem !important;
  color: whitesmoke;
  text-decoration:none;
  line-height:40px;
  transition:all .5s ease;
  z-index:2;
  position:relative;
}
.eff-3{
  width:120px;
  height:40px;
  bottom:-50px;
  background:whitesmoke;
  position:absolute;
  transition:all .5s ease;
  z-index:1;
}
.button-3:hover .eff-3{
  bottom:0;
}
.button-3:hover a{
  color: black;
}

.routertext {
  color: whitesmoke;
  text-decoration:none;
}

ul.mylist {
  list-style:none
}

ul.mylist li {
    padding: 5px 0px 5px 5px;
    margin-bottom: 5px;
    border-bottom: 1px solid whitesmoke;
    font-size: 20px;
}

.content {
  color: whitesmoke;
  font-family: SDMiSaeng;
  font-size: 1.5rem !important;
}

.contentedit {
  font-family: SDMiSaeng;
  font-size: 1.5rem !important;
}

.like-msg {
  color: gray;
  font-family: SDMiSaeng;
  font-size: 1.5rem !important;
}

@font-face {
  font-family: 'SDMiSaeng';
  src: url(assets/SDMiSaeng.ttf) format('truetype');
}
</style>

