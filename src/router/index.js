import Vue from 'vue';
import Router from 'vue-router';
import Map from '@/components/Map';
import Data from '@/components/Data';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Map',
      component: Map,
    },
    {
      path: '/data',
      name: 'Data',
      component: Data,
    },
  ],
});
