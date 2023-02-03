<template>
    <div class="bg-welcome">
        <router-link :to="{ name: 'home' }">
            <div class="bg-white inline-block px-8 py-2 font-bold text-xl rounded-full hover:bg-slate-200 absolute bottom-12 left-[50%] translate-x-[-50%]">เข้าสู่เว็บไซต์</div>
        </router-link>
    </div>
</template>

<style scoped>
.bg-welcome {
    background-image: url("@/assets/images/WelcomeBackground.svg");
    background-size: cover;
    background-position: center top;
    height: 100vh;
}
</style>