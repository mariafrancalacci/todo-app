import Vue from 'vue';
import App from './App.vue';
import store from './store/modules/index';
import { Icon } from '@iconify/vue2';

Vue.component('Icon', Icon);


new Vue({
  store,
  render: h => h(App),
}).$mount('#app');
