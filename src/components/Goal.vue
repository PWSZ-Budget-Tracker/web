<template>
	<div>
		<v-toolbar flat color="grey lighten-3">
			<v-toolbar-title style="overflow: unset!important">{{ title }}</v-toolbar-title>
			<v-divider class="mx-4" inset vertical ></v-divider>
			<v-spacer></v-spacer>
			<v-dialog :retain-focus="false" v-model="dialog" max-width="500px">
				<template v-slot:activator="{ on }">
					<div class="w-100 d-flex justify-content-end">
						<v-btn color="#9090ee" right dark class="mb-2" v-on="on">dodaj</v-btn>
					</div>
				</template>
				<v-card>
					<v-card-title>
						<span class="headline">{{ formTitle }}</span>
					</v-card-title>

					<v-card-text>
						<v-row justify="center">
							<v-col cols="12" sm="4" md="4">
								<v-text-field color="#9090ee" type="text" v-model="editedItem.name" label="Nazwa"></v-text-field>
							</v-col>
							<v-col cols="12" sm="4" md="4">
								<v-text-field color="#9090ee" type="number" v-model="editedItem.goalAmount" label="kwota"></v-text-field>
							</v-col>
							<v-col cols="12" sm="4" md="4">
								<v-select v-model="choosedCurrency" :items="currencies" label="Waluta"></v-select>
							</v-col>
						</v-row>
					</v-card-text>

					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn color="#3eb4a7" text @click="close">anuluj</v-btn>
						<v-btn color="#3eb4a7" text @click="save">zapisz</v-btn>
					</v-card-actions>
				</v-card>
			</v-dialog>
		</v-toolbar>
		<v-data-table
		:headers="headers"
		:items="dataTable"
		sort-by="goalAmount"
		class="elevation-1"
		:footer-props="{itemsPerPageText : 'strona' }"
		>
		<template v-slot:item.currency="{ item }">
			{{ currencies[item.currencyId] }}
		</template>
		<template v-slot:item.actions="{ item }">
			<v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
			<v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
			<div>
				<v-dialog :retain-focus="false" v-model="editDialog" max-width="500px">
					<template v-slot:activator="{ on }">
						<v-btn @click="pay(item)" v-on="on">Wpłać</v-btn>
						<v-btn @click="pay(item); deleteAmount = true" v-on="on">Wypłać</v-btn>
					</template>
					<v-card>
						<v-card-title>
							<span class="headline">Wpłać</span>
						</v-card-title>

						<v-card-text>
							<v-row justify="center">
								<v-col cols="12" sm="6" md="4">
									<v-text-field color="#9090ee" type="number" v-model="editedItem.amount" label="kwota"></v-text-field>
								</v-col>
								<v-col cols="12" sm="6" md="4">
									<v-select v-model="choosedCurrency" disabled :items="currencies" label="Waluta"></v-select>
								</v-col>
							</v-row>
						</v-card-text>

						<v-card-actions>
							<v-spacer></v-spacer>
							<v-btn color="#3eb4a7" text @click="close">anuluj</v-btn>
							<v-btn color="#3eb4a7" text @click="paySubmit">zapisz</v-btn>
						</v-card-actions>
					</v-card>
				</v-dialog>
				<v-progress-linear
				:active="true"
				:background-opacity="0.2"
				:buffer-value="100"
				:height="16"
				:rounded="true"
				:value="(item.amount/item.goalAmount)*100"
				color="light-blue"
				></v-progress-linear>
			</div>
		</template>
	</v-data-table>
</div>
</template>

<script>
	import * as Currency from '@/helpers/currencyHelper';
	import axios from "axios";

	export default {
		data: () => ({
			dataTable: [{
 goalAmount: 123, currencyId: 0, name: "Cel", goalId: 1, amount: 0
}],
			title: "Cele",
			dialog: false,
			choosedCurrency: "",
			deleteAmount: false,
			editDialog: false,
			editedIndex: -1,
			editedItem: {
				name: "",
				goalAmount: 0,
				currencyId: 0,
				goalId: 0
			},
			defaultItem: {
				name: "",
				goalAmount: 0,
				currencyId: 0,
				goalId: 0
			},
			currencies: ["PLN", "USD", "EUR"],
			headers: [
			{ text: "Nazwa", value: "name" },
			{ text: "Kwota", value: "goalAmount" },
			{ text: "Waluta", value: "currency" },
			{ text: "Akcja", value: "actions", sortable: false }
			]
		}),
		watch: {
			dialog(val) {
			// eslint-disable-next-line no-unused-expressions
			val || this.close();
		}
	},
	computed: {
		formTitle() {
			return this.editedIndex === -1 ? "Dodawanie" : "Edytowanie";
		}
			// dataTable() {
			// 	return this.$route.path === '/expenses' ? this.$store.getters.getExpenses : this.$store.getters.getIncomes;
		},
		created() {
			this.$store.dispatch('fetchGoal');
		},
		methods: {
			save() {
				if (this.editedIndex > -1) {
					Object.assign(
						this.dataTable[this.editedIndex],
						this.editedItem
						);
					const item = {
					// eslint-disable-next-line radix
					goalAmount: parseInt(this.editedItem.goalAmount),
					currencyId: Currency.getCurrency(this.editedItem.currencyId),
					name: this.editedItem.name
				};
				axios.post("/api/Goal/Edit", item).then((response) => {
					this.$store.dispatch("fetchGoal");
					console.log(response);
				});
			} else {
				const item = {
					// eslint-disable-next-line radix
					goalAmount: parseInt(this.editedItem.goalAmount),
					currencyId: Currency.getCurrency(this.editedItem.currencyId),
					name: this.editedItem.name,
					goalId: this.editedItem.goalId
				};
				console.log(item);
				axios.post("/api/Goal/Add", item).then((response) => {
					this.$store.dispatch("fetchGoal");
					console.log(response);
				});
			}
			this.close();
		},
		close() {
			this.dialog = false;
			setTimeout(() => {
				this.editedItem = { ...this.defaultItem };
				this.editedIndex = -1;
			}, 300);
		},
		editItem(item) {
			this.editedIndex = this.dataTable.indexOf(item);
			this.editedItem = { ...item };
			this.choosedCurrency = this.currencies[this.editedItem.currencyId];
			this.dialog = true;
		},
		pay(item) {
			this.editedIndex = this.dataTable.indexOf(item);
			this.editedItem = { ...item };
			this.choosedCurrency = this.currencies[this.editedItem.currencyId];
			this.editDialog = true;
		},
		paySubmit() {
			const item = {
				goalId: this.editedItem.goalId,
				amount: this.editedItem.amount
			};
			const url = this.deleteAmount ? "/api/Goal/DeleteAmount" : "/api/Goal/AddAmount";
			axios.post(url, item).then((response) => {
					this.$store.dispatch("fetchGoal");
					console.log(response);
				});
		},

		deleteItem(item) {
			// eslint-disable-next-line
			if (confirm(`Czy na pewno chcesz usunąć cel o nazwie "${item.name}" ?`)) {
				axios.post("/api/Goal/Delete", {
					goalId: item.goalId
				}).then((response) => {
					this.$store.dispatch("fetchGoal");
					console.log(response);
					const index = this.dataTable.indexOf(item);
					this.dataTable.splice(index, 1);
				});
			}
		}

	}
};
</script>