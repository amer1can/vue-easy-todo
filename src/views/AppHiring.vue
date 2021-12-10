<template>
  <div class="items-wrap container">
    <div class="search-in-wrap">
      <input class="search-in" type="text" placeholder="Search..." v-model="searchVal">
    </div>
    <div class="items"
         v-for="item in filteredList"
         :key="item.id">
      <div class="item d-flex align-items-center my-3 text-white">
        <img class="mx-2" :src="`https://dapplets-hiring-api.herokuapp.com/api/v1/files/${item.icon}`" alt="" width="30" height="30">
        <h6 class="align-self-center">{{ item.title }}</h6>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "AppHiring",
  data() {
    return {
      dataList: [],
      searchVal: '',
    }
  },
  async created() {
    const response = await axios.get('https://dapplets-hiring-api.herokuapp.com/api/v1/dapplets?limit=20&start=0')
    const data = await response.data

    this.dataList = data.data
    console.log(this.dataList)
  },
  computed: {
    filteredList() {
      const searchElem = this.searchVal.toLowerCase()
      return this.dataList.filter(elem => {
        return Object.values(elem.title).some(name => name.toString().toLowerCase().includes(searchElem))
      })
    }
  },
  methods: {
  }
}
</script>

<style scoped>
.items-wrap {
  border: 1px solid #e53c69;
  border-radius: 12px;
  padding: 10px;
}
.item {
  padding: 5px;
  border: 1px solid #abefab;
  border-radius: 7px;
}
.search-in-wrap {
  margin: 0 auto;
  max-width: 400px;
}

.search-in {
  width: 100%;
}
</style>
