<template>
  <main-header></main-header>
  <router-view></router-view>
</template>

<script>
import MainHeader from "@/components/Main/MainHeader";

export default {
  name: 'App',
  components: {
    MainHeader,
  },

}
</script>

<style>

body {
  background: black!important;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 10px;
}
.add {
  max-width: 400px;
  margin: 0 auto;
}
.nav a.router-link-exact-active {
  color: #fff;
  background-color: #e53c69;
}

/*.leaflet-interactive:hover {*/
/*  -webkit-box-shadow: 0px 5px 10px 20px rgba(43, 161, 251, 0.2);*/
/*  -moz-box-shadow: 0px 5px 10px 20px rgba(43, 161, 251, 0.2);*/
/*  box-shadow: 0px 5px 10px 20px rgba(43, 161, 251, 0.2);*/
/*}*/
</style>
