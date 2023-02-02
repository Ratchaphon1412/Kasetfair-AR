<script setup lang="ts">
import MapZone from '@/components/MapZone.vue';
import NavbarButton from '@/components/NavbarButton.vue';
import NavbarLayout from '@/components/NavbarLayout.vue';
</script>

<template>
    <navbar-layout showAnnouce="True">
		<div class="px-3 py-2 flex justify-between">
			<h1 class="font-bold text-3xl">แผนที่</h1>
            <navbar-button
                icon="notification_icon.svg"
                size=""
                linkPage="notification" 
                />
		</div>
        <map-zone/>
    </navbar-layout>
</template>