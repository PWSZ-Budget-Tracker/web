<template>
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
</template>

<script>
	import Chart from "@/components/Chart.vue";

	export default {
		props: ['currencies', 'expenses'],
		data() {
			return {

			};
		},
		components: {
			Chart
		},
		methods: {
			getExpensesSum(currency) {
				let result = 0;
				for (let i = 0; i < this.expenses.length; i++) {
					if (this.expenses[i].currency.shortName === currency) {
						result += this.expenses[i].amount;
					}
				}
				return result;
			}
		}
	};
</script>