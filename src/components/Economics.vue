/* eslint-disable no-alert */
<template>
	<div>
		<v-toolbar flat color="grey lighten-3">
			<v-toolbar-title>{{title}}</v-toolbar-title>
			<v-divider class="mx-4" inset vertical></v-divider>
			<v-spacer></v-spacer>
			<v-dialog v-model="categoryDialog" max-width="500px">
				<template v-slot:activator="{ on }">
					<v-btn color="#9090ee" dark class="mb-2" v-on="on">dodaj kategorie</v-btn>
				</template>
				<v-card>
					<v-card-title>
						<span class="headline">Dodaj Kategorię</span>
					</v-card-title>

					<v-card-text>
						<v-row justify="center">
							<v-col cols="12" sm="6" md="4">
								<v-text-field color="#9090ee" v-model="categoryName" label="nazwa"></v-text-field>
							</v-col>
						</v-row>
					</v-card-text>

					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn color="#3eb4a7" text @click="categoryClose">anuluj</v-btn>
						<v-btn color="#3eb4a7" text @click="categorySave">zapisz</v-btn>
					</v-card-actions>
				</v-card>
			</v-dialog>
		</v-toolbar>
		<v-expansion-panels multiple>
			<v-expansion-panel v-for="category in categories" :key="category.id">
				<v-expansion-panel-header>
					{{category.name}}
					<div class="ml-2">
						<v-dialog :retain-focus="false" v-model="editCategoryDialog" max-width="500px">
							<template v-slot:activator="{ on }">
								<v-icon
									v-if="!category.isDefault"
									v-on="on"
									small
									class="mr-2"
									@click="openEditCategoryDialog(category)"
								>mdi-pencil</v-icon>
							</template>
							<v-card>
								<v-card-title>
									<span class="headline">Edytuj Kategorię</span>
								</v-card-title>

								<v-card-text>
									<v-row justify="center">
										<v-col cols="12" sm="6" md="4">
											<v-text-field color="#9090ee" v-model="categoryName" label="nazwa"></v-text-field>
										</v-col>
									</v-row>
								</v-card-text>

								<v-card-actions>
									<v-spacer></v-spacer>
									<v-btn color="#3eb4a7" text @click="closeEditCategoryDialog">anuluj</v-btn>
									<v-btn color="#3eb4a7" text @click="editCategory">zapisz</v-btn>
								</v-card-actions>
							</v-card>
						</v-dialog>
						<v-icon v-if="!category.isDefault" small @click="deleteCategory(category)">mdi-delete</v-icon>
					</div>
				</v-expansion-panel-header>
				<v-expansion-panel-content>
					<Table :category="category" />
				</v-expansion-panel-content>
			</v-expansion-panel>
		</v-expansion-panels>
	</div>
</template>

<script>
import axios from "axios";
import Table from "@/components/Table.vue";

export default {
	data: () => ({
		categoryDialog: false,
		editCategoryDialog: false,
		categoryName: "",
		editedIndex: -1,
		title: ""
	}),
	components: {
		Table
	},

	computed: {
		categories() {
			return this.$store.getters.getCategories;
		}
	},

	created() {
		this.title = this.$route.path === "/expenses" ? "Wydatki" : "Przychody";
		this.$store.dispatch("fetchCategories");
		if (this.$route.path === "/expenses")
			this.$store.dispatch("fetchExpenses");
		else this.$store.dispatch("fetchIncomes");
	},

	methods: {
		closeEditCategoryDialog() {
			this.editCategoryDialog = false;
			this.categoryName = "";
			this.editedIndex = -1;
		},
		categoryClose() {
			this.categoryDialog = false;
			this.editedIndex = -1;
		},
		openEditCategoryDialog(category) {
			this.categoryName = category.name;
			this.editedIndex = category.id;
		},
		editCategory() {
			axios
				.put("/api/Category/Edit", {
					categoryId: this.editedIndex,
					name: this.categoryName
				})
				// eslint-disable-next-line arrow-parens
				.then(() => {
					this.categoryName = "";
					this.editCategoryDialog = false;
					this.$store.dispatch("fetchCategories");
				});
		},
		deleteCategory(category) {
			// eslint-disable-next-line no-restricted-globals
			if (confirm(`Czy na pewno usunąć kategorię ${category.name}?`)) {
				axios
					.delete("/api/Category/Delete", {
						data: { categoryId: category.id },
						headers: { "Content-Type": "application/json" }
					})
					.then(() => {
						this.$store.dispatch("fetchCategories");
					});
			}
		},
		categorySave() {
			axios
				.post("/api/Category/Add", {
					name: this.categoryName,
					type: this.$route.path === "/expenses" ? 0 : 1
				})
				// eslint-disable-next-line arrow-parens
				.then(() => {
					this.$store.dispatch("fetchCategories");
					this.categoryName = "";
					this.categoryDialog = false;
				});
		}
	},
	beforeRouteEnter(to, from, next) {
		if (localStorage.getItem("token")) next();
		else next("/about");
	}
};
</script>
