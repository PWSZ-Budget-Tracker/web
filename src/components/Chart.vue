<template>
	<div>
		<chartjs-doughnut v-bind:datasets="datasets" v-bind:option="option" v-bind:labels="labels"></chartjs-doughnut>
	</div>
</template>


<script>
export default {
	data() {
		return {
			labels: [
				"transport",
				"zakupy",
				"prezenty",
				"siłownia",
				"studia",
				"jedzenie"
			],
			datasets: [
				{
					data: [20, 30, 50, 15, 2, 67],
					backgroundColor: [
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
	}
};
</script>