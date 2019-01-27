<template>
  <div class='map-container'>
    <l-map
      :zoom="zoom"
      :center="center"
      :options="mapOptions"
      @update:center="centerUpdate"
      @update:zoom="zoomUpdate"
    >
      <l-tile-layer :url="url" :attribution="attribution"/>
      <l-marker v-for='(place, index) in places'
        @click='updateInspector(index)'
        :lat-lng="place.latlng"
        :key='index'>
      </l-marker>
    </l-map>
    <inspector v-if='placeIndex' :positions='positions'/>
  </div></template>

<script>
import Inspector from '@/components/Inspector';
import L from 'leaflet';
import store from '../store';


export default {
  name: 'Map',
  components: { Inspector },
  data() {
    return {
      placeIndex: null,
      zoom: 3,
      center: L.latLng(35.57369428380629, -97.82369995593741),
      url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      showParagraph: false,
      mapOptions: {
        zoomSnap: 0.5,
      },
    };
  },
  computed: {
    places() {
      return store.state.places.map(place => ({
        city: place.city,
        state: place.state,
        latlng: L.latLng(place.lat, place.lng),
      }));
    },
    positions() {
      return store.state.positions.filter(position => position.placeIndex === this.placeIndex);
    },
  },
  methods: {
    updateInspector(placeIndex) {
      this.placeIndex = placeIndex;
    },
    zoomUpdate(zoom) {
      this.currentZoom = zoom;
    },
    centerUpdate(center) {
      this.currentCenter = center;
    },
  },
}; </script>

<style>
@import 'https://unpkg.com/leaflet@1.4.0/dist/leaflet.css';
.map-container {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
.leaflet-container {
  width: 100%;
  height: 100%;
}
</style>
