import getIncomesSum from "@/helpers/incomesHelper";
import getExpensesSum from "@/helpers/expensesHelper";

function getBudgetRest(currency, incomes, expenses) {
	return getIncomesSum(currency, incomes) - getExpensesSum(currency, expenses);
}

export default function getPercentages(incomes, expenses) {
	const percentages = {
		percentagePLN: 100 - (getBudgetRest('PLN', incomes, expenses) / getIncomesSum('PLN', incomes)) * 100,
		percentageUSD: 100 - (getBudgetRest('USD', incomes, expenses) / getIncomesSum('USD', incomes)) * 100,
		percentageEUR: 100 - (getBudgetRest('EUR', incomes, expenses) / getIncomesSum('EUR', incomes)) * 100
	};
	return percentages;
}
