<script setup lang="ts">
import NavbarLayout from '@/components/NavbarLayout.vue';
import ARNavbarLayout from '@/components/ARNavbarLayout.vue';
import NavbarButton from '@/components/NavbarButton.vue';
</script>

<template>
  <div class ="flex justify-start pl-2 pt-3">
    <NavbarButton
    icon ="back_icon.svg"
    size=""
    link-page="home"
    />
    <div class="pl-3 pt-1">
      <img src="@/assets/icons/house_icon.svg" alt="icon">
    </div>
  </div>
  <a-r-navbar-layout>

  </a-r-navbar-layout>
</template>

<style
>
</style>