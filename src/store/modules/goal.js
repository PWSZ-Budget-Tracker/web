import axios from 'axios';

const state = {
	goal: null
};

const mutations = {
	// eslint-disable-next-line no-shadow
	setGoal(state, goal) {
		state.goal = goal;
	}
};

const actions = {
	fetchGoal({
		// eslint-disable-next-line no-unused-vars
		commit
	}) {
		axios.get(`/api/Goal/GetAll?date=${new Date().toISOString()}`).then((response) => {
			commit('setGoal', response.data.payload);
		});
	}
};

const getters = {
	// eslint-disable-next-line no-shadow
	getGoal(state) {
		return state.goal;
	}
};

export default {
	state,
	getters,
	mutations,
	actions
};