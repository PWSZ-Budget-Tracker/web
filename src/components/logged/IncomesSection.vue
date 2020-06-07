<template>
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
</template>

<script>
	import getIncomesSum from "@/helpers/incomesHelper";

	export default {
		props: ['incomes', 'currencies'],
		methods: {
			getIncomesSum(currency) {
				return getIncomesSum(currency, this.incomes);
			}
		}
	};
</script>