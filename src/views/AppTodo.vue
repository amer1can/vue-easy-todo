<template>
  <div class="container">
    <todo-header
        @add-todo="addNewTask"
        @change-app-title="changeAppTitle"
        :saved-title="editTitle"
        :saved-text="editText"
        :app-title="globalAppName"
    ></todo-header>
    <todo-filter
        @show-all="showAllList"
        @show-active="showActiveList"
        @show-de-active="showDeActiveList"
    ></todo-filter>
    <hr>
    <div class="empty" v-if="!filteredList || filteredList.length === 0">
      <h1>Список пуст</h1>
    </div>
    <todo-elem
        v-else
        v-for="item in filteredList"
        :key="item.dbkey"
        :curItem="item"
        @update="updateNow"
        @delete-item="delItem(item.dbkey)"
        @edit-item="editTodo"
    ></todo-elem>
    <hr>
    <todo-list></todo-list>
  </div>
</template>

<script>
import TodoElem from "@/components/Todo/TodoElem";
import TodoHeader from "@/components/Todo/TodoHeader";
import TodoFilter from "@/components/Todo/TodoFilter";
import axios from "axios";
import TodoList from "@/components/Todo/TodoList";

export default {
  name: "AppTodo",
  components: {
    TodoList,
    TodoElem,
    TodoHeader,
    TodoFilter
  },
  data() {
    return {
      globalAppName: 'Simple Todo',
      itemsList: [],
      id: 0,
      text: '',
      title: '',
      checked: false,
      editTitle: null,
      editText: null,
      filteredList: null
    }
  },
  mounted() {
    this.loadList()
  },
  methods: {
    async loadList() {
      const response = await axios.get('https://training-db-16ce6-default-rtdb.firebaseio.com/tasks.json')
      const data = await response.data
      this.itemsList = Object.keys(data).map(key => {
        return {
          dbkey: key,
          ...data[key]
        }
      })

      this.filteredList = this.itemsList

    },
    showAllList() {
      this.filteredList = this.itemsList
    },
    showActiveList() {
      this.filteredList = this.itemsList.filter(item => item.checked === false)
    },
    showDeActiveList() {
      this.filteredList = this.itemsList.filter(item => item.checked === true)
    },
    async saveLocal() {
      await axios.post('https://training-db-16ce6-default-rtdb.firebaseio.com/tasks.json', {
            id: this.id,
            text: this.text,
            title: this.title,
            checked: this.checked
      })
      await this.loadList()
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
    async editTodo(key, newTitle, newText) {
      const curUpdate = this.itemsList.find(elem => elem.dbkey === key)
      curUpdate.title = newTitle
      curUpdate.text = newText

      await axios.patch(`https://training-db-16ce6-default-rtdb.firebaseio.com/tasks/${key}.json`, {
        title: newTitle,
        text:  newText
      })
    },
    changeAppTitle(newTitle) {
      this.globalAppName = newTitle
      console.log(this.globalAppName)
    }
  }
}
</script>

<style scoped>

</style>
