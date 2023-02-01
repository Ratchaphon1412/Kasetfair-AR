<script setup lang="ts">
import ShareNavbar from './ShareNavbar.vue';
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
            <ShareNavbar/>
        </div>
    </div>
</template>