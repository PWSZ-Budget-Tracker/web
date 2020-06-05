import axios from 'axios';
import router from '@/router';

const state = {
	categories: null
};

const getters = {
	// eslint-disable-next-line no-shadow
	getCategories(state) {
		return state.categories;
	}
};

const mutations = {
	// eslint-disable-next-line no-shadow
	setCategories(state, categories) {
		state.categories = categories;
	}
};

const actions = {
	// eslint-disable-next-line no-unused-vars
	fetchCategories({
		commit
	}) {
		const type = router.history.current.path === '/expenses' ? 0 : 1;
		axios.get(`/api/Category/GetAll?type=${type}`).then((response) => {
			commit('setCategories', response.data.payload);
		});
	}
};

export default {
	state,
	getters,
	mutations,
	actions
};