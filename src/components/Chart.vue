<template>
	<div>
		<chartjs-doughnut v-bind:datasets="datasets" v-bind:option="option" v-bind:labels="labels"></chartjs-doughnut>
		<ImgSmile v-if="datasets[0].data.length == 0" />
	</div>
</template>


<script>
import ImgSmile from "@/components/ImgSmile.vue";

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
	components: {
		ImgSmile
	},
	computed: {
		expenses() {
			return this.$store.getters.getExpenses;
		}
	},
	created() {
		let helper = 0;
		for (let i = 0; i < this.expenses.length; i++) {
			this.labels.push(this.expenses[i].name);
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