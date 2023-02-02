<script setup lang="ts">
import { defineComponent } from 'vue';
import ShareNavbarLayout from '@/components/ShareNavbarLayout.vue';
import NavbarButton from '@/components/NavbarButton.vue';
import { useRoute } from 'vue-router';

const route = useRoute();  
const screenshot = route.params; // read parameter id (it is reactive) 
console.log(screenshot);
</script>


<template>
  <div class ="flex justify-between pl-2 pt-3">
    <div class="flex">
      <NavbarButton
      icon ="back_to_home.svg"
      size=""
      link-page="ar"
      />
    </div>
  </div>
    <ShareNavbarLayout :show-annouce="false">

    </ShareNavbarLayout>

</template>