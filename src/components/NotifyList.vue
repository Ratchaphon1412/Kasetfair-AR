<script setup lang="ts">
const props = defineProps<{
    text: String,
    author: String,
}>()
</script>

<template>

        <ul class="list-disc list-inside">
            <li>{{ text }}</li>
            <h4 class="pl-6">{{ author }}</h4>
        </ul>
</template>