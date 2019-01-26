<template>
  <div>
    <div style="height: 100px; overflow: auto;">
      <h3>Simple map</h3>
      <p>First marker is placed at {{ withPopup.lat }}, {{ withPopup.lng }}</p>
      <p> Center is at {{ currentCenter }} and the zoom is: {{ currentZoom }} </p>
      <button @click="showLongText">Toggle long popup</button>
    </div>
    <l-map
      :zoom="zoom"
      :center="center"
      :options="mapOptions"
      style="height: 500px"
      @update:center="centerUpdate"
      @update:zoom="zoomUpdate"
    >
      <l-tile-layer
        :url="url"
        :attribution="attribution"
      />
      <l-marker :lat-lng="withPopup">
        <l-popup>
          <div @click="innerClick">
            I am a popup
            <p v-show="showParagraph">
              Lorem ipsum dolor sit amet
            </p>
          </div>
        </l-popup>
      </l-marker>
      <l-marker :lat-lng="withTooltip">
        <l-tooltip :options="{permanent: true, interactive: true}">
          <div @click="innerClick">
            I am a tooltip
            <p v-show="showParagraph">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
              sed pretium nisl, ut sagittis sapien. Sed vel sollicitudin nisi.
              Donec finibus semper metus id malesuada.
            </p>
          </div>
        </l-tooltip>
      </l-marker>
    </l-map>
  </div></template>

<script>
import L from 'leaflet';


export default {
  name: 'Example',
  data() {
    return {
      zoom: 13,
      center: L.latLng(47.413220, -1.219482),
      url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      withPopup: L.latLng(47.413220, -1.219482),
      withTooltip: L.latLng(47.414220, -1.250482),
      currentZoom: 11.5,
      currentCenter: L.latLng(47.413220, -1.219482),
      showParagraph: false,
      mapOptions: {
        zoomSnap: 0.5,
      },
    };
  },
  methods: {
    zoomUpdate(zoom) {
      this.currentZoom = zoom;
    },
    centerUpdate(center) {
      this.currentCenter = center;
    },
    showLongText() {
      this.showParagraph = !this.showParagraph;
    },
    innerClick() {
      alert('Click!');
    },
  },
}; </script>

<style>
@import 'http://cdn.leafletjs.com/leaflet-0.7.5/leaflet.css';
</style>
