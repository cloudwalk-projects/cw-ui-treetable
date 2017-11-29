import Vue from 'vue';
// import Vuex from 'vuex';

import TreeTable from '../src/index';

import App from './app';
// import router from './router';

// 载入样式
import './assets/css/main.css';

Vue.use(TreeTable);

var vm = new Vue({
  el: '#app',
  // router,
  template: '<App/>',
  components: { App }
});
