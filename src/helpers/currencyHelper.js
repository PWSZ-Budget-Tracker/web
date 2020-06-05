export default function getCurrency(choosedCurrency) {
	let currency = 0;
	switch (choosedCurrency) {
		case "EUR":
		currency = 1;
		break;
		case "USD":
		currency = 2;
		break;
		case "PLN":
		currency = 3;
		break;
		default:
	}
	return currency;
}
