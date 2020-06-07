<template>
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
</template>
