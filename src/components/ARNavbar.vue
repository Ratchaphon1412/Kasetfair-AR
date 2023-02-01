<script setup lang="ts">
import NavbarButton from './NavbarButton.vue';
</script>

<template>
    <div class="bg-[#AFC2AC] bg-nav ">
        <div class="flex content-none justify-center max-w-screen h-fit md:mx-16 lg:mx-40 mx-2">
            <navbar-button 
                icon="icon.camera.svg" 
                text="ถ่ายภาพ" 
                size = "lg"
                linkPage="home"
            />
        </div>
    </div>
</template>

<style scoped>
.bg-nav {
    background-size: 50px 100px !important;
}

</style>