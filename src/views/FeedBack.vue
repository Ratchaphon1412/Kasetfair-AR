<template>
    <!-- this is aorrow up -->
    <br/>
    <a href="../timepod/form">
        <img src="../assets/images/aorrow-up.png" width="45" height="60" style="margin:auto"/>
    </a><br/>


    <label style="font-weight:bolder" class="pb-1 pl-10">ประเมินแอพพลิเคชั่น</label><br/>

    <!-- score event -->
    <label class="pl-10">ให้คะแนนการจัดงานเกษตรแฟร์ </label>
    <label style="color: red;">*</label><br>
    <i class="pl-10" style="color:gray">ทางซ้ายเป็น ลด 0.5 และ ทางขวา เพิ่ม 0.5</i>

    <vue3starRatings v-model="sendtosheet.scoreEvent" starSize="45" controlSize="30" controlBg="#ffffff"
        controlColor="#000000" starColor="#57855E" />

    <!-- score application -->
    <label class="pl-10">ให้คะแนนแอพพลิเคชั่น </label>
    <label style="color: red;">*</label><br>
    <i class="pl-10" style="color:gray">ทางซ้ายเป็น ลด 0.5 และ ทางขวา เพิ่ม 0.5</i>

    <vue3starRatings v-model="sendtosheet.scoreApp" starSize="45" controlSize="30" controlBg="#ffffff"
        controlColor="#000000" starColor="#57855E" />

    <!-- add more detail -->
    <label class="pl-10">ข้อเสนอแนะเพิ่ม </label><br>
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
    <NavbarLayout/>
</template>

<script>
import { defineComponent } from "vue";
import vue3starRatings from "vue3-star-ratings";
import NavbarLayout from "../components/NavbarLayout.vue"
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
            if (this.sendtosheet.scoreEvent !== 0 && this.sendtosheet.scoreApp !== 0) {
                if(this.sendtosheet.moreDetail === ''){
                    this.sendtosheet.moreDetail = 'ไม่ได้ใส้ข้อความเข้ามา'
                }
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
        NavbarLayout
    }
}
</script>
<style>

</style>