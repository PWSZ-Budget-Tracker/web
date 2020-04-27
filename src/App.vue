<template>
	<v-app>
		<app-header v-if="visible" :isLogged="isLogged"></app-header>

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
			isLogged: true,
			visible: true
		};
	},
	created() {
		console.log(this.isLogged);
		if (this.$route.path === "/" || this.$route.path === "/register") {
			this.visible = false;
		}
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
