<template>
  <div class="d-flex justify-content-center pt-3">
    <button class="btn btn-primary mx-1"
      @click="showAllListItems"
    >Все</button>
    <button class="btn btn-primary mx-1"
      @click="showOnlyActive"
    >Активные</button>
    <button class="btn btn-primary mx-1"
            @click="showOnlyDeActive"
    >Не активные</button>

  </div>
</template>

<script>
export default {
  name: "FilterComponent",
  emits: ['showAllListItems', 'showOnlyActive', 'showOnlyDeActive'],
  methods: {
    showAllListItems() {
      this.$emit('showAll')
    },
    showOnlyActive() {
      this.$emit('showActive')
    },
    showOnlyDeActive() {
      this.$emit('showDeActive')
    }
  }
}
</script>

<style scoped>

</style>
