export default function getIncomesSum(currency, incomes) {
	let sum = 0;
	for (let i = 0; i < incomes.length; i++) {
		if (incomes[i].currency.shortName === currency) {
			sum += incomes[i].amount;
		}
	}
	return sum;
}