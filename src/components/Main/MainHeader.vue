<template>
  <div class="container bg-black text-light">
    <header class="d-flex justify-content-center py-3">
      <ul class="nav nav-pills">
        <li class="nav-item"><router-link to="/" class="nav-link" aria-current="page">Home</router-link></li>
        <li class="nav-item"><router-link to="/todo" class="nav-link">Todo</router-link></li>
        <li class="nav-item"><router-link to="/map" class="nav-link">Map</router-link></li>
        <li class="nav-item"><router-link to="/hiring" class="nav-link">Hiring API</router-link></li>
      </ul>
    </header>
  </div>
</template>

<script>
export default {
  name: "MainHeader"
}
</script>

<style scoped>

</style>
