<script setup lang="ts">
const props = defineProps<{
    text: String,
    author: String,
}>()
</script>

<template>
    <div>
        <h4>{{ text }}</h4>
        <h4>{{ author }}</h4>
    </div>
</template>