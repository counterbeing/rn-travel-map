<template>
  <div id="inspector">
    <h1>{{positions[0].city}}, {{positions[0].state}}</h1>
    <div v-for="(position, index) in positions" :key="index">

    <h2>{{position.hospital}}</h2>
    <ul>
      <li>{{position.job}}</li>
      <li>{{position.shift}}</li>
    </ul>
    </div>

    <router-link to="data">Data</router-link>
  </div>
</template>
<script>
export default {
  name: 'Inspector',
  props: ['positions'],
  data: () => ({

  }),
};
</script>

<style scoped>

#inspector {
  padding: 40px;
  z-index: 1000;
  position: fixed;
  right: 0;
  top: 100px;
  bottom: 100px;
  width: 400px;
  border-radius: 10px;
  background-color: rgba(255,255,255, 0.7);
  overflow: scroll;
}
ul {
  list-style: none;
  font-size: 1.5rem;
}
</style>
