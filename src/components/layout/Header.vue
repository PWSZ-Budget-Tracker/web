<template>
	<div>
		<template>
			<div>
				<v-app-bar app color="#3eb4a7" dark>
					<img alt="Vue logo" src="../../assets/logo.png" width="100" />

					<v-toolbar-title @click="redirect" style="cursor: pointer">Budget Tracker</v-toolbar-title>

					<v-spacer></v-spacer>
					<v-menu :close-on-content-click="false" :nudge-width="200" offset-x>
						<template v-slot:activator="{ on }">
							<v-badge :content="messages" :value="messages" color="#9090ee" overlap>
								<v-btn v-on="on" icon>
									<v-icon>mdi-alarm</v-icon>
								</v-btn>
							</v-badge>
						</template>
						<v-card>powiadomienie</v-card>
					</v-menu>
					<v-menu left bottom>
						<template v-slot:activator="{ on }">
							<v-btn icon v-on="on">
								<v-icon>mdi-account-circle</v-icon>
							</v-btn>
						</template>

						<v-list>
							<v-list-item @click="() => {}">
								<v-list-item-title @click="signOut">wyloguj</v-list-item-title>
							</v-list-item>
						</v-list>
					</v-menu>
				</v-app-bar>
			</div>
		</template>
	</div>
</template>

<script>
export default {
	methods: {
		redirect() {
			if (this.$route.path !== "/main") {
				this.$router.push("/main");
			}
		},
		signOut() {
			localStorage.removeItem("token");
			this.$store.commit("setToken", null);
			this.$router.push("/login");
		}
	},
	data() {
		return {
			messages: 0
		};
	}
};
</script>
