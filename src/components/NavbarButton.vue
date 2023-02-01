<script setup lang="ts">
const props = withDefaults(defineProps<{
	icon: string;
	text?: string;
	size?: string;
	linkPage: string;
}>(), {
	size: 'md'
});

const getIconURL = (path: string): string => {
	return new URL(`../assets/icons/${path}`, import.meta.url).href;
};
const getSize = (size : string): string =>{
	switch(size){
		case "lg":
			return 'w-[60px]'
		case "sm":
			return 'w-[30px]'
		case "md":
			return 'w-[50px]'
	}
	return ""
}
</script>

<template>
<div v-if="text=='AR'">
	<router-link :to="{ name: props.linkPage }" target="_blank" class="p-1 flex-col mt-auto">
        <img :src="getIconURL(props.icon)" class="mx-auto" :class="props.size == 'md' ? 'w-[50px]' : 'w-[60px]'" alt="icon" draggable="false">
        <h1 class="text-center pt-1 font-bold">{{ props.text }}</h1>
	</router-link>
</div>
<div v-else>
	<router-link :to="{ name: props.linkPage }" class="p-1 flex-col mt-auto">
        <img :src="getIconURL(props.icon)" class="mx-auto" :class="getSize(props.size)" alt="icon" draggable="false">
        <h1 class="text-center pt-1 font-bold">{{ props.text }}</h1>
	</router-link>
</div>
</template>