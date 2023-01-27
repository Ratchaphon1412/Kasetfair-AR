<script setup la
  components: { Navbar },ng="ts">
import MapZone from '@/components/MapZone.vue';
import Navbar from '@/components/Navbar.vue';
import Annoucement from '@/components/Annoucement.vue'
</script>

<template>
    <div>
        <h1>แผนที่</h1>
        <MapZone/>
        <Annoucement/>
        <Navbar />
    </div>
</template>