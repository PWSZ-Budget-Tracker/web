<template>
	<v-container>
		<v-row align="center" justify="center" class="mt-12">
			<v-col md="5">
				<v-card justify="center">
					<v-form v-model="valid">
						<v-row justify="center" align="center">
							<div class="my-2 text-center">
								<h1>Budget Tracker</h1>
								<h3 class="text-default">tworzenie konta</h3>
							</div>
						</v-row>
						<v-row justify="center" align="center">
							<v-col sm="10" md="8">
								<v-text-field
									label="Email"
									v-model="email"
									:rules="[rules.required, rules.email]"
									color="#9090ee"
									outlined
								></v-text-field>
							</v-col>
						</v-row>
						<v-row justify="center">
							<v-col sm="10" md="8" class="mt-n7">
								<v-text-field
									label="Hasło"
									type="password"
									v-model="password"
									:rules="[rules.required, rules.minLenght]"
									color="#9090ee"
									outlined
								></v-text-field>
							</v-col>
						</v-row>
						<v-row justify="center">
							<v-col sm="10" md="8" class="mt-n7">
								<v-text-field
									label="Powtórz hasło"
									type="password"
									v-model="repeatPassword"
									:rules="[rules.required, rules.minLenght, repeat.repeatPassword]"
									color="#9090ee"
									outlined
								></v-text-field>
								<v-alert
									:type="alertType"
									:value="showAlert"
									dark
									border="top"
									transition="scale-transition"
								>{{ validationAlert }}</v-alert>
							</v-col>
						</v-row>
						<v-row justify="center" align="center">
							<div class="my-2">
								<v-btn color="#3eb4a7" @click="submitValidate" dark large>Stwórz konto</v-btn>
							</div>
						</v-row>
						<v-divider></v-divider>
						<v-row justify="center" align="center">
							<div class="my-2">
								<p>
									Masz konto?
									<router-link to="/">
										<v-btn text color="#3eb4a7">Zaloguj się</v-btn>
									</router-link>
								</p>
							</div>
						</v-row>
					</v-form>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>


<script>
/* eslint-disable */
import rules from "@/components/validation/rules";
import axios from "axios";

export default {
	data() {
		return {
			password: "",
			repeatPassword: "",
			email: "",
			showAlert: false,
			validationAlert: "",
			valid: false,
			alertType: "error",
			rules,
			repeat: {
				repeatPassword: value =>
					value === this.password || "Hasło musi być takie same"
			}
		};
	},
	methods: {
		submitValidate(event) {
			if (!this.valid) {
				event.preventDefault();
				this.validationAlert = "Wprowadź lub popraw dane";
				this.alertType = "error";
				this.showAlert = true;
			} else {
				const credentials = {
					email: this.email,
					password: this.password,
					passwordConfirmation: this.repeatPassword
				};
				axios
					.post("/api/Authentication/Register", credentials)
					.then(response => {
						if (response.data.successful) {
							console.log(response);
							this.validationAlert =
								"utworzono konto, zaloguj się";
							this.alertType = "success";
							this.showAlert = true;
							this.email = "";
							this.password = "";
							this.repeatPassword = "";
						} else {
							this.validationAlert =
								"użytkownik o podanym mailu już istnieje";
							this.alertType = "error";
							this.showAlert = true;
						}
					})
					.catch(error => {});
			}
		}
	},
	beforeRouteEnter(to, from, next) {
		if (!localStorage.getItem("token")) {
			next();
		}
	}
};
</script>