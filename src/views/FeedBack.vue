<script setup lang="ts">
import { ref } from "vue";
import vue3starRatings from "vue3-star-ratings";
import NavbarLayout from "../components/NavbarLayout.vue"
import axios, { AxiosError } from "axios";

interface FeedBackFormData {
    scoreEvent: number;
    scoreApp: number;
    moreDetail: string;
}

const sendtosheet = ref<FeedBackFormData>({
    scoreEvent: 0,
    scoreApp: 0,
    moreDetail: ""
});

const confirm = async () => {
    if (sendtosheet.value.scoreEvent !== 0 && sendtosheet.value.scoreApp !== 0) {
        if(sendtosheet.value.moreDetail === ''){
            sendtosheet.value.moreDetail = 'ไม่ได้ใส้ข้อความเข้ามา'
        }
        await axios.get('https://script.google.com/macros/s/AKfycbzqgx7l8_bQTLt0YS8dkm_vbVevCGAdV0FmkLGgq0yzYd-5oQld5kfHhsddXP-UelH5/exec', {
            params: {
                scoreEvent: sendtosheet.value.scoreEvent,
                scoreApp: sendtosheet.value.scoreApp,
                moreDetail: sendtosheet.value.moreDetail
            }
        }).catch((err: AxiosError) => {
            // alert("ไม่สามารถส่งข้อมูลได้ กรุณาลองใหม่");
            console.log(err);
        })
        window.location.reload()
    } else {
        alert("กรุณาใส่ข้อมูลให้ครบถ้วน")
    }
}
</script>

<template>
    <navbar-layout :showAnnouce="true">
        <!-- this is aorrow up -->
        <br/>
        <!-- <router-link :to="{ name: 'form' }">
            <img src="@/assets/images/aorrow-up.png" width="45" height="60" style="margin:auto"/>
        </router-link><br/> -->

        <div class="flex justify-center">
		<router-link :to="{ name : 'form'}">
  			<button class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l-lg">
    			รายงาน
  			</button>
		</router-link>
		<router-link :to="{ name : 'feedback'}">
  			<button class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r-lg">
    			ประเมิน
  			</button>
		</router-link>
	    </div>

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
    </navbar-layout>
</template>