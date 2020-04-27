<template>
	<div>
		<v-data-table
			:headers="headers"
			:items="dataTable"
			sort-by="amount"
			class="elevation-1"
			:footer-props="{itemsPerPageText : 'strona' }"
		>
			<template v-slot:top>
				<v-toolbar flat color="grey lighten-3">
					<v-toolbar-title>{{title}}</v-toolbar-title>
					<v-divider class="mx-4" inset vertical></v-divider>
					<v-spacer></v-spacer>
					<v-dialog v-model="dialog" max-width="500px">
						<template v-slot:activator="{ on }">
							<v-btn color="#9090ee" dark class="mb-2" v-on="on">dodaj</v-btn>
						</template>
						<v-card>
							<v-card-title>
								<span class="headline">{{ formTitle }}</span>
							</v-card-title>

							<v-card-text>
								<v-row justify="center">
									<v-col cols="12" sm="6" md="4">
										<v-text-field color="#9090ee" v-model="editedItem.name" label="nazwa"></v-text-field>
									</v-col>
									<v-col cols="12" sm="6" md="4">
										<v-text-field color="#9090ee" v-model="editedItem.amount" label="kwota"></v-text-field>
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
			</template>
			<template v-slot:item.actions="{ item }">
				<v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
				<v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
			</template>
		</v-data-table>
	</div>
</template>

<script>
export default {
	data: () => ({
		dialog: false,
		headers: [
			{
				text: "Nazwa",
				align: "start",
				sortable: false,
				value: "name"
			},
			{ text: "Kwota", value: "amount" },
			{ text: "Akcja", value: "actions", sortable: false }
		],
		title: "",
		editedIndex: -1,
		editedItem: {
			name: "",
			amount: 0
		},
		defaultItem: {
			name: "",
			amount: 0
		}
	}),

	computed: {
		formTitle() {
			return this.editedIndex === -1 ? "Dodawanie" : "Edytowanie";
		},
		dataTable() {
			return this.$store.getters.getTableData(this.$route.path);
		}
	},

	watch: {
		dialog(val) {
			// eslint-disable-next-line no-unused-expressions
			val || this.close();
		}
	},

	created() {
		if (this.$route.path === "/expenses") {
			this.title = "Wydatki";
			this.$store.dispatch("setExpensesData");
		} else if (this.$route.path === "/income") {
			this.title = "Przychody";
			this.$store.dispatch("setIncomeData");
		} else if (this.$route.path === "/goal") {
			this.title = "Cele";
			this.$store.dispatch("setGoalData");
		}
	},

	methods: {
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

		close() {
			this.dialog = false;
			setTimeout(() => {
				this.editedItem = { ...this.defaultItem };
				this.editedIndex = -1;
			}, 300);
		},

		save() {
			if (this.editedIndex > -1) {
				Object.assign(
					this.dataTable[this.editedIndex],
					this.editedItem
				);
			} else {
				this.dataTable.push(this.editedItem);
			}
			this.close();
		}
	}
};
</script>
