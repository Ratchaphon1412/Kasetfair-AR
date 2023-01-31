<script setup lang="ts">
import Navbar from '@/components/Navbar.vue';
import Annoucement from '@/components/Annoucement.vue'

const props = defineProps<{
    showAnnouce : boolean,
}>()
</script>

<template>
    <div>
		<slot></slot>
        <div class="bottom-0 w-full fixed">
            <annoucement v-if="showAnnouce"/>
            <navbar />
        </div>
    </div>
</template>