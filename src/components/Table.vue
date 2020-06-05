<template>
	<div>
		<v-data-table
			:headers="headers"
			:items="getDataTable(category)"
			sort-by="amount"
			class="elevation-1"
			:footer-props="{itemsPerPageText : 'strona' }"
		>
			<template v-slot:top>
				<v-dialog :retain-focus="false" v-model="dialog" max-width="500px">
					<template v-slot:activator="{ on }">
						<div class="w-100 d-flex justify-content-end">
							<v-btn color="#9090ee" right dark class="mb-2" v-on="on">dodaj</v-btn>
						</div>
					</template>
					<v-form v-model="tableForm">
						<v-card>
							<v-card-title>
								<span class="headline">{{ formTitle }}</span>
							</v-card-title>

							<v-card-text>
								<v-row justify="center">
									<v-col cols="12" sm="6" md="4">
										<v-text-field
											color="#9090ee"
											type="number"
											:rules="[rules.minLength]"
											v-model="editedItem.amount"
											label="kwota"
										></v-text-field>
									</v-col>
									<v-col cols="12" sm="6" md="4">
										<v-select
											v-model="choosedCurrency"
											:disabled="formTitle == 'Edytowanie'"
											:items="currencies"
											label="Waluta"
										></v-select>
									</v-col>
								</v-row>
							</v-card-text>

							<v-card-actions>
								<v-spacer></v-spacer>
								<v-btn color="#3eb4a7" text @click="close">anuluj</v-btn>
								<v-btn color="#3eb4a7" text @click="save(category)">zapisz</v-btn>
							</v-card-actions>
						</v-card>
					</v-form>
				</v-dialog>
			</template>
			<template v-slot:item.currency="{ item }">{{ item.currency.shortName }}</template>
			<template v-slot:item.actions="{ item }">
				<v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
				<v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
			</template>
		</v-data-table>
	</div>
</template>

<script>
/*eslint-disable*/
import getCurrency from "@/helpers/currencyHelper";
import axios from "axios";

export default {
	data: () => ({
		choosedCurrency: "",
		dialog: false,
		editedIndex: -1,
		tableForm: true,
		editedItem: {
			name: "",
			goalAmount: 0,
			currency: {
				shortName: ""
			},
			id: 0,
			amount: 0
		},
		rules: {
			minLength: v => v > -1 || "Podaj liczbę większą od zera!"
		},
		defaultItem: {
			name: "",
			goalAmount: 0,
			currency: {
				shortName: ""
			},
			id: 0,
			amount: 0
		},
		currencies: ["PLN", "USD", "EUR"],
		headers: [
			{ text: "Kwota", value: "amount" },
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
	props: ["category"],
	computed: {
		formTitle() {
			return this.editedIndex === -1 ? "Dodawanie" : "Edytowanie";
		},
		dataTable() {
			return this.$route.path === "/expenses"
				? this.$store.getters.getExpenses
				: this.$store.getters.getIncomes;
		}
	},
	methods: {
		save(category) {
			if (!this.tableForm) return;
			if (this.editedIndex > -1) {
				Object.assign(
					this.dataTable[this.editedIndex],
					this.editedItem
				);
				// eslint-disable-next-line radix
				const item =
					this.$route.path === "/expenses"
						? {
								expenseId: this.editedItem.id,
								// eslint-disable-next-line radix
								amount: parseInt(this.editedItem.amount)
						  }
						: {
								incomeId: this.editedItem.id,
								// eslint-disable-next-line radix
								amount: parseInt(this.editedItem.amount)
						  };
				const url =
					this.$route.path === "/expenses"
						? "/api/Expenses/Edit"
						: "/api/Income/Edit";
				axios.put(url, item).then(() => {
					this.saveToDatabase();
				});
			} else {
				const item = {
					// eslint-disable-next-line radix
					amount: parseInt(this.editedItem.amount),
					currencyId: getCurrency(this.choosedCurrency),
					categoryId: category.id
				};
				const url =
					this.$route.path === "/expenses"
						? "/api/Expenses/Add"
						: "/api/Income/Add";
				axios.post(url, item).then(() => {
					this.saveToDatabase();
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
			this.choosedCurrency = this.editedItem.currency.shortName;
			this.dialog = true;
		},

		deleteItem(item) {
			const index = this.dataTable.indexOf(item);
			// eslint-disable-next-line
			if (confirm("Are you sure you want to delete this item?")) {
				this.dataTable.splice(index, 1);
				const url =
					this.$route.path === "/expenses"
						? "/api/Expenses/Delete"
						: "/api/Income/Delete";
				const tableItem =
					this.$route.path === "/expenses"
						? { expenseId: item.id }
						: { incomeId: item.id };
				axios
					.delete(url, {
						data: tableItem,
						headers: { "Content-Type": "application/json" }
					})
					.then(() => {
						this.saveToDatabase();
					});
			}
		},
		getDataTable(category) {
			const dataTable = [];
			for (let i = 0; i < this.dataTable.length; i++) {
				if (this.dataTable[i].categoryName === category.name) {
					dataTable.push(this.dataTable[i]);
				}
			}
			return dataTable;
		},
		saveToDatabase() {
			if (this.$route.path === "/income") {
				this.$store.dispatch("fetchIncomes");
			} else if (this.$route.path === "/expenses") {
				this.$store.dispatch("fetchExpenses");
			}
		}
	}
};
</script>