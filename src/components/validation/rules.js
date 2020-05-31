const rules = {
	required: (value) => !!value || "Wymagane",
	minLenght: (v) => v.length >= 8 || "Min 8 znaków",
	email: (value) => {
		const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return pattern.test(value) || "Niepoprawny email";
	},
	passwordRegister: (value) => {
		// const pattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
		const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})");
		return strongRegex.test(value) || "Hasło musi zawierać wielką literę i znak specjalny!";
	}
};

export default rules;