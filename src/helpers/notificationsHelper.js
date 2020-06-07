function setNotificationsToNull(currency, notifications) {
	if (currency === 'PLN') notifications.budgetPLN = null;
	else if (currency === 'USD') notifications.budgetUSD = null;
	else notifications.budgetEUR = null;
	return notifications;
}

function setFinalNotifications(currency, notifications) {
	if (currency === 'PLN') notifications.budgetPLN = 'Twój budżet (PLN) się skończył!';
	else if (currency === 'USD') notifications.budgetUSD = 'Twój budżet (USD) się skończył!';
	else notifications.budgetEUR = 'Twój budżet (EUR) się skończył!';
	return notifications;
}

function setAlertNotifications(currency, notifications) {
	if (currency === 'PLN') notifications.budgetPLN = 'Twój budżet (PLN) się kończy!';
	else if (currency === 'USD') notifications.budgetUSD = 'Twój budżet (USD) się kończy!';
	else notifications.budgetEUR = 'Twój budżet (EUR) się kończy!';
	return notifications;
}

export default function setNotifications(percentage, currency, notifications) {
	if (percentage >= 80) notifications = setAlertNotifications(currency, notifications);
	else notifications = setNotificationsToNull(currency, notifications);
	if (percentage >= 100) notifications = setFinalNotifications(currency, notifications);
	return notifications;
}
