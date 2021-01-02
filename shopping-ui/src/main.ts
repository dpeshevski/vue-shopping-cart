import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import PerfectScrollbar from 'vue2-perfect-scrollbar';
import './assets/style/tailwind.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(fas);

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;
Vue.use(PerfectScrollbar);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
