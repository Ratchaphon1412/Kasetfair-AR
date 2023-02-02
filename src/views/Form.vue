<template>
  <br/>
  <div class="grid grid-rows-1 grid-flow-col gap-4">
    <!-- this is aorrow left -->
    <div class="row-start-1">
      <a href="../timepod/home">
        <img src="../assets/images/aorrow-left.png" width="45" height="60"/>
      </a>
    </div>
    <!-- buttom to report -->
    <div class="row-start-1 row-end-1">
        <img src="../assets/images/warming.png" width="60" height="80" style="float: right;"/>
    </div>
  </div>
  
  <p class="text-right pr-1" style="color:#2A5E5C">รายงาน</p>

    <label style="font-weight:bolder" class="pl-10">รายงานปัญหา</label>
    
    <!-- dropdown problem -->
    <br><label class="pl-10">หมวดหมู่ปัญหา </label>
    <label style="color: red;">*</label><br>
    <div class="text-center pl-10 pr-10">
      <select id="problem" class="w-full rounded" v-model="problem">
        <!-- ปัญหาต่างๆ -->
        <option v-for="problem in problems">{{ problem }}</option>
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
  <div>
    <a href="../timepod/feedback">
      <img src="../assets/images/aorrow-down.png" width="45" height="60" style="margin:auto">
    </a>
  </div>

  <NavbarLayout/>
</template>

<script>
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
</script>
<style scoped>

</style>