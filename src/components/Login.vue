<template>
	<v-container>
		<v-row align="center" justify="center" class="mt-12">
			<div class="col-md-6 col-lg-5 col-xl-3 d-none d-md-block mr-10">
				<img alt="Vue logo" src="../assets/logo.png" />
			</div>
			<v-divider inset vertical></v-divider>
			<v-col md="5" justify="end">
				<v-card justify="center">
					<v-form v-model="valid">
						<v-row justify="center" align="center" lazy-validation>
							<div class="my-2">
								<h1>Budget Tracker</h1>
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
							<v-col sm="10" md="8" class="mt-n8">
								<v-text-field
									label="Hasło"
									type="password"
									v-model="password"
									:rules="[rules.required, rules.minLenght]"
									color="#9090ee"
									outlined
								></v-text-field>
								<v-alert
									type="error"
									:value="validationAlert"
									dark
									border="top"
									transition="scale-transition"
								>{{ validationAlert }}</v-alert>
							</v-col>
						</v-row>
						<v-row justify="center" align="center">
							<div class="my-2">
								<v-btn color="#3eb4a7" dark large @click="submitValidate">Zaloguj</v-btn>
							</div>
						</v-row>
						<v-divider></v-divider>
						<v-row justify="center" align="center">
							<div class="my-2">
								<p>
									Nie masz konta?
									<router-link to="/register">
										<v-btn text color="#3eb4a7">Zarejestruj się</v-btn>
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
/*eslint-disable*/
import rules from "@/components/validation/rules";
import axios from "@/axios";

export default {
	data() {
		return {
			password: "",
			email: "",
			validationAlert: false,
			valid: false,
			rules
		};
	},
	methods: {
		submitValidate(event) {
			if (!this.valid) {
				event.preventDefault();
				this.validationAlert = "Wprowadź lub popraw dane";
			} else {
				axios
					.post("/api/Authentication/Login", {
						email: this.email,
						password: this.password
					})
					.then(res => {})
					.catch(err => {});
			}
		}
	}
};
</script>
