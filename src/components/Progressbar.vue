<template>
	<div>
		<div class="loading-bar">
			<div class="percentage" :style="{'width' : percentage + '%'}"></div>
		</div>
	</div>
</template>

<script>
export default {
	props: ["sumOfIncomes", "left"],
	data: () => ({}),
	computed: {
		percentage() {
			return 100 - (this.left / this.sumOfIncomes) * 100;
		}
	},
	watch: {
		percentage() {
			if (this.percentage >= 80) {
				this.$store.commit("setNotifications", {
					message: "Twój budżet się kończy"
				});
			} else {
				this.$store.commit("setNotifications", null);
			}
			if (this.percentage >= 100) {
				this.$store.commit("setNotifications", {
					message: "Twój budżet się skończył"
				});
			}
		}
	},
	created() {
		if (this.percentage >= 80) {
			this.$store.commit("setNotifications", {
				message: "Twój budżet się kończy"
			});
		} else {
			this.$store.commit("setNotifications", null);
		}
		if (this.percentage >= 100) {
			this.$store.commit("setNotifications", {
				message: "Twój budżet się skończył"
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.loading-bar {
	position: relative;
	width: 400px;
	height: 30px;
	border-radius: 15px;
	overflow: hidden;
	border-bottom: 1px solid #ddd;
	box-shadow: inset 0 1px 2px rgba($color: #000, $alpha: 0.4), 0 -1px 1px #fff,
		0 1px 0 #fff;

	.percentage {
		position: absolute;
		top: 1px;
		left: 1px;
		right: 1px;
		display: block;
		height: 100%;
		border-radius: 15px;
		background-color: #9090ee;
		background-size: 30px 30px;
	}
}
</style>