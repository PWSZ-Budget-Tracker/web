export default function getExpensesSum(currency, expenses) {
	let sum = 0;
	for (let i = 0; i < expenses.length; i++) {
		if (expenses[i].currency.shortName === currency) {
			sum += expenses[i].amount;
		}
	}
	return sum;
}