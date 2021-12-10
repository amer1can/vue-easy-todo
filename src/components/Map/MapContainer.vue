<template>
  <div id="map"></div>
</template>

<script>

import 'leaflet/dist/leaflet.css'
import L from 'leaflet/dist/leaflet.js'

export default {
  name: "MapContainer",
  props: ['items', 'clicked'],
  data() {
    return {
      coords: [46.505, -0.09],
      map: null,
      zoom: 5,
      tileLayer: null,
      token: 'pk.eyJ1IjoiYW1lcjFjYW4iLCJhIjoiY2t3dzNneWhqMjZjdjJ3cW9sZDVrMTg1YyJ9.jcRXUvtMA8HbHMWXwmuCSA',
      marker: null,
      marker2: null,
      circle: null,
      useIcon: null,
      selectIcon: null,
      showedList: [],
      transformList: []
    }
  },
  created() {

  },
  mounted() {
    this.initMap()

    this.useIcon = L.icon({
      iconUrl: 'img/marker.min.svg',
      iconSize: [25, 41],
      iconAnchor: [26, 42],
      popupAnchor: [-3, -76],
      shadowUrl: 'img/shadow.svg',
      shadowSize: [28, 44],
      shadowAnchor: [26, 42],
    })

    this.selectIcon = L.icon({
      iconUrl: 'img/pin.svg',
    })

  },
  updated() {
    this.addPinsToMap()
  },
  watch: {
    clicked(item) {
      this.setMap(item)
    },
  },
  methods: {
    initMap() {
      this.map = L.map('map').setView(this.coords, this.zoom)
      this.tileLayer = L.tileLayer(
         ` https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${this.token}`,
          {
            attribution: 'Map data',
            maxZoom: 18,
            id: 'mapbox/streets-v11', // "mapbox/satellite-v9",
            accessToken: this.token,
          }
      ).addTo(this.map)

    },
    addPinsToMap() {
      if (this.showedList.length === 0) {
        for (let i=0; i < this.items.length; i++) {
          this.showedList[i] = new L.marker([this.items[i].latitude, this.items[i].longitude], {
            icon: this.useIcon,
          }).addTo(this.map).setOpacity(1)
        }
      }
    },
    setMap(item) {
      this.map.setView([item.latitude, item.longitude], 10)

      // const pIndex = item.id
      // const newItem = this.showedList[pIndex - 1].setIcon(this.selectIcon)
      // this.showedList.splice(pIndex - 1, 1)
      // this.showedList = this.showedList.insert(pIndex - 1, newItem)

    }
  }
}
</script>

<style scoped>

  #map {
    width: 100%;
    height: 650px;
  }



</style>
