<template>
	<v-app>
		<app-header :isLogged="isLogged"></app-header>

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
			isLogged: false
		};
	},
	created() {
		console.log(this.isLogged);
	},
	components: {
		appHeader: Header,
		appFooter: Footer
	},
	methods: {
		getResponse() {}
	}
};
</script>
