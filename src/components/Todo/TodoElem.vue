<template>
  <div class="item d-flex border border-dark mt-3 rounded-3"
       :class="curItem.checked ? 'done' : 'active'"
  >
    <div class="align-self-center mx-5">
      <input type="checkbox"
             :checked="curItem.checked"
             @click="changeCheck"
             :disabled="this.mode === 'edit'"
      >
    </div>
    <div class="px-2 py-1 my-1 text-start flex-grow-1 flex-wrap">
      <div v-if="this.mode == null">
        <h6 class="display-6 fw-bold">{{ curItem.title }}</h6>
        <p class="lead mb-4">{{ curItem.text }}</p>
      </div>
      <div v-else>
        <input class="form-control" type="text" v-model="newTitle"><br>
        <input class="form-control" type="text" v-model="newText">
      </div>

    </div>
    <button type="button" class="btn btn-dark btn-lg px-4 gap-3 align-self-center mx-1"
            @click="editThis(curItem.dbkey)"
    >{{ this.mode === null ? 'Редактировать' : 'Применить' }}</button>

    <button type="button" class="btn btn-dark btn-lg px-4 gap-3 align-self-center mx-4"
      @click="deleteCurItem"
      :disabled="this.mode === 'edit'"
    >Удалить</button>
  </div>
</template>

<script>
export default {
  name: "TodoElemComponent",
  props: ['curItem'],
  emits: ['deleteItem', 'update', 'editItem'],
  data() {
    return {
      value: this.curItem.checked,
      mode: null,
      newTitle: this.curItem.title,
      newText: this.curItem.text
    }
  },
  methods: {
    changeCheck() {
      this.value = !this.value
      this.$emit('update', this.value, this.curItem.dbkey)
    },
    deleteCurItem() {
      this.$emit('deleteItem')
    },
    editThis(key) {
      if (this.mode === null ) {
        this.mode = 'edit'
      } else {
        this.mode = null
        this.$emit('editItem', key, this.newTitle, this.newText)
      }
    }
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
