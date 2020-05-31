function getCurrency(choosedCurrency) {
	let currency = 0;
	switch (choosedCurrency) {
		case "PLN":
		currency = 0;
		break;
		case "USD":
		currency = 1;
		break;
		case "EUR":
		currency = 2;
		break;
		default:
	}
	return currency;
}

function dupa() {
	console.log('dupa');
}

export {
	getCurrency, dupa
};