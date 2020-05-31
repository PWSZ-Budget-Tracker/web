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
				<v-card>
					<v-card-title>
						<span class="headline">{{ formTitle }}</span>
					</v-card-title>

					<v-card-text>
						<v-row justify="center">
							<v-col cols="12" sm="6" md="4">
								<v-text-field color="#9090ee" type="number" v-model="editedItem.amount" label="kwota"></v-text-field>
							</v-col>
							<v-col cols="12" sm="6" md="4">
								<v-select v-model="choosedCurrency" :items="currencies" label="Waluta"></v-select>
							</v-col>
						</v-row>
					</v-card-text>

					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn color="#3eb4a7" text @click="close">anuluj</v-btn>
						<v-btn color="#3eb4a7" text @click="save(category)">zapisz</v-btn>
					</v-card-actions>
				</v-card>
			</v-dialog>
		</template>
		<template v-slot:item.currency="{ item }">
			{{ currencies[item.currencyId] }}
		</template>
		<template v-slot:item.actions="{ item }">
			<v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
			<v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
			<div v-if="$route.path == '/goal'">
				<v-dialog :retain-focus="false" v-model="dialog" max-width="500px">
					<template v-slot:activator="{ on }">
						<v-btn @click="editItem(item)" v-on="on">Wpłać</v-btn>
					</template>
					<v-card>
						<v-card-title>
							<span class="headline">Wpłać</span>
						</v-card-title>

						<v-card-text>
							<v-row justify="center">
								<v-col cols="12" sm="6" md="4">
									<v-text-field color="#9090ee" type="number" v-model="editedItem.paid" label="kwota"></v-text-field>
								</v-col>
								<v-col cols="12" sm="6" md="4">
									<v-select v-model="choosedCurrency" :items="currencies" label="Waluta"></v-select>
								</v-col>
							</v-row>
						</v-card-text>

						<v-card-actions>
							<v-spacer></v-spacer>
							<v-btn color="#3eb4a7" text @click="close">anuluj</v-btn>
							<v-btn color="#3eb4a7" text @click="save(category)">zapisz</v-btn>
						</v-card-actions>
					</v-card>
				</v-dialog>
				<v-progress-linear
				:active="true"
				:background-opacity="0.2"
				:buffer-value="100"
				:height="16"
				:rounded="true"
				:value="(item.paid/item.amount)*100"
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
			dataTable: [{ amount: 123, currencyId: 0, categoryId: 8 }],
			choosedCurrency: "",
			dialog: false,
			editedIndex: -1,
			editedItem: {
				name: "",
				amount: 0,
				paid: 0
			},
			defaultItem: {
				name: "",
				amount: 0,
				paid: 0
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
	props: ['category'],
	computed: {
		formTitle() {
			return this.editedIndex === -1 ? "Dodawanie" : "Edytowanie";
		}
			// dataTable() {
			// 	return this.$route.path === '/expenses' ? this.$store.getters.getExpenses : this.$store.getters.getIncomes;
		},
		methods: {
			save(category) {
				if (this.editedIndex > -1) {
					Object.assign(
						this.dataTable[this.editedIndex],
						this.editedItem
						);
					this.saveToStore();
				} else {
					const item = {
					// eslint-disable-next-line radix
					amount: parseInt(this.editedItem.amount),
					currencyId: Currency.getCurrency(this.choosedCurrency),
					categoryId: category.id
				};
				console.log(item);
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
			this.dialog = true;
		},

		deleteItem(item) {
			const index = this.dataTable.indexOf(item);
			// eslint-disable-next-line
			if (confirm("Are you sure you want to delete this item?")) {
				this.dataTable.splice(index, 1);
			}
		},
		getDataTable(category) {
			const dataTable = [];
			for (let i = 0; i < this.dataTable.length; i++) {
				if (this.dataTable[i].categoryId === category.id) {
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