<template>
    <!-- this is aorrow up -->
    <div style="text-align:center" class="pl-3">
        <a href="../form">
            <i class="fa-solid fa-chevron-up text-3xl"></i>
        </a>
    </div>


    <label style="font-weight:bolder" class="pb-1 pl-10">รายงานปัญหา</label><br>
    
    <label class="pl-10">แนบรูปภาพ </label>
    <label style="color: red;">*</label>

    <!-- pick picture -->
    <div class="pl-10 pr-10">
    <label for="dropzone-file"
        class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
        <div class="flex flex-col items-center justify-center pt-5 pb-6">
            <svg aria-hidden="true" class="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor"
                viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12">
                </path>
            </svg>
            <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to
                    upload</span> or
                drag and drop</p>
            <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
        </div>
        <input id="dropzone-file" type="file" class="hidden" />
    </label>
    </div>

    <!-- score event -->
    <br><label class="pl-10">ให้คะแนนการจัดงานเกษตรแฟร์ </label>
    <label style="color: red;">*</label><br>
    <i class="pl-10" style="color:gray">เพิ่มเติม ปุ่มทางซ้ายเป็น ลด 0.5 และ ทางขวา เพิ่ม 0.5</i>

    <vue3starRatings v-model="sendtosheet.scoreEvent" starSize="50" controlSize="30" controlBg="#ffffff"
        controlColor="#000000" starColor="#57855E" />

    <!-- score application -->
    <br><label class="pl-10">ให้คะแนนแอพพลิเคชั่น </label>
    <label style="color: red;">*</label><br>
    <i class="pl-10" style="color:gray">เพิ่มเติม ปุ่มทางซ้ายเป็น ลด 0.5 และ ทางขวา เพิ่ม 0.5</i>

    <vue3starRatings v-model="sendtosheet.scoreApp" starSize="50" controlSize="30" controlBg="#ffffff"
        controlColor="#000000" starColor="#57855E" />

    <!-- add more detail -->
    <br><label class="pl-10">ข้อเสนอแนะเพิ่ม </label>
    <label style="color: red;">*</label><br>
    <div class="text-center pl-10 pr-10">
        <textarea v-model="sendtosheet.moreDetail" rows="4" cols="50" class="w-full rounded"
            placeholder="ข้อควรปรับปรุง หรือ เพิ่มเนื้อหา...."></textarea>
    </div>

    <!-- button confirm -->
    <div class="text-center pl-10 pr-10"><br>
        <button type="button" @click="confirm"
            class="text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 w-full"
            style="background-color:#57855E">ยืนยัน</button>
    </div><br>

</template>

<script>
import { defineComponent } from "vue";
import vue3starRatings from "vue3-star-ratings";
import axios from "axios";

export default {
    data() {
        return {
            sendtosheet: {
                scoreEvent: 0,
                scoreApp: 0,
                moreDetail: ''
            }
        };
    },
    methods: {
        confirm() {
            if (this.sendtosheet.moreDetail !== '' && this.sendtosheet.scoreEvent !== 0 && this.sendtosheet.scoreApp !== 0) {
                axios.get('https://script.google.com/macros/s/AKfycbzqgx7l8_bQTLt0YS8dkm_vbVevCGAdV0FmkLGgq0yzYd-5oQld5kfHhsddXP-UelH5/exec', {
                    params: {
                        scoreEvent: this.sendtosheet.scoreEvent,
                        scoreApp: this.sendtosheet.scoreApp,
                        moreDetail: this.sendtosheet.moreDetail
                    }
                })
                alert("ใส่ข้อมูลครบทวนแล้ว")
                window.location.reload()
            } else {
                alert("กรุณาใส่ให้ครบ")
            }
        }
    },
    components: {
        vue3starRatings,
    }
}
</script>
<style lang="">
    
</style>