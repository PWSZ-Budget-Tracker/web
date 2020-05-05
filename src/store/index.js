import Vue from 'vue';
import Vuex from 'vuex';
import tableData from '@/store/modules/table_data';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: null
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    }
  },
  getters: {
    getToken(state) {
      return state.token;
    }
  },
  actions: {
    setToken({
      commit
    }) {
      if (localStorage.getItem('token')) {
        commit('setToken', localStorage.getItem('token'));
      }
    }
  },
  modules: {

    tableData
  }
});