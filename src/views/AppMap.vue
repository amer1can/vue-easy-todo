<template>
  <div class="container">
    <h1 class="text-white">Map</h1>

    <div class="row">

      <div class="col-10">
      <map-container :items="list" :clicked="clicked"></map-container>
      </div>

      <div class="col-2 text-white" >
        <div class="list-wrap text-start">
          <h6>Фильтр: </h6>
          <input type="text" v-model="searchElem">
          <hr>
          <h6><b>Объекты для поиска:</b></h6>
          <ul class="items-list">
            <li class="list-item my-1"
                :class="clickedId === item.id ? 'activelink' : ''"
                v-for="item in filteredList"
                :key="item.id"
                @click="clickItem(item)">
              {{ item.name }}
            </li>
          </ul>
        </div>
      </div>

    </div>

  </div>
</template>

<script>

import axios from 'axios'
import MapContainer from "@/components/Map/MapContainer";


export default {
  name: "AppMap",
  components: {MapContainer},
  data() {
    return {
      list: [],
      clicked: null,
      clickedId: null,
      searchElem: '',
    }
  },
  async created() {
    const data = await axios.get('https://raw.githubusercontent.com/waliot/test-tasks/master/assets/data/frontend-1-dataset.json')
    this.list = data.data
    console.log(this.list)
  },
  computed: {
    // фильтруем массив list
    filteredList() {
      const word = this.searchElem.toLowerCase() //searchElem - строка для поиска через v-model
      return this.list.filter(elem => {
        return Object.values(elem).some(n => n.toString().toLowerCase().includes(word))
      })
    }
  },
  methods: {
    clickItem(item) {
      this.clicked = item
      this.clickedId = item.id // переменная в которой лежит ID эл-та списка по которому нажали,
                                // затем сравним с выводимым эл-ом и установим active класс
    },

  }
}
</script>

<style scoped>

.list-item {
  padding: 3px;
  cursor: pointer;
  transition: all 0.2s ease-out;
}
.list-item:hover {
  transition: all 0.2s ease-out;
  background: #f8aaaa;
}

.activelink {
  font-weight: bold;
  color: coral;
}

</style>
