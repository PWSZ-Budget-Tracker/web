import axios from 'axios';

const state = {
	expenses: []
};

const mutations = {
	// eslint-disable-next-line no-shadow
	setExpenses(state, expenses) {
		state.expenses = expenses;
	}
};

const actions = {
	fetchExpenses({
		// eslint-disable-next-line no-unused-vars
		commit
	}) {
		axios.get(`/api/Expenses/GetAll?date=${new Date().toISOString()}`).then((response) => {
			commit('setExpenses', response.data.payload);
		});
	},
	addExpenses(
		context, expenses) {
		axios.post('/api/Expenses/Add', expenses);
	}
};

const getters = {
	// eslint-disable-next-line no-shadow
	getExpenses(state) {
		return state.expenses;
	}
};

export default {
	state,
	getters,
	mutations,
	actions
};