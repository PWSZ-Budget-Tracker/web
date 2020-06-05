<template>
	<div>
		<v-row>
			<v-col md="6">
				<h1 class="text-center mt-10 mb-3">Wydatki</h1>
				<v-row class="justify-content-center">
					<div class="flex-row d-flex">
						<h4 class="text-center teal--text text--accent-4 mx-5 py-4 font-italic font-weight-light"
						>{{getExpensesSum(currencies[0])}} {{ currencies[0] }}</h4>
					</div>
					<v-divider class="mt-0 mb-2" vertical inset></v-divider>
					<div class="flex-row d-flex">
						<h4 class="text-center teal--text text--accent-4 mx-5 py-4 font-italic font-weight-light"
						>{{getExpensesSum(currencies[1])}} {{ currencies[1] }}</h4>
					</div>
					<v-divider class="mt-0 mb-2" vertical inset></v-divider>
					<div class="flex-row d-flex">
						<h4 class="text-center teal--text text--accent-4 mx-5 py-4 font-italic font-weight-light"
						>{{getExpensesSum(currencies[2])}} {{ currencies[2] }}</h4>
					</div>
				</v-row>
				<v-divider class="mb-10 ml-10 mt-0"></v-divider>
				<Chart></Chart>
			</v-col>
			<v-divider inset vertical class="mt-12"></v-divider>
			<v-col md="5">
				<v-row class="justify-content-end">
					<v-chip :color="i == choosedCurrency ? 'rgb(62, 180, 167)' : false" class="mr-2 white--text" v-for="(currency, i) in currencies" :key="i" @click="choosedCurrency = i" >
						{{ currency }}
					</v-chip>
				</v-row>
				<v-row class="">

					<v-col md="6">
						<div class="ml-5">
							<h3>budżet {{ currencies[choosedCurrency] }}</h3>
							<Progressbar :budgetRest="getBudgetRest(currencies[choosedCurrency])" :currency="currencies[choosedCurrency]" :sum="getIncomesSum(currencies[choosedCurrency])"></Progressbar>
						</div>
					</v-col>
					<v-col md="6">
						<h3 class="text-right">pozostało</h3>
						<h4 class="text-right teal--text text--accent-4 font-italic font-weight-light">{{getBudgetRest(currencies[choosedCurrency]) }} {{ currencies[choosedCurrency] }}</h4>
					</v-col>
				</v-row>
				<v-divider class="mb-10"></v-divider>
				<v-row>
					<v-col md="12">
						<div class="ml-5">
							<h1 class="mb-5">Przychody:</h1>
							<v-row class="">
								<v-col v-for="(currency,index) in currencies" :key="index" cols="4" sm="12" md="4">
									<h5>{{ currency }}</h5>
									<div class="align-end">
										<div v-for="(income, i) in incomes"
										:key="i">
										<h6
										class="text-left"
										v-if="income.currency.shortName === currency"
										>{{ income.categoryName }}: {{income.amount}} {{income.currency.shortName}}</h6>
									</div>

								</div>
							</v-col>
						</v-row>
						<v-row class="">
							<v-col cols="4" v-for="(currency, i) in currencies" :key="i">
								<h6 class="text-left teal--text text--accent-4">Suma: {{getIncomesSum(currency)}} {{ currency }}</h6>
							</v-col>
						</v-row>
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

	export default {
		name: "Logged",
		data() {
			return {
				currencies: ['PLN', 'USD', 'EUR'],
				choosedCurrency: 0

			};
		},
		components: {
			Chart,
			Progressbar
		},
		created() {
			this.$store.dispatch("fetchIncomes");
			this.$store.dispatch("fetchExpenses");
		},
		beforeRouteEnter(to, from, next) {
			if (localStorage.getItem("token")) {
				next();
			}
		},
		methods: {
			getIncomesSum(currency) {
				let result = 0;
				for (let i = 0; i < this.incomes.length; i++) {
					if (this.incomes[i].currency.shortName === currency) {
						result += this.incomes[i].amount;
					}
				}
				return result;
			},
			getExpensesSum(currency) {
				let result = 0;
				for (let i = 0; i < this.expenses.length; i++) {
					if (this.expenses[i].currency.shortName === currency) {
						result += this.expenses[i].amount;
					}
				}
				return result;
			},
			getBudgetRest(currency) {
				return this.getIncomesSum(currency) - this.getExpensesSum(currency);
			}
		},
		computed: {
			incomes() {
				return this.$store.getters.getIncomes;
			},
			expenses() {
				return this.$store.getters.getExpenses;
			}
		}
	};
</script>