const state = {
	percentages: {
		percentagePLN: 0,
		percentageUSD: 0,
		percentageEUR: 0
	}
};

const getters = {
	// eslint-disable-next-line no-shadow
	getPercentages(state) {
		return state.percentages;
	}
};

const mutations = {
	// eslint-disable-next-line no-shadow
	setPercentages(state, percentages) {
		state.percentages = percentages;
	}
};


export default {
	state,
	getters,
	mutations
};