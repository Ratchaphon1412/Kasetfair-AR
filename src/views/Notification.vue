<script setup lang="ts">
import Navbar from '@/components/Navbar.vue';
import NotifyList from '@/components/NotifyList.vue';
import {reactive} from 'vue'
const notifies = reactive([
                {id:1, text:'เด็กชายติหลงทางผู้ปกครองมารับได้ที่ส่วนประชาสัมพันธ์', author: 'ไอโฟน 21 สีทอง'},
                {id:2, text:'เด็กชายติหลงทางผู้ปกครองมารับได้ที่ส่วนประชาสัมพันธ์', author: 'นกกก'},
                {id:3, text:'เด็กชายติหลงทางผู้ปกครองมารับได้ที่ส่วนประชาสัมพันธ์', author: 'ไอโฟน 21 สีทอง'},
            ])

</script>

<template>
    <div>
        <div class=" min-h-screen pl-3">
            <div class="font-bold pt-5">การแจ้งเตือน</div>
            <div>
                <h2 class="font-semibold pt-10 pb-5">วันนี้</h2>
                <div class=" divide-y divide-[#BFBFBF]">
                    <NotifyList
                    v-for="notify in notifies"
                    :key="notify.id"
                    :text="notify.text"
                    :author="notify.author"
                    ></NotifyList>
                </div>

            </div>
            <div>
                <h2 class="font-semibold pt-10 pb-5">เก่ากว่า</h2>
                    <div class=" divide-y divide-[#BFBFBF]">
                    <NotifyList
                    v-for="notify in notifies"
                    :key="notify.id"
                    :text="notify.text"
                    :author="notify.author"
                    ></NotifyList>
                </div>
            </div>
        </div>
        <Navbar />
    </div>
</template>