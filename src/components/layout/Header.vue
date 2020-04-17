<template>
	<div>
		<template>
			<div>
				<v-app-bar app color="#3eb4a7" dark>
					<img alt="Vue logo" src="../../assets/logo.png" width="100" />

					<v-toolbar-title>Budget Tracker</v-toolbar-title>

					<v-spacer></v-spacer>

					<v-btn icon v-on="on">
						<v-badge :content="messages" :value="messages" color="#9090ee" overlap>
							<v-icon>mdi-alarm</v-icon>
						</v-badge>
					</v-btn>
					<v-menu left bottom>
						<template v-slot:activator="{ on }">
							<v-btn icon v-on="on">
								<v-icon>mdi-account-circle</v-icon>
							</v-btn>
						</template>

						<v-list>
							<v-list-item @click="() => {}">
								<v-list-item-title>wyloguj</v-list-item-title>
							</v-list-item>
						</v-list>
					</v-menu>
				</v-app-bar>
			</div>
		</template>
	</div>
</template>
