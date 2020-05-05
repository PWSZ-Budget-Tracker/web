<template>
	<div>
		<v-row>
			<v-col md="6">
				<h1 class="text-center mt-10">Wydatki</h1>
				<h2 class="text-center teal--text text--accent-4 font-italic font-weight-light">1 500 zł</h2>
				<v-divider class="mb-10 ml-10"></v-divider>
				<Chart></Chart>
			</v-col>
			<v-divider inset vertical class="mt-12"></v-divider>
			<v-col md="5">
				<v-row class="mr-5">
					<v-col md="6">
						<div class="ml-5 mt-9">
							<h3>budżet</h3>
							<Progressbar></Progressbar>
						</div>
					</v-col>
					<v-col md="6">
						<h3 class="text-right mt-8">pozostało</h3>
						<h4 class="text-right teal--text text--accent-4 font-italic font-weight-light">350 zł</h4>
					</v-col>
				</v-row>
				<v-divider class="mb-10"></v-divider>
				<v-row>
					<v-col md="12">
						<div class="ml-5">
							<h1>Przychody:</h1>
							<h6 class="mt-8 text-left">Praca: 1700</h6>
							<h6 class="text-left">Stypendium: 150</h6>
							<h6 class="text-left teal--text text--accent-4">Suma: 1850</h6>
						</div>
					</v-col>
				</v-row>
				<v-divider class="mb-10"></v-divider>
				<v-row>
					<v-col md="12" align="center" justify="center">
						<router-link to="/goal">
							<v-btn x-large color="#9090ee" dark class="ml-1 mb-2 pr-3 pl-3 pt-10 pb-12">
								<i class="fas fa-donate mr-2"></i>oszczędności
							</v-btn>
						</router-link>
						<router-link to="/income">
							<v-btn x-large color="#9090ee" dark class="ml-1 mb-2 pr-7 pl-7 pt-10 pb-12">
								<i class="far fa-credit-card mr-2"></i>przychody
							</v-btn>
						</router-link>
						<router-link to="/expenses">
							<v-btn x-large color="#9090ee" dark class="ml-1 mb-2 pr-10 pl-10 pt-10 pb-12">
								<i class="fas fa-hand-holding-usd mr-2"></i>wydatki
							</v-btn>
						</router-link>
						<router-link to="/calendar">
							<v-btn x-large color="#9090ee" dark class="ml-1 mb-2 pr-8 pl-7 pt-10 pb-12">
								<i class="far fa-calendar-alt mr-2"></i>
								kalendarz
							</v-btn>
						</router-link>
					</v-col>
				</v-row>
			</v-col>
		</v-row>
	</div>
</template>

<script>
import Chart from "@/components/Chart.vue";
import Progressbar from "@/components/Progressbar.vue";
import axios from "axios";

export default {
	name: "Logged",
	components: {
		Chart,
		Progressbar
	},
	created() {
		axios.post("/api/Income/GetAll", {});
	},
	beforeRouteEnter(to, from, next) {
		if (localStorage.getItem("token")) {
			next();
		}
	}
};
</script>