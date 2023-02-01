<script setup lang="ts">
import { onMounted, ref } from 'vue';

onMounted(() => {

});
</script>

<template>
    <div>
        <RouterLink :to="{ name: 'home' }">Home</RouterLink><br/>
        <RouterLink :to="{ name: 'trois' }">Trois</RouterLink>
        <img ref="" src="@/assets/images/KasetFairWelcomeBackground.png" class="w-full" alt="background">
    </div>
</template>

<style scoped>
</style>