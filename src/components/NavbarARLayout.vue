<script setup lang="ts">
import NavbarAR from '@/components/NavbarAR.vue';
</script>

<template>
    <div >
        <div class="mb-[144.5px]">
            <slot />
        </div>
        <div class="bottom-0 w-full fixed">
            <navbar-ar />
        </div>
    </div>
</template>
<style scoped>
.w-full {
   z-index: 100;
}
</style>