<script setup lang="ts">
const props = withDefaults(defineProps<{
	icon: string;
	text?: string;
	size?: string;
	linkPage: string;
	newTab?: boolean;
}>(), {
	size: 'md',
	newTab: false,
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
		default:
			return 'w-[50px]'
	}
}
</script>

<template>
<div>
	<router-link :to="{ name: props.linkPage }" :target="newTab && '_blank'" class="flex-col mt-auto">
        <img :src="getIconURL(props.icon)" class="mx-auto mt-1" :class="getSize(props.size)" alt="icon" draggable="false">
        <h1 class="text-center pt-1 font-bold">{{ props.text }}</h1>
	</router-link>
</div>
</template>