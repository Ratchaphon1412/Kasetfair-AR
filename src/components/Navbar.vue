<script setup lang="ts">
import NavbarButton from './NavbarButton.vue';
</script>

<template>
    <div class="bg-[#AFC2AC] bg-nav ">
        <div class="flex content-none justify-between max-w-screen h-fit md:mx-16 lg:mx-40 mx-2">
            <navbar-button 
                icon="ar_icon.svg" 
                text="AR" 
                linkPage="ar0"
                :newTab="true"
            />
            <navbar-button 
                icon="capsule_icon.svg" 
                text="วันวาน KU" 
                linkPage="time-capsule"
            />
            <navbar-button 
                icon="icon.home.svg" 
                text="หน้าหลัก" 
                size="lg" 
                linkPage="home"
            />
            <navbar-button 
                icon="time _icon.svg" 
                text="ตารางเวลา" 
                linkPage="timeline" 
            />
            <navbar-button 
                icon="more_icon.svg" 
                text="เพิ่มเติม" 
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