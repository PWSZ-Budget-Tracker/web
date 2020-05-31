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
		console.log(new Date());
		axios.post('/api/Expenses/GetAll', {
			date: new Date()
			// eslint-disable-next-line arrow-parens
		}).then(response => {
			console.log(response);
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