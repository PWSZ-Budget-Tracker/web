<template>
	<div>
		<v-row>
			<ExpensesSection :currencies="currencies" :expenses="expenses" />
			<v-divider inset vertical class="mt-12"></v-divider>
			<v-col md="5">
				<CurrencyChips
					:currencies="currencies"
					:choosedCurrency="choosedCurrency"
					@choosedCurrency="choosedCurrency = $event"
				/>
				<BudgetSection
					:currencies="currencies"
					:choosedCurrency="choosedCurrency"
					:expenses="expenses"
					:incomes="incomes"
				/>
				<v-divider class="mb-10"></v-divider>
				<IncomesSection :currencies="currencies" :incomes="incomes" />
				<v-divider class="mb-10"></v-divider>
				<LinksSection />
			</v-col>
		</v-row>
	</div>
</template>

<script>
import ExpensesSection from "@/components/logged/ExpensesSection.vue";
import BudgetSection from "@/components/logged/BudgetSection.vue";
import IncomesSection from "@/components/logged/IncomesSection.vue";
import LinksSection from "@/components/logged/LinksSection.vue";
import CurrencyChips from "@/components/logged/CurrencyChips.vue";
import getIncomesSum from "@/helpers/incomesHelper";
import getExpensesSum from "@/helpers/expensesHelper";

export default {
	name: "Logged",
	data() {
		return {
			currencies: ["PLN", "USD", "EUR"],
			choosedCurrency: 0
		};
	},
	components: {
		ExpensesSection,
		BudgetSection,
		IncomesSection,
		LinksSection,
		CurrencyChips
	},
	created() {
		this.$store.dispatch("fetchIncomes");
		this.$store.dispatch("fetchExpenses");
	},
	beforeRouteEnter(to, from, next) {
		if (localStorage.getItem("token")) next();
		else next("/about");
	},
	methods: {
		getIncomesSum(currency) {
			return getIncomesSum(currency, this.incomes);
		},
		getExpensesSum(currency) {
			return getExpensesSum(currency, this.expenses);
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