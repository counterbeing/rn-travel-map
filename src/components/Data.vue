<template>
  <div>
    <div class="rn-container">
      <div class="rn-left">
        <div class="">
            <button @click='clearData'>Clear Data</button>
            <button @click='process'>Process</button>
            <button @click='save'>Save</button>
        </div>
        <hot-table ref='table' :settings="inputSettings"></hot-table>
      </div>
      <div class="rn-right">
        <table>
          <thead>
            <td>City</td>
            <td>State</td>
            <td>Lat</td>
            <td>Lng</td>
          </thead>
          <tr v-for="place in places" :key='place.city + place.state'>
              <td>{{place.city}}</td>
              <td>{{place.state}}</td>
              <td>{{place.lat}}</td>
              <td>{{place.lng}}</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { chain, isEqual } from 'lodash';
import { HotTable } from '@handsontable/vue';
import geocoder from '@/modules/geocoder';
import store from '../store';

export default {
  name: 'Data',
  components: { HotTable },
  data() {
    return {
      inputSettings: {
        colHeaders: true,
        rowHeaders: true,
      },
      places: [],
    };
  },
  methods: {
    clearData() { this.$refs.table.hotInstance.clear(); },
    async process() {
      const hot = this.$refs.table.hotInstance;
      // hot.alter('insert_col', 10, 2);
      let places = chain(hot.getData())
        .map(row => ({ city: row[3], state: row[4] }))
        .filter(row => row.city !== '')
        .uniqWith(isEqual)
        .value();
      places = await places.map(async (place) => {
        const coordinates = await geocoder(place.city, place.state);
        return { ...place, ...coordinates };
      });
      this.places = await Promise.all(places);
    },
    save() {
      const hot = this.$refs.table.hotInstance;
      store.setPlaces(this.places);
      store.setPositions(hot.getData());
      this.$router.push({ name: 'Map' });
    },
  },
}; </script>

<style>
@import "handsontable/dist/handsontable.full.css";

.rn-container {
    height: 100%;
}

.rn-right {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 50%;
}

.rn-left {
  text-align: center;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 50%;
  overflow: hidden;
}

</style>
