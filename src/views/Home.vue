<template>
	<div>
		<Login msg="Welcome das to Your Vue.js App"></Login>/>
	</div>
</template>

<script>
// @ is an alias to /src
import Login from "@/components/Login.vue";

export default {
	name: "Home",
	components: {
		Login
	}
};
</script>
