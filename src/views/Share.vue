<script setup lang="ts">

import { defineComponent } from 'vue';
import ShareNavbarLayout from '@/components/ShareNavbarLayout.vue';
import NavbarButton from '@/components/NavbarButton.vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const screenshot = localStorage.getItem('screenshot');
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

  <ShareNavbarLayout>
    <div class="d-flex justify-content-center align-items-center h-100">
      <img id="image1" :src="screenshot" />
    </div>
  </ShareNavbarLayout>

</template>

<style>
#image1 {
  display: block;
  margin-left: auto;
  margin-right: auto;
  border-radius: 40px;
  border-color: black;
  border-width: 5px;
}
</style>