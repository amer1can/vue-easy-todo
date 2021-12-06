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
        @edit-item="editTodo"
    ></todo-elem>
  </div>
</template>

<script>
import TodoElem from "@/components/TodoElem";
import TodoHeader from "@/components/TodoHeader";
import TodoFilter from "@/components/TodoFilter";
import axios from "axios";

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
      const response = await axios.get('https://training-db-16ce6-default-rtdb.firebaseio.com/tasks.json')
      const data = await response.data
      this.itemsList = Object.keys(data).map(key => {
        return {
          dbkey: key,
          ...data[key]
        }
      })
    },
    showActiveList() {
      this.itemsList = this.itemsList.filter(item => item.checked === false)
    },
    async saveLocal() {
      await axios.post('https://training-db-16ce6-default-rtdb.firebaseio.com/tasks.json', {
            id: this.id,
            text: this.text,
            title: this.title,
            checked: this.checked
      })
      // await fetch('https://training-db-16ce6-default-rtdb.firebaseio.com/tasks.json', {
      //   method: "POST",
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify({
      //     id: this.id,
      //     text: this.text,
      //     title: this.title,
      //     checked: this.checked
      //   })
      // })

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
      const curDel = this.itemsList.findIndex(elem => elem.dbkey === key)
      this.itemsList.splice(curDel,1)
      await axios.delete(`https://training-db-16ce6-default-rtdb.firebaseio.com/tasks/${key}.json`)
    },
    async updateNow(val, key) {
      const curUpdate = this.itemsList.find(elem => elem.dbkey === key)
      curUpdate.checked = val
      await axios.patch(`https://training-db-16ce6-default-rtdb.firebaseio.com/tasks/${key}.json`, {
        checked: val
      })
    },
    async editTodo(key) {
      const curItem = this.itemsList.find(elem => elem.dbkey === key)
      console.log('edit: ', curItem.title)
    }
  }
}
</script>

<style scoped>

</style>
