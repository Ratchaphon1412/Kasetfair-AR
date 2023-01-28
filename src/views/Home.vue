<script setup lang="ts">
import MapZone from '@/components/MapZone.vue';
import Navbar from '@/components/Navbar.vue';
import Annoucement from '@/components/Annoucement.vue'
</script>

<template>
    <div>
		<div class="px-3 py-2">
			<h1 class="font-bold text-3xl">แผนที่</h1>
		</div>
        <MapZone/>
        <Annoucement/>
        <Navbar />
    </div>
</template>