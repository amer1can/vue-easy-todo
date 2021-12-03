<template>
  <div class="item d-flex border border-dark mt-3 rounded-3"
       :class="curItem.checked ? 'done' : 'active'"
  >
    <div class="align-self-center mx-5">
      <input type="checkbox"
             :checked="curItem.checked"
             @change="changeCheck"
      >
    </div>
    <div class="px-2 py-1 my-1 text-start flex-grow-1 flex-wrap">
      <h6 class="display-6 fw-bold">{{ curItem.title }}</h6>
      <p class="lead mb-4">{{ curItem.text }}</p>
    </div>
    <button type="button" class="btn btn-dark btn-lg px-4 gap-3 align-self-center mx-1"
    >Редактировать</button>
    <button type="button" class="btn btn-dark btn-lg px-4 gap-3 align-self-center mx-4"
      @click="deleteCurItem"
    >Удалить</button>
  </div>
</template>

<script>
export default {
  name: "TodoElemComponent",
  props: ['curItem'],
  data() {
    return {
      value: this.curItem.checked
    }
  },
  methods: {
    changeCheck() {
      this.value = !this.value
      this.$emit('update', this.value, this.curItem.id)
    },
    deleteCurItem() {
      this.$emit('deleteItem', this.curItem.id)
    },
  }
}
</script>

<style scoped>
.done {
  background: #f8aaaa;
}
.active {
  background: #abefab;
}
</style>
