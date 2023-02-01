<template>
  <div class="grid grid-rows-1 grid-flow-col gap-4">
    <!-- this is aorrow left -->
    <div class="row-start-1 pl-3">
      <a href="../home">
        <i class="fa-solid fa-chevron-left pt-3 pl-2 text-3xl"></i>
      </a>
    </div>
    <!-- buttom to report -->
    <div class="row-start-1 row-end-1 text-right pr-2">
      <i class="fa-solid fa-circle-exclamation text-3xl pt-4"></i>
    </div>
  </div>
  
  <p class="text-right pb-2 pr-1" style="color:#2A5E5C">รายงาน</p>

    <label style="font-weight:bolder" class="pb-1 pl-10">รายงานปัญหา</label><br>
    
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
    <br><label class="pl-10">ตำแหน่ง </label>
    <label style="color: red;">*</label><br>
    <div class="text-center pl-10 pr-10">
      <input v-model="location" type="text" class="w-full rounded" placeholder="ตำแหน่งที่คุณ....">
    </div>

    <!-- explain the information -->
    <br><label class="pl-10">เพิ่มเติม </label>
    <label style="color: red;">*</label><br>
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


  <!-- this is aorrow down -->
  <div style="text-align:center" class="pt-10">
    <a href="../feedback">
      <i class="fa-solid fa-angle-down text-3xl"></i>
    </a>
  </div>

</template>

<script>
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
        if (this.problem !== '' && this.location !== '' && this.information !== '') {
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
  }
}
</script>
<style scoped>

</style>