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
		console.log(new Date());
		axios.post('/api/Goal/GetAll', {
			date: new Date()
			// eslint-disable-next-line arrow-parens
		}).then(response => {
			console.log(response);
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