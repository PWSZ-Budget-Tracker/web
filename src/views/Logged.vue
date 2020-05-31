<template>
	<div>
		<v-row>
			<v-col md="6">
				<h1 class="text-center mt-10">Wydatki</h1>
				<h2
					class="text-center teal--text text--accent-4 font-italic font-weight-light"
				>{{getSumOfExpenses()}} zł</h2>
				<v-divider class="mb-10 ml-10"></v-divider>
				<Chart></Chart>
			</v-col>
			<v-divider inset vertical class="mt-12"></v-divider>
			<v-col md="5">
				<v-row class="mr-5">
					<v-col md="6">
						<div class="ml-5 mt-9">
							<h3>budżet</h3>
							<Progressbar :left="left" :sumOfIncomes="getSumOfIncomes()"></Progressbar>
						</div>
					</v-col>
					<v-col md="6">
						<h3 class="text-right mt-8">pozostało</h3>
						<h4 class="text-right teal--text text--accent-4 font-italic font-weight-light">{{left}} zł</h4>
					</v-col>
				</v-row>
				<v-divider class="mb-10"></v-divider>
				<v-row>
					<v-col md="12">
						<div class="ml-5">
							<h1 class="mb-5">Przychody:</h1>
							<h6
								class="text-left"
								v-for="(income, i) in incomes"
								:key="i"
							>{{income.name}}: {{income.amount}}</h6>
							<h6 class="text-left teal--text text--accent-4">Suma: {{getSumOfIncomes()}}</h6>
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
		// this.$store.dispatch("setIncomeData");
		this.$store.dispatch("fetchExpenses");
	},
	beforeRouteEnter(to, from, next) {
		if (localStorage.getItem("token")) {
			next();
		}
	},
	methods: {
		getSumOfIncomes() {
			let sum = 0;
			for (let i = 0; i < this.incomes.length; i++) {
				sum += Number(this.incomes[i].amount);
			}
			return sum;
		},
		getSumOfExpenses() {
			let sum = 0;
			for (let i = 0; i < this.expenses.length; i++) {
				sum += Number(this.expenses[i].amount);
			}
			return sum;
		}
	},
	computed: {
		incomes() {
			return this.$store.getters.getIncomes;
		},
		expenses() {
			return this.$store.getters.getExpenses;
		},
		left() {
			return this.getSumOfIncomes() - this.getSumOfExpenses();
		}
	}
};
</script>