<template>
  <main-header></main-header>
  <router-view></router-view>
</template>

<script>
import MainHeader from "@/components/MainHeader";

export default {
  name: 'App',
  components: {
    MainHeader,
  },

}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.add {
  max-width: 400px;
  margin: 0 auto;
}
.nav a.router-link-exact-active {
  color: #fff;
  background-color: #0d6efd;
}
</style>
