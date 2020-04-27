const state = {
	savingsData: null,
	incomeData: null,
	goalData: null,
	expensesData: null

};

const mutations = {
	// eslint-disable-next-line no-shadow
	setTableData(state, tableData) {
		state.tableData = tableData;
	},
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
	setSavingsData({
		commit
	}) {
		const savingsData = [];


		commit('setSavingsData', savingsData);
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
		const expensesData = [{
				name: "Transport",
				amount: 159
			},
			{
				name: "Jedzenie",
				amount: 237
			},
			{
				name: "Studia",
				amount: 262
			},
			{
				name: "Restauracja",
				amount: 305
			},
			{
				name: "Zakupy",
				amount: 356
			},
			{
				name: "Urodziny",
				amount: 375
			},
			{
				name: "Lekarstwa",
				amount: 392
			},
			{
				name: "Tesco",
				amount: 408
			},
			{
				name: "Wyjazd",
				amount: 452
			},
			{
				name: "Działka",
				amount: 518
			}
		];
		commit('setExpensesData', expensesData);
	}
};

const getters = {
	// eslint-disable-next-line no-shadow
	getTableData: (state) => (path) => {
		console.log(path);
		let tableData = [];
		if (path === '/expenses') {
			tableData = state.expensesData;
		} else if (path === '/income') {
			tableData = state.incomeData;
		} else if (path === '/goal') {
			tableData = state.goalData;
		}
		return tableData;
	}
};

export default {
	state,
	mutations,
	actions,
	getters
};