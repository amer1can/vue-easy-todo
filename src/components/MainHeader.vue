<template>
  <div class="container">
    <header class="d-flex justify-content-center py-3">
      <ul class="nav nav-pills">
        <li class="nav-item"><router-link to="/" class="nav-link" aria-current="page">Home</router-link></li>
        <li class="nav-item"><router-link to="todo" class="nav-link">Todo</router-link></li>
        <li class="nav-item"><a href="#" class="nav-link">Pricing</a></li>
        <li class="nav-item"><a href="#" class="nav-link">FAQs</a></li>
        <li class="nav-item"><a href="#" class="nav-link">About</a></li>
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