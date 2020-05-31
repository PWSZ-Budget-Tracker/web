import axios from 'axios';

const state = {

	incomeData: [],
	goalData: [],
	expensesData: []

};

const mutations = {


	// eslint-disable-next-line no-shadow
	setExpensesData(state, expensesData) {
		state.expensesData = expensesData;
	},
	// eslint-disable-next-line no-shadow
	setGoalData(state, goalData) {
		state.goalData = goalData;
	},
	// eslint-disable-next-line no-shadow
	setIncomeData(state, incomeData) {
		state.incomeData = incomeData;
	}
};

const actions = {
	addExpenses(
		context, expenses) {
		axios.post('/api/Expenses/Add', expenses);
	},
	setIncomeData({
		commit
	}) {
		const incomeData = [];
		commit('setIncomeData', incomeData);
	},
	setGoalData({
		commit
	}) {
		const goalData = [];
		commit('setGoalData', goalData);
	},
	setExpensesData({
		commit
	}) {
		const expensesData = [];
		commit('setExpensesData', expensesData);
	}
};

const getters = {
	// eslint-disable-next-line no-shadow
	getTableData: (state) => (path) => {
		let tableData = [];
		if (path === '/expenses') {
			tableData = state.expensesData;
		} else if (path === '/income') {
			tableData = state.incomeData;
		} else if (path === '/goal') {
			tableData = state.goalData;
		}
		return tableData;
	},
	// eslint-disable-next-line no-shadow
	getIncomes(state) {
		return state.incomeData;
	},
	// eslint-disable-next-line no-shadow
	getExpenses(state) {
		return state.expensesData;
	},
	// eslint-disable-next-line no-shadow
	getGoals(state) {
		return state.goalData;
	}
};

export default {
	state,
	mutations,
	actions,
	getters
};