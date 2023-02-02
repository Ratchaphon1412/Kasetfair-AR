<script setup lang="ts">
import NavbarButton from './NavbarButton.vue';
</script>

<template>
    <div class="bg-[#AFC2AC] bg-nav ">
        <div class="flex content-none justify-between max-w-screen h-fit md:mx-16 lg:mx-40 mx-2">
            <navbar-button 
                icon="ARselect_icon.svg" 
                text="ลอง AR อื่นๆ" 
                size="lg"
                linkPage="ar"
            />
            <navbar-button 
                icon="save_icon.svg" 
                text="บันทึก" 
                size="lg"
                linkPage="home"
            />
            <navbar-button 
                icon="share_icon.svg" 
                text="แชร์" 
                size="lg"
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