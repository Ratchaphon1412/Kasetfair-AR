<script setup lang="ts">
import MapZone from '@/components/MapZone.vue';
import NavbarButton from '@/components/NavbarButton.vue';
import NavbarLayout from '@/components/NavbarLayout.vue';
</script>

<template>
    <navbar-layout :show-annouce=true>
		<div class="px-3 py-2 flex justify-between ">
			<h1 class="font-bold text-3xl my-auto">แผนที่</h1>
            <!-- <navbar-button
                icon="notification_icon.svg"
                size="sm"
                linkPage="notification" 
                class="my-auto"
                /> -->
		</div>
        <map-zone/>
    </navbar-layout>
</template>