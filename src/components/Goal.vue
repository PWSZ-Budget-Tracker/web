<template>
	<div>
		<v-toolbar flat color="grey lighten-3">
			<v-toolbar-title style="overflow: unset!important">{{ title }}</v-toolbar-title>
			<v-divider class="mx-4" inset vertical></v-divider>
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
			<template v-slot:item.currency="{ item }">{{ item.currency.shortName }}</template>
			<template v-slot:item.actions="{ item }">
				<v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
				<v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
				<div>
					<v-dialog persistent :retain-focus="false" v-model="editDialog" max-width="500px">
						<template v-slot:activator="{ on }">
							<v-btn @click="pay(item)" v-on="on">Wpłać</v-btn>
							<v-btn @click="pay(item); deleteAmount = true" v-on="on">Wypłać</v-btn>
						</template>
						<v-card>
							<v-form v-model="validAmountForm">
								<v-card-title>
									<span class="headline">{{ amountFormTitle }}</span>
								</v-card-title>

								<v-card-text>
									<v-row justify="center">
										<v-col cols="12" sm="6" md="4">
											<v-text-field
												color="#9090ee"
												type="number"
												:rules="[rules.minAmount, getMaxAmount]"
												v-model="editedItem.amount"
												:max="deleteAmount ? editedAmount : editedItem.goalAmount"
												label="kwota"
											></v-text-field>
										</v-col>
										<v-col cols="12" sm="6" md="4">
											<v-select v-model="choosedCurrency" disabled :items="currencies" label="Waluta"></v-select>
										</v-col>
									</v-row>
								</v-card-text>

								<v-card-actions>
									<v-spacer></v-spacer>
									<v-btn color="#3eb4a7" text @click="closePayDialog">anuluj</v-btn>
									<v-btn color="#3eb4a7" text @click="paySubmit">zapisz</v-btn>
								</v-card-actions>
							</v-form>
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
/*eslint-disable*/
import getCurrency from "@/helpers/currencyHelper";
import axios from "axios";

export default {
	data: () => ({
		title: "Cele",
		dialog: false,
		choosedCurrency: "",
		deleteAmount: false,
		editDialog: false,
		editedIndex: -1,
		editedAmount: 0,
		editedGoalAmount: 0,
		editedItem: {
			name: "",
			goalAmount: 0,
			currency: {
				shortName: ""
			},
			id: 0,
			amount: 0
		},
		validAmountForm: true,
		rules: {
			minAmount: v => v > -1 || "Podaj liczbę większą od zera!"
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
		},
		amountFormTitle() {
			return this.deleteAmount === false ? "Wpłać" : "Wypłać";
		},
		dataTable() {
			return this.$store.getters.getGoal == null
				? []
				: this.$store.getters.getGoal;
		}
	},
	created() {
		this.$store.dispatch("fetchGoal");
	},
	methods: {
		getMaxAmount(amount) {
			return amount >
				(!this.deleteAmount ? this.editedGoalAmount : this.editedAmount)
				? "Podana wartośc jest zbyt wielka!"
				: true;
		},
		save() {
			if (!this.validAmountForm) return;
			if (this.editedIndex > -1) {
				Object.assign(
					this.dataTable[this.editedIndex],
					this.editedItem
				);
				const item = {
					// eslint-disable-next-line radix
					goalAmount: parseInt(this.editedItem.goalAmount),
					name: this.editedItem.name,
					goalId: this.editedItem.id
				};

				axios.post("/api/Goal/Edit", item).then(() => {
					this.$store.dispatch("fetchGoal");
				});
			} else {
				const item = {
					// eslint-disable-next-line radix
					goalAmount: parseInt(this.editedItem.goalAmount),
					currencyId: getCurrency(this.choosedCurrency),
					name: this.editedItem.name
					// goalId: this.editedItem.goalId
				};
				axios.post("/api/Goal/Add", item).then(() => {
					this.$store.dispatch("fetchGoal");
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
		closePayDialog() {
			this.editDialog = false;
			this.deleteAmount = false;
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
		pay(item) {
			this.editedIndex = this.dataTable.indexOf(item);
			this.editedItem = { ...item };
			this.choosedCurrency = this.editedItem.currency.shortName;
			this.editedAmount = this.editedItem.amount;
			this.editedGoalAmount = this.editedItem.goalAmount;
			this.editDialog = true;
		},
		paySubmit() {
			if (!this.validAmountForm) return;
			const item = {
				goalId: this.editedItem.id,
				// eslint-disable-next-line radix
				amount: parseInt(this.editedItem.amount)
			};
			const url = this.deleteAmount
				? "/api/Goal/DeleteAmount"
				: "/api/Goal/AddAmount";
			if (this.deleteAmount) {
				axios
					.delete(url, {
						data: item,
						headers: { "Content-Type": "application/json" }
					})
					.then(() => {
						this.$store.dispatch("fetchGoal");
						this.editDialog = false;
					});
			} else {
				axios.put(url, item).then(() => {
					this.$store.dispatch("fetchGoal");
					this.editDialog = false;
				});
			}
		},

		deleteItem(item) {
			// eslint-disable-next-line
			if (
				confirm(
					`Czy na pewno chcesz usunąć cel o nazwie "${item.name}" ?`
				)
			) {
				axios
					.delete("/api/Goal/Delete", {
						data: { goalId: item.id },
						headers: { "Content-Type": "application/json" }
					})
					.then(() => {
						this.$store.dispatch("fetchGoal");
						const index = this.dataTable.indexOf(item);
						this.dataTable.splice(index, 1);
					});
			}
		}
	}
};
</script>