/* eslint-disable */
import Vue from 'vue';
import axios from "axios";
import VueAxios from 'vue-axios';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';

import "chart.js";
import "hchs-vue-charts";

Vue.use(window.VueCharts);
Vue.use(VueAxios, axios);


Vue.config.productionTip = false;
Vue.axios.defaults.baseURL = "https://pwsz-budget-tracker.azurewebsites.net/";
Vue.axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    config.headers['Access-Control-Allow-Origin'] = '*';
    return config;
  },
  (error) => Promise.reject(error)
);

const ignoreWarnMessage = 'The .native modifier for v-on is only valid on components but it was used on <div>.';
Vue.config.warnHandler = (msg, vm, trace) => {
  if (msg === ignoreWarnMessage) {
    msg = null;
    vm = null;
    trace = null;
  }
};

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App)
}).$mount('#app');