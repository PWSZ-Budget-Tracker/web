<template>
	<div class="about">
		<v-container>
			<v-row justify="center" class="mt-5">
				<Logo class="mb-3" />
				<div class>
					<p
						class="text-center mx-auto"
						style="width: 50%;"
					>Aplikacja ma na celu stworzenie miejsca, w którym użytkownik będzie mógł prowadzić swój własny wyciąg wydatków i przychodów. Dzięki tej aplikacji, pod koniec miesiąca będzie można ustalić, gdzie podziała się cała wypłata oraz czy wydajemy na dany cel tyle, ile faktycznie chcieliśmy wydać. Dodatkowo wyświetlane będzie ogólne podsumowanie</p>
				</div>
				<div class="button-wrapper">
					<div class="d-flex justify-content-center flex-column">
						<v-btn color="#3eb4a7" dark large tag="router-link" to="/register">stwórz konto</v-btn>
						<div class="d-flex">
							<v-btn text color="#3eb4a7" tag="router-link" to="/login">Masz konto? Zaloguj się</v-btn>
						</div>
					</div>
				</div>
			</v-row>
		</v-container>
	</div>
</template>

<script>
import Logo from "@/components/Logo.vue";

export default {
	components: {
		Logo
	}
};
</script>

<style >
.button-wrapper {
	padding: 30px;
	border-top: 1px solid black;
	margin-top: 30px;
	padding-top: 50px;
}
</style>