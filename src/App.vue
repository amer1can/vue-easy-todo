<template>
  <div class="container">
    <header-component
      @add-todo="addNewTask"
    ></header-component>
    <hr>
    <filter-component
        @show-all="showAllList"
        @show-active="showActiveList"
    ></filter-component>
    <hr>
    <todo-elem-component
        v-for="item in itemsList"
        :key="item.id"
        :curItem="item"
        @update="updateNow"
        @delete-item="delItem"
    ></todo-elem-component>
  </div>
</template>

<script>
import HeaderComponent from "@/components/HeaderComponent";
import TodoElemComponent from "@/components/TodoElemComponent";
import FilterComponent from "@/components/FilterComponent";

export default {
  name: 'App',
  components: {
    FilterComponent,
    TodoElemComponent,
    HeaderComponent,
  },
  data() {
    return {
      itemsList: [
        {
          id: 0,
          title: 'Какой-то заголовок',
          text: 'Самый обычный текст какой-то задачи',
          checked: true
        }
      ],
      posts: []
    }
  },
  mounted() {
    this.showAllList()
  },
  created() {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(data => this.posts = data)
  },
  methods: {
    showAllList() {
      if (localStorage.getItem('Todos')) {
        try {
          this.itemsList = JSON.parse(localStorage.getItem('Todos'))
        } catch(e) {
          localStorage.removeItem('Todos')
        }
      }
    },
    showActiveList() {
      this.itemsList = this.itemsList.filter(item => item.checked === false)
    },
    saveLocal() {
      const parsed = JSON.stringify(this.itemsList)
      localStorage.setItem('Todos', parsed)
    },
    addNewTask(newTitle, newText, id = null) {
      if (id == null) {
        const lastId = this.itemsList[this.itemsList.length - 1].id;
        this.itemsList.push({
          id: lastId + 1,
          title: newTitle,
          text: newText,
          checked: false
        })
      } else {
        const findInd = this.itemsList.findIndex(elem => elem.id === id)
        this.itemsList[findInd].title = newTitle
        this.itemsList[findInd].text = newText
      }
      this.saveLocal()
    },
    delItem(id) {
      const findInd = this.itemsList.findIndex(elem => elem.id === id)
      this.itemsList.splice(findInd, 1)

      this.saveLocal()
    },
     updateNow(val,id) {
       const findInd = this.itemsList.findIndex(elem => elem.id === id)
       this.itemsList[findInd].checked = val
       this.saveLocal()
     },
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.add {
  max-width: 400px;
  margin: 0 auto;
}
</style>
