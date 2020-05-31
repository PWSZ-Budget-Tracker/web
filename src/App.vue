<template>
	<v-app>
		<app-header v-if="token != null" :isLogged="isLogged"></app-header>

		<v-content>
			<router-view></router-view>
		</v-content>
		<appFooter></appFooter>
	</v-app>
</template>

<script>
import Header from "./components/layout/Header.vue";
import Footer from "./components/layout/Footer.vue";

export default {
	name: "App",
	data() {
		return {
			isLogged: localStorage.getItem("token"),
			visible: false
		};
	},
	created() {
		if (this.isLogged) {
			this.visible = true;
		}
		this.$store.dispatch("setToken");
	},
	components: {
		appHeader: Header,
		appFooter: Footer
	},
	methods: {
		getResponse() {}
	},
	computed: {
		token() {
			return this.$store.getters.getToken;
		}
	}
};
</script>
