<script setup lang="ts">

import { ref } from "vue";
import { onMounted } from "vue";
import { onBeforeRouteUpdate, useRoute } from "vue-router";

const show = ref(false);
const selected = ref("เลือกจุดของ AR");
const route = useRoute();
const icon = ref("fa-caret-down");

const arList = ref([
	{ 'text': 'สระพระพิรุณ', 'route': 'ar0' },
	{ 'text': '๓ บูรพาจารย์', 'route': 'ar1' },
	{ 'text': 'KU Milk', 'route': 'ar3' },
	{ 'text': 'คณะแพทย์', 'route': 'ar4' },
	{ 'text': 'พรีเมียม', 'route': 'ar2' },
	{ 'text': 'ด้านล่างตึกฟิสิกส์', 'route': 'ar5' },
	{ 'text': 'ด้านบนตึกฟิสิกส์', 'route': 'ar8' },
	{ 'text': 'คณะวิศวะ', 'route': 'arx' },
])

const select = (item: string) => {
	selected.value = item;
	show.value = false;
};

const toggle = () => {
	show.value = !show.value;
	if (show.value === false) {
		icon.value = "fa-caret-down"
	} else {
		icon.value = "fa-caret-up"
	}
};

const getRouteName = (routeName: string): string => {
	switch (routeName) {
		case 'ar0':
			return 'สระพระพิรุณ';
		case 'ar1':
			return '๓ บูรพาจารย์';
		case 'ar4':
			return 'คณะแพทย์';
		case 'ar3':
			return 'KU Milk';
		case 'ar2':
			return 'พรีเมียม';
		case 'ar5':
			return 'ด้านล่างตึกฟิสิกส์';
		case 'ar8':
			return 'ด้านบนตึกฟิสิกส์';
		case 'arx':
			return 'คณะวิศวะ';
		default:
			return 'เลือกจุดของ AR';
	}
}

selected.value = getRouteName(route.name as string);
</script>


<template>
	<div class="relative">
		<button @click="toggle" class="w-full py-1 px-6 border bg-[#57855E] text-white border-none rounded-md flex items-center">
			{{ selected }}
			<i class="fas ml-2 text-xs" :class="icon"></i>
		</button>
		<div v-if="show" class="absolute right-0 z-10 bg-white rounded-md shadow-lg w-28">
			<ul class="list-none">
			<router-link :to="{ name: item.route }" v-for="item in arList">
				<li class="py-1 px-3 hover:bg-gray-100 rounded-md">
					{{ item.text }}
				</li>
			</router-link>
			</ul>
		</div>
	</div>
</template>

<style scoped>
</style>