import axios from 'axios';

const state = {
	incomes: []
};

const mutations = {
	// eslint-disable-next-line no-shadow
	setIncomes(state, incomes) {
		state.incomes = incomes;
	}
};

const actions = {
	fetchIncomes({
		// eslint-disable-next-line no-unused-vars
		commit
	}) {
		console.log(new Date());
		axios.post('/api/Incomes/GetAll', {
			date: new Date()
			// eslint-disable-next-line arrow-parens
		}).then(response => {
			console.log(response);
			commit('setIncomes', response.data.payload);
		});
	}
};

const getters = {
	// eslint-disable-next-line no-shadow
	getIncomes(state) {
		return state.incomes;
	}
};

export default {
	state,
	getters,
	mutations,
	actions
};