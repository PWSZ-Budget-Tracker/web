<template>
	<v-container>
		<v-row align="center" justify="center" class="mt-12">
			<div class="col-md-6 col-lg-5 col-xl-3 d-none d-md-block mr-10">
				<img alt="Vue logo" src="../assets/logo.png" />
			</div>
			<v-divider inset vertical></v-divider>
			<v-col md="5" justify="end">
				<v-card justify="center">
					<v-form acti>
						<v-row justify="center" align="center">
							<div class="my-2">
								<h1>Budget tracker</h1>
							</div>
						</v-row>
						<v-row justify="center" align="center">
							<v-col sm="10" md="8">
								<v-text-field label="Email" v-model="email" :color="emailColor" outlined></v-text-field>
							</v-col>
						</v-row>
						<v-row justify="center">
							<v-col sm="10" md="8" class="mt-n12">
								<v-text-field
									label="Hasło"
									type="password"
									v-model="password"
									:color="passwordColor"
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
								<v-btn type="submit" color="#3eb4a7" dark large @click="submitValidate">Zaloguj</v-btn>
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
export default {
	data() {
		return {
			password: "",
			email: "",
			validationAlert: false,
			valid: false
		};
	},
	computed: {
		emailColor() {
			const re = new RegExp("[^@]+@[^@]+\\.[^@]+");
			const color = !re.test(this.email.toLowerCase())
				? "red"
				: "#9090ee";
			return color;
		},
		passwordColor() {
			const color = this.password.length < 8 ? "red" : "#9090ee";
			return color;
		}
	},
	methods: {
		submitValidate(event) {
			const re = new RegExp("[^@]+@[^@]+\\.[^@]+");
			if (
				this.password.length < 8 ||
				!re.test(this.email.toLowerCase())
			) {
				event.preventDefault();
				this.validationAlert = "Wprowadź lub popraw dane";
			}
		}
	}
};
</script>
