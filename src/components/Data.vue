<template>
  <div>
    <div class="">
        <button @click='clearData'>Clear Data</button>
    </div>
    <hot-table ref='table' :settings="settings"></hot-table>
  </div>
</template>

<script>
import { HotTable } from '@handsontable/vue';

const defaultData = [
  ['', '', '', '', ''],
  ['', '', '', '', ''],
];

export default {
  name: 'Data',
  components: { HotTable },
  data() {
    return {
      settings: {
        startRows: 5,
        colHeaders: true,
        rowHeaders: true,
      },
    };
  },
  methods: {
    clearData() { this.$refs.table.hotInstance.clear(); },
    // save() {}
  },
}; </script>

<style>
@import "handsontable/dist/handsontable.full.css"
</style>
