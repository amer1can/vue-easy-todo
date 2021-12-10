<template>
  <div class="container">
    <button class="btn btn-dark"
            @click="$store.commit('addItem')"
    >Add</button>
    <todo-item
        v-for="(item,index) in $store.state.items"
        :key="item.id"
        :index="index"
        :item="item"
        @delete-item="$store.commit('deleteItem', index)"
    ></todo-item>
  </div>
</template>

<script>
import TodoItem from "@/components/Todo/TodoItem";
export default {
  name: "TodoList",
  components: {TodoItem},
}
</script>

<style scoped>

</style>
