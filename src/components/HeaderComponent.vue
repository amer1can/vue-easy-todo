<template>
  <header class="d-flex justify-content-between py-3 border-bottom">
    <h1>Simple Todo</h1>
    <div class="addNewTodo d-flex align-items-center">
      <div class="inputs">
        <input type="text" class="form-control mt-2" placeholder="Заголовок" v-model="innTitle">
        <input type="text" class="form-control mt-2" placeholder="Текст" name="text" v-model="innText">
      </div>
      <button class="btn btn-dark mt-2 mx-5" @click="sendNewTask">Добавить</button>
    </div>

  </header>
</template>

<script>
export default {
  name: "HeaderComponent",
  props: ['savedTitle, savedText'],
  data() {
    return {
      innTitle: '',
      innText: ''
    }
  },
  methods: {
    sendNewTask() {
      this.$emit('addTodo', this.innTitle, this.innText)
      this.innTitle = ''
      this.innText = ''
    }
  }
}
</script>

<style scoped>

</style>
