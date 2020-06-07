import Vue from 'vue';
import Vuex from 'vuex';
import categories from '@/store/modules/categories';
import expenses from '@/store/modules/expenses';
import incomes from '@/store/modules/incomes';
import goal from '@/store/modules/goal';
import budgetPercentage from '@/store/modules/budgetPercentage';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: null,
    notifications: {
      budgetPLN: null,
      budgetUSD: null,
      budgetEUR: null
    }
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
    setNotifications(state, notifications) {
      state.notifications = notifications;
    }
  },
  getters: {
    getToken(state) {
      return state.token;
    },
    getNotifications(state) {
      return state.notifications;
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

    categories,
    expenses,
    incomes,
    goal,
    budgetPercentage
  }
});