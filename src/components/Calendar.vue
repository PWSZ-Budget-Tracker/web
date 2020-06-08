<template>
	<div>
		<v-row class="fill-height">
			<v-col>
				<v-sheet height="64">
					<v-toolbar flat color="white">
						<v-btn outlined class="mr-4" color="grey darken-2" @click="setToday">Dziś</v-btn>
						<v-btn fab text small color="grey darken-2" @click.native="prev">
							<v-icon small>mdi-chevron-left</v-icon>
						</v-btn>
						<v-btn fab text small color="grey darken-2" @click.native="next">
							<v-icon small>mdi-chevron-right</v-icon>
						</v-btn>
						<v-toolbar-title>{{ title }}</v-toolbar-title>
						<v-spacer></v-spacer>
						<v-menu bottom right>
							<template v-slot:activator="{ on }">
								<v-btn outlined color="grey darken-2" v-on="on">
									<span>{{ typeToLabel[type] }}</span>
									<v-icon right>mdi-menu-down</v-icon>
								</v-btn>
							</template>
							<v-list>
								<v-list-item @click="type = 'day'">
									<v-list-item-title>Dzień</v-list-item-title>
								</v-list-item>
								<v-list-item @click="type = 'week'">
									<v-list-item-title>Tydzień</v-list-item-title>
								</v-list-item>
								<v-list-item @click="type = 'month'">
									<v-list-item-title>Miesiąc</v-list-item-title>
								</v-list-item>
							</v-list>
						</v-menu>
					</v-toolbar>
				</v-sheet>
				<v-sheet height="600">
					<v-calendar
						ref="calendar"
						v-model="focus"
						color="primary"
						:events="events"
						:event-color="getEventColor"
						:type="type"
						@click:event="showEvent"
						@click:more="viewDay"
						@click:date="viewDay"
						@change="updateRange"
					></v-calendar>
					<v-menu
						v-model="selectedOpen"
						:close-on-content-click="false"
						:activator="selectedElement"
						offset-x
					>
						<v-card color="grey lighten-4" min-width="350px" flat>
							<v-toolbar :color="selectedEvent.color" dark>
								<v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
								<v-spacer></v-spacer>
							</v-toolbar>
							<v-card-text>
								<span v-html="selectedEvent.details"></span>
							</v-card-text>
							<v-card-actions>
								<v-btn text color="secondary" @click="selectedOpen = false">Zamknij</v-btn>
							</v-card-actions>
						</v-card>
					</v-menu>
				</v-sheet>
			</v-col>
		</v-row>
	</div>
</template>
<script>
/* eslint-disable */
export default {
	data: () => ({
		focus: "",
		type: "month",
		typeToLabel: {
			month: "Month",
			week: "Week",
			day: "Day",
			"4day": "4 Days"
		},
		start: null,
		end: null,
		selectedEvent: {},
		selectedElement: null,
		selectedOpen: false
	}),
	computed: {
		title() {
			const { start, end } = this;
			if (!start || !end) {
				return "";
			}

			const startMonth = this.monthFormatter(start);
			const endMonth = this.monthFormatter(end);
			const suffixMonth = startMonth === endMonth ? "" : endMonth;

			const startYear = start.year;
			const endYear = end.year;
			const suffixYear = startYear === endYear ? "" : endYear;

			const startDay = start.day + this.nth(start.day);
			const endDay = end.day + this.nth(end.day);

			switch (this.type) {
				case "month":
					return `${startMonth} ${startYear}`;
				case "week":
				case "4day":
					return `${startMonth} ${startDay} ${startYear} - ${suffixMonth} ${endDay} ${suffixYear}`;
				case "day":
					return `${startMonth} ${startDay} ${startYear}`;
			}
			return "";
		},
		monthFormatter() {
			return this.$refs.calendar.getFormatter({
				timeZone: "UTC",
				month: "long"
			});
		},
		incomes() {
			return this.$store.getters.getIncomes;
		},
		expenses() {
			return this.$store.getters.getExpenses;
		},
		events() {
			let events = [];
			for (let i = 0; i < this.incomes.length; i++) {
				let date = new Date(this.incomes[i].timeStamp);
				let event = {
					name: `${this.incomes[i].amount} ${this.incomes[i].currency.shortName} - ${this.incomes[i].categoryName}`,
					start:
						date.getFullYear() +
						"-" +
						(date.getMonth() + 1) +
						"-" +
						date.getDate(),
					color: "teal"
				};
				events.push(event);
			}
			for (let i = 0; i < this.expenses.length; i++) {
				let date = new Date(this.expenses[i].timeStamp);
				let event = {
					name: `${this.expenses[i].amount} ${this.expenses[i].currency.shortName} - ${this.expenses[i].categoryName}`,
					start:
						date.getFullYear() +
						"-" +
						(date.getMonth() + 1) +
						"-" +
						date.getDate(),
					color: "red"
				};
				events.push(event);
			}
			return events;
		}
	},
	mounted() {
		this.$refs.calendar.checkChange();
	},
	created() {
		this.$store.dispatch("fetchIncomes");
		this.$store.dispatch("fetchExpenses");
	},

	methods: {
		viewDay({ date }) {
			this.focus = date;
			this.type = "day";
		},
		getEventColor(event) {
			return event.color;
		},
		setToday() {
			this.focus = this.today;
		},
		prev() {
			this.$refs.calendar.prev();
		},
		next() {
			this.$refs.calendar.next();
		},
		showEvent({ nativeEvent, event }) {
			const open = () => {
				this.selectedEvent = event;
				this.selectedElement = nativeEvent.target;
				setTimeout(() => (this.selectedOpen = true), 10);
			};

			if (this.selectedOpen) {
				this.selectedOpen = false;
				setTimeout(open, 10);
			} else {
				open();
			}

			nativeEvent.stopPropagation();
		},
		updateRange({ start, end }) {
			this.start = start;
			this.end = end;
		},
		nth(d) {
			return d > 3 && d < 21
				? "th"
				: ["th", "st", "nd", "rd", "th", "th", "th", "th", "th", "th"][
						d % 10
				  ];
		},
		rnd(a, b) {
			return Math.floor((b - a + 1) * Math.random()) + a;
		},
		formatDate(a, withTime) {
			return withTime
				? `${a.getFullYear()}-${a.getMonth() +
						1}-${a.getDate()} ${a.getHours()}:${a.getMinutes()}`
				: `${a.getFullYear()}-${a.getMonth() + 1}-${a.getDate()}`;
		}
	},
	beforeRouteEnter(to, from, next) {
		if (localStorage.getItem("token")) next();
		else next("/about");
	}
};
</script>

	<style scoped>
.v-calendar-daily__body {
	display: none !important;
}
</style>