<template>
  <div class="container">
    <todo-header
        @add-todo="addNewTask"
    ></todo-header>
    <todo-filter
        @show-all="showAllList"
        @show-active="showActiveList"
    ></todo-filter>
    <hr>
    <div class="empty" v-if="itemsList === null">
      <h1>Список пуст</h1>
    </div>
    <todo-elem
        v-else
        v-for="item in itemsList"
        :key="item.dbkey"
        :curItem="item"
        @update="updateNow"
        @delete-item="delItem(item.dbkey)"
    ></todo-elem>
  </div>
</template>

<script>
import TodoElem from "@/components/TodoElem";
import TodoHeader from "@/components/TodoHeader";
import TodoFilter from "@/components/TodoFilter";
// import axios from "axios";

export default {
  name: "AppTodo",
  components: {
    TodoElem,
    TodoHeader,
    TodoFilter
  },
  data() {
    return {
      itemsList: [],
      id: 0,
      text: '',
      title: '',
      checked: false
    }
  },
  mounted() {
    this.showAllList()
  },
  methods: {
    async showAllList() {
      const response = await fetch('https://training-db-16ce6-default-rtdb.firebaseio.com/tasks.json')
      const data = await response.json()
      this.itemsList = Object.keys(data).map(key => {
        return {
          dbkey: key,
          ...data[key]
        }
      })
      console.log(this.itemsList)
    },
    showActiveList() {
      this.itemsList = this.itemsList.filter(item => item.checked === false)
    },
    async saveLocal() {
      await fetch('https://training-db-16ce6-default-rtdb.firebaseio.com/tasks.json', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: this.id,
          text: this.text,
          title: this.title,
          checked: this.checked
        })
      })

      await this.showAllList()
    },
    addNewTask(newTitle, newText) {

      let lastId;

      if (this.itemsList !== null) {
        lastId = this.itemsList[this.itemsList.length - 1].id
      } else {
        lastId = 0
      }

      this.id = lastId + 1
      this.title = newTitle
      this.text = newText
      this.checked = false

      this.saveLocal()
    },
    async delItem(key) {
      await fetch(`https://training-db-16ce6-default-rtdb.firebaseio.com/tasks/${key}.json`, {
        method: 'DELETE'
      })
      // await axios.delete(`https://training-db-16ce6-default-rtdb.firebaseio.com/tasks/${key}.json`)
      await this.showAllList()
    },
    async updateNow(val, key) {
      await fetch(`https://training-db-16ce6-default-rtdb.firebaseio.com/tasks/${key}.json`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          checked: val
        })
      })
    },
  }
}
</script>

<style scoped>

</style>