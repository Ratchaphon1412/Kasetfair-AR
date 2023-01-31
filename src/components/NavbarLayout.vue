<script setup lang="ts">
import Navbar from "@/components/Navbar.vue";
import Annoucement from "@/components/Annoucement.vue";
</script>

<template>
  <div>
    <div class="mb-[144.5px]">
      <slot />
    </div>
    <div class="bottom-0 w-full fixed">
      <annoucement />
      <navbar />
    </div>
  </div>
</template>
