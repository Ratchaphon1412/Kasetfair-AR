<script setup lang="ts">
import NavbarLayout from '@/components/NavbarLayout.vue';
import ARNavbarLayout from '@/components/ARNavbarLayout.vue';
import NavbarButton from '@/components/NavbarButton.vue';
</script>

<template>
  <div class ="flex justify-between pl-2 pt-3">
    <div class="flex">
      <NavbarButton
      icon ="back_icon.svg"
      size=""
      link-page="home"
      />
      <div class="pl-3 pt-1">
        <img src="@/assets/icons/house_icon.svg" alt="icon">
      </div>
    </div>
    <div class="bg-green-200">anotherAR</div>
  </div>
  <a-r-navbar-layout show-annouce="false">

  </a-r-navbar-layout>
</template>

<style
>
</style>