<template>
  <div class="grid grid-rows-1 grid-flow-col gap-4">
    <!-- this is aorrow left -->
    <div class="row-start-1">
      <a href="https://www.google.com">
        <i class="fa-solid fa-chevron-left pt-3 pl-2 text-3xl"></i>
      </a>
    </div>
    <!-- buttom to report -->
    <div class="row-start-1 row-end-1 text-right">
      <a href="#">
        <i class="fa-solid fa-circle-exclamation text-3xl pt-4"></i>
      </a>
    </div>
  </div>
  <p class="text-right pb-2" style="color:#2A5E5C">รายงาน</p>

  <div>
    <label style="font-weight:bolder" class="pb-1 pl-10">รายงานปัญหา</label><br>
    <!-- take the photo -->
    <label class="pl-10">แนบรูปภาพ</label>
    <div class="grid grid-cols-3 grid-rows-1 gap-2">
      <label for="dropzone-file"
        class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
        <div class="flex flex-col items-center justify-center pt-5 pb-6">
          <svg aria-hidden="true" class="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor"
            viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
          </svg>
          <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or
            drag and drop</p>
          <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
        </div>
        <input id="dropzone-file" type="file" class="hidden" />
      </label>
      <!-- take the photo -->
      <label for="dropzone-file"
        class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
        <div class="flex flex-col items-center justify-center pt-5 pb-6">
          <svg aria-hidden="true" class="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor"
            viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
          </svg>
          <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or
            drag and drop</p>
          <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
        </div>
        <input id="dropzone-file" type="file" class="hidden" />
      </label>
      <!-- take the photo -->
      <label for="dropzone-file"
        class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
        <div class="flex flex-col items-center justify-center pt-5 pb-6">
          <svg aria-hidden="true" class="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor"
            viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
          </svg>
          <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or
            drag and drop</p>
          <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
        </div>
        <input id="dropzone-file" type="file" class="hidden" />
      </label>
    </div>

    <!-- dropdown problem -->
    <br><label class="pl-10">หมวดหมู่ปัญหา</label><br>
    <div class="text-center pl-10 pr-10">
      <select id="problem" class="w-full rounded" v-model="problem">
        <!-- ปัญหาต่างๆ -->
        <option v-for="problem in problems">{{ problem }}</option>
      </select>
    </div>

    <!-- location -->
    <br><label class="pl-10">ตำแหน่ง</label><br>
    <div class="text-center pl-10 pr-10">
      <input v-model="location" type="text" class="w-full rounded" placeholder="ตำแหน่งที่คุณ....">
    </div>

    <!-- explain the information -->
    <br><label class="pl-10">เพิ่มเติม</label><br>
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
  </div>


  <!-- this is aorrow down -->
  <div style="text-align:center" class="pt-10">
    <a href="../feedback">
      <i class="fa-solid fa-angle-down text-3xl"></i>
    </a>
  </div>

</template>

<script>
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
        if (this.problem !== '' && this.location != '' && this.information != '') {
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