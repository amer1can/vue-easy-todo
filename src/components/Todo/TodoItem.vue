<template>
  <div class="card mt-5">
    <h3 class="card-header">{{ item.title }}</h3>
    <div class="card-body">
      <p class="card-text">{{ item.text}}</p>
      <ul v-if="item.subtasks && item.subtasks.length > 0">
      <todo-item
          v-for="(child, subIndex) in item.subtasks"
          :item="child"
          :index="subIndex"
          :key="child.id"
          :parent-item="item"
          @delete-sub-task="deleteSubTask"
      >
      </todo-item>
      </ul>
    </div>
    <div class="btns mb-3">
      <button class="btn btn-dark mx-2" v-if="parentItem" @click="deleteSubTask">Delete subtask</button>
      <button class="btn btn-dark mx-2" v-if="!parentItem" @click="deleteTask">Delete TASK</button>
      <button class="btn btn-dark mx-2" @click="$store.commit('addSubTask'), item">Add subtask</button>
    </div>

  </div>
</template>

<script>
export default {
  name: "TodoItem",
  props: {
    item: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
    parentItem: {
      required: false
    }
  },
  emits:['deleteItem'],
  methods: {
    deleteSubTask() {
      this.$store.state.parentItem.subtasks.splice(this.index, 1)
    },
    deleteTask() {
      this.$emit('deleteItem', this.index)
    },
  }

}
</script>

<style scoped>

</style>
