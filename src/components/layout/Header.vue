<template>
	<div>
		<template>
			<div>
				<v-app-bar app color="#3eb4a7" dark>
					<img alt="Vue logo" src="../../assets/logo.png" width="100" />

					<v-toolbar-title @click="redirect" style="cursor: pointer">Budget Tracker</v-toolbar-title>

					<v-spacer></v-spacer>
					<v-menu :close-on-content-click="false" :nudge-width="200" offset-y>
						<template v-slot:activator="{ on }">
							<v-badge :content="messages" :value="messages" color="#9090ee" overlap>
								<v-btn v-on="on" icon>
									<v-icon>mdi-alarm</v-icon>
								</v-btn>
							</v-badge>
						</template>
						<v-card class v-if="getNotifications.budgetPLN != null">
							<v-alert class="notification" type="warning">{{getNotifications.budgetPLN}}</v-alert>
						</v-card>
						<v-card v-if="getNotifications.budgetEUR != null">
							<v-alert class="notification" type="warning">{{getNotifications.budgetEUR}}</v-alert>
						</v-card>
						<v-card v-if="getNotifications.budgetUSD != null">
							<v-alert class="notification" type="warning">{{getNotifications.budgetUSD}}</v-alert>
						</v-card>
					</v-menu>
					<v-menu left bottom offset-y>
						<template v-slot:activator="{ on }">
							<v-btn icon v-on="on">
								<v-icon>mdi-account-circle</v-icon>
							</v-btn>
						</template>
						<v-card>
							<v-list>
								<v-list-item>
									<v-list-item-avatar>
										<img class="avatar" src="../../assets/logo.png" alt="logo" />
									</v-list-item-avatar>

									<v-list-item-content>
										<v-list-item-title>Bugdet Tracker</v-list-item-title>
										<v-list-item-subtitle>Sukces ekonomii</v-list-item-subtitle>
									</v-list-item-content>

									<v-list-item-action>
										<v-btn :class="fav ? 'red--text' : ''" icon @click="fav = !fav" color="red">
											<v-icon>mdi-heart</v-icon>
										</v-btn>
									</v-list-item-action>
								</v-list-item>
							</v-list>

							<v-divider class="ma-0"></v-divider>

							<v-card-actions>
								<v-list class="w-100">
									<v-list-item @click="() => {}">
										<v-list-item-title @click="signOut">wyloguj</v-list-item-title>
									</v-list-item>
								</v-list>
							</v-card-actions>
						</v-card>
					</v-menu>
				</v-app-bar>
			</div>
		</template>
	</div>
</template>

<script>
/* eslint-disable */
export default {
	data() {
		return {};
	},
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
	computed: {
		getNotifications() {
			return this.$store.getters.getNotifications;
		},

		messages() {
			let messages = 0;
			for (const key in this.getNotifications) {
				if (this.getNotifications[key] != null) {
					messages++;
				}
			}
			return messages;
		}
	}
};
</script>

<style>
.notification {
	margin: 0 !important;
}
.avatar {
	height: auto !important;
	width: 200% !important;
}
</style>
