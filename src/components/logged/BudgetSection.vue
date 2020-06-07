<template>
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
</template>

<script>
	import Progressbar from "@/components/Progressbar.vue";
	import getIncomesSum from "@/helpers/incomesHelper";
	import getExpensesSum from "@/helpers/expensesHelper";

	export default {
		props: ['currencies', 'choosedCurrency', 'incomes', 'expenses'],
		methods: {
			getBudgetRest(currency) {
				return getIncomesSum(currency, this.incomes) - getExpensesSum(currency, this.expenses);
			},
			getIncomesSum(currency) {
				return getIncomesSum(currency, this.incomes);
			}
		},
		components: {
			Progressbar
		}
	};
</script>