<script setup lang="ts">
import NavbarLayout from "@/components/NavbarLayout.vue"
import axios, { AxiosError } from "axios";
import { ref } from "vue";

const problem = ref<string>('');
const location = ref<string>('');
const information = ref<string>('');
const problemList = ref<string[]>(['ทางจราจร', 'ของหาย', 'จุดอันตราย', 'อื่น']);

const confirm = async () => {
	if (problem.value !== '' && location.value !== '') {
		if(information.value === ''){
			information.value = 'ไม่ได้ใส่ข้อความเข้ามา'
		}

		await axios.get('https://script.google.com/macros/s/AKfycbx2qxF4VMjgROQTEZZfWGAma_tZWrc5-ikuZI7bPV2rQDoe9bEBdABCyvFDq88WOGHsXg/exec',{
			params:{
			problem: problem.value,
			location: location.value,
			information: information.value
			}
		}).catch((err: AxiosError) =>{
			console.log(err);
		})
		alert("ใส่ข้อมูลครบทวนแล้ว ขอบคุณสำหรับการแจ้งเตือน")
		window.location.reload()
	}else{
		alert("กรุณาใส่ให้ครบ")
	}
}
</script>

<template>
<navbar-layout :show-annouce="true">
	<br/>
	<!-- <div class="grid grid-rows-1 grid-flow-col gap-4">
		
		<div class="row-start-1">
		<router-link :to="{ name: 'home' }">
			<img src="@/assets/images/aorrow-left.png" width="45" height="60"/>
		</router-link>
		</div>
		
		<div class="row-start-1 row-end-1">
			<img src="@/assets/images/warming.png" width="60" height="80" style="float: right;"/>
		</div>

	</div> -->

	<!-- <p class="text-right pr-1" style="color:#2A5E5C">รายงาน</p> -->
	
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

		<label style="font-weight:bolder" class="pl-10">รายงานปัญหา</label>
		
		<!-- dropdown problem -->
		<br><label class="pl-10">หมวดหมู่ปัญหา </label>
		<label style="color: red;">*</label><br>
		<div class="text-center pl-10 pr-10">
		<select id="problem" class="w-full rounded" v-model="problem">
			<!-- ปัญหาต่างๆ -->
			<option v-for="problem in problemList">{{ problem }}</option>
		</select>
		</div>

		<!-- location -->
		<label class="pl-10">ตำแหน่ง </label>
		<label style="color: red;">*</label><br>
		<div class="text-center pl-10 pr-10">
		<input v-model="location" type="text" class="w-full rounded" placeholder="ตำแหน่งที่คุณ....">
		</div>

		<!-- explain the information -->
		<label class="pl-10">เพิ่มเติม </label><br>
		<div class="text-center pl-10 pr-10">
		<textarea v-model="information" rows="4" cols="50" class="w-full rounded"
			placeholder="คำอธิบายเกี่ยวกับเเหตุการณ์นั้น....."></textarea>
		</div>
		<!-- button confirm -->
		<div class="text-center pl-10 pr-10"><br>
		<button type="button" @click="confirm"
			class="text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 w-full"
			style="background-color:#57855E">ยืนยัน</button>
		</div>
		<br/>
	<!-- this is aorrow down -->
	<!-- <div class="text-center">
		<i style="text-align: center; color:gray">กด ลูกศร ด้านล่างเพื่อ ประเมินแอพพลิเคชั่น </i>
		<br><br>
		<router-link :to="{ name: 'feedback'}">
			<img src="../assets/images/aorrow-down.png" width="45" height="60" style="margin:auto">
		</router-link>
	</div> -->
</navbar-layout>
</template>

<!-- <script>
import NavbarLayout from "../components/NavbarLayout.vue"
import axios from "axios";

export default {
data() {
	return {
	problem: '',
	location: '',
	information: '',
	problems: ['ทางจราจร', 'ของหาย', 'จุดอันตราย', 'อื่น']
	}
},
methods: {
	confirm(){
		if (this.problem !== '' && this.location !== '') {
		if(this.information === ''){
			this.information = 'ไม่ได้ใส่ข้อความเข้ามา'
		}
		axios.get('https://script.google.com/macros/s/AKfycbx2qxF4VMjgROQTEZZfWGAma_tZWrc5-ikuZI7bPV2rQDoe9bEBdABCyvFDq88WOGHsXg/exec',{
			params:{
			problem: this.problem,
			location: this.location,
			information: this.information
			}
		})
		alert("ใส่ครบหมดทุกอย่างแล้ว")
		window.location.reload()
		}else{
		alert("กรุณาใส่ให้ครบ")
		}
		
	}
},
components:{
	NavbarLayout
}
}
</script> -->
