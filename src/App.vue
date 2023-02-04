<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
// import { onMounted } from "vue";

// export default function () {
//   const disableZoom = (event: TouchEvent) => {
//     if (event.touches.length > 1) {
//       event.preventDefault();
//     }
//   };

//   onMounted(() => {
//     document.addEventListener("touchstart", disableZoom);
//   });

//   return {
//     disableZoom,
//   };
// }
</script>

<template>
  <RouterView />
</template>
