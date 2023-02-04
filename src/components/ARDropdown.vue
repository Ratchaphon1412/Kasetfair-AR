<script setup lang="ts">

import { ref } from "vue";
import { onMounted } from "vue";
import { onBeforeRouteUpdate, useRoute } from "vue-router";

const show = ref(false);
const selected = ref("เลือกจุดของ AR");

const route = useRoute();

const arList = ref([
	{ 'text': 'สระพระพิรุณ', 'route': 'ar0' },
	{ 'text': 'สามบูรพาจารย์', 'route': 'ar1' },
	{ 'text': 'KU Milk', 'route': 'ar2' },
	{ 'text': 'คณะแพทย์', 'route': 'ar3' },
	{ 'text': 'พรีเมียม', 'route': 'ar4' },
	{ 'text': 'คณะวิศวะ', 'route': 'ARX' },
])

const select = (item: string) => {
	selected.value = item;
	show.value = false;
};
console.log("ROUTE: ", route.name);

onBeforeRouteUpdate((to, form) => {
	console.log("ROUTE: ", route.name);
})

const getRouteName = () => {
	console.log("ROUTE: ", route.name);
}

</script>


<template>
	<div class="relative">
		<button @click="show = !show" class="w-full py-1 px-6 border bg-[#57855E] text-white border-none rounded-md">
			{{ 	selected }}
		</button>
		<div v-if="show" class="absolute right-0 z-10 bg-white rounded-md shadow-lg">
			<ul class="list-none">
				<li v-for="item in arList" class="py-1 px-3 hover:bg-gray-100 rounded-md">
					<router-link :to="{ name: item.route }">
						{{ item.text }}
					</router-link>
				</li>
			</ul>
		</div>
	</div>
</template>

<style scoped>
</style>
