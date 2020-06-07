<template>
	<v-row class="justify-content-end">
		<v-chip :color="i == choosedCurrency ? 'rgb(62, 180, 167)' : false" class="mr-2 white--text" v-for="(currency, i) in currencies" :key="i" @click="choosedCurrency = i" >
			{{ currency }}
		</v-chip>
	</v-row>
</template>

<script>
	export default {
		props: ['currencies', 'choosedCurrency'],
		watch: {
			choosedCurrency() {
				this.$emit('choosedCurrency', this.choosedCurrency);
			}
		}
	};
</script>