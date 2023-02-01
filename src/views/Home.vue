<script setup lang="ts">
import MapZone from '@/components/MapZone.vue';
import NavbarLayout from '@/components/NavbarLayout.vue';
</script>

<template>
    <navbar-layout>
		<div class="px-3 py-2">
			<h1 class="font-bold text-3xl">แผนที่</h1>
		</div>
        <map-zone/>
    </navbar-layout>
</template>