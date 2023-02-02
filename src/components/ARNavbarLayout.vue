<script setup lang="ts">
import ARNavbar from './ARNavbar.vue';

const props = defineProps<{
    showAnnouce : boolean,
}>()
</script>

<template>
    <div >
        <div class="mb-[144.5px]">
            <slot />
        </div>
        <div class="bottom-0 w-full fixed">
            <ARNavbar/>
        </div>
    </div>
</template>