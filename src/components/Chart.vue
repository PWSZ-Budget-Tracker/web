<template>
	<div>
		<chartjs-doughnut
			v-if="expenses.length != 0"
			v-bind:datasets="datasets"
			v-bind:option="option"
			v-bind:labels="labels"
		></chartjs-doughnut>
		<h1 class="text-center" v-else>Brak Wydatków</h1>
	</div>
</template>


<script>
export default {
	data() {
		return {
			labels: [],
			datasets: [
				{
					data: [],
					backgroundColor: [],
					colors: [
						"#3eb4a7",
						"#468982",
						"#457689",
						"#455598",
						"#7364CD",
						"#9090ee",
						"#BC88FB",
						"#8963B7",
						"#705196",
						"#964F82",
						"#B75B77",
						"#E07370"
					]
				}
			],
			option: {
				title: {
					display: false
				}
			}
		};
	},
	computed: {
		expenses() {
			return this.$store.getters.getExpenses;
		}
	},
	created() {
		let helper = 0;
		for (let i = 0; i < this.expenses.length; i++) {
			this.labels.push(
				`${this.expenses[i].categoryName} (${this.expenses[i].currency.shortName})`
			);
			this.datasets[0].data.push(this.expenses[i].amount);
			if (helper === 11) {
				this.datasets[0].backgroundColor.push(
					this.datasets[0].colors[0]
				);
				helper = 0;
			} else {
				this.datasets[0].backgroundColor.push(
					this.datasets[0].colors[helper]
				);
				helper++;
			}
		}
	}
};
</script>