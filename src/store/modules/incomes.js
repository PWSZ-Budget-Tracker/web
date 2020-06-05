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
		axios.get(`/api/Income/GetAll?date=${new Date().toISOString()}`).then((response) => {
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