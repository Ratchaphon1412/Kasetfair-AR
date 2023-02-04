<script setup>

import { defineComponent } from 'vue';
import ShareNavbarLayout from '@/components/ShareNavbarLayout.vue';
import NavbarButton from '@/components/NavbarButton.vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const screenshot = localStorage.getItem('screenshot');
console.log(screenshot);
function saveFile() {
  // โหลดไฟล์ภาพ
  var link = document.createElement("a");
  link.download = "screenshot.png";
  link.href = screenshot;
  link.click();

  console.log("Capture Complete !");
}
async function shareFile() {
  //แชร์ไฟล์ภาพ
  const blob = await (await fetch(screenshot)).blob();
  const filesArray = [
    new File([blob], "bla.png", {
      type: blob.type,
      lastModified: new Date().getTime(),
    }),
  ];
  const shareData = { files: filesArray };

  //เช็คก่อนว่า browser ที่ใช้อยู่แชร์ได้มั้ย
  if (navigator.canShare && navigator.canShare(shareData)) {
    try {
      navigator.share(shareData);
    } catch (err) {
      console.error(err.name + " " + err.message);
    }
  } else console.warn("Sharing not supported", shareData);
}
</script>


<template>
    <!-- <div class="vue-scrollbar__area vue-scrollbar-transition" > -->

  <div class="flex justify-between pl-2 pt-2">
    <div
      class="
        z-10
        absolute
        inset-x-0
        top-0
        grid grid-cols-2
        justify-items-stretch
        py-3
      "
    >
      <div class="flex px-3">
        <NavbarButton
          icon ="back_to_home.svg"
          size=""
          link-page="ar0"
          />
      </div>
      <div class="p-2 justify-self-end">
        <a-r-dropdown />
      </div>
    </div>

    <div
      class="bg-[#AFC2AC] bg-nav z-10 inset-x-0 bottom-0 flex justify-center"
      style="position: absolute"
    >
      <div class="grid grid-cols-3 gap-10">
        <router-link :to="{ name: 'ar' }">
          <button type="button" class="scale-75">
            <img src="../assets/icons/ARselect_icon.svg" />
          <h1 class="text-center font-bold">ลอง AR อื่นๆ</h1>
        </button>
        </router-link>
        <button type="button" @click="saveFile()" class="scale-75">
          <img src="../assets/icons/save_icon.svg" />
          <h1 class="text-center font-bold">บันทึก</h1>
        </button>
        <button type="button" @click="shareFile()" class="scale-75">
          <img src="../assets/icons/share_icon.svg" />
          <h1 class="text-center font-bold">แชร์</h1>
        </button>
      </div>
    </div>
  </div>

  <div class="d-flex justify-content-center align-items-center h-100" style="height: 68vh; overflow: scroll;">
  <!-- <div class="vue-scrollbar__area vue-scrollbar-transition" style=" margin-left: 0px;" > -->
    <img id="image1" :src="screenshot" />
  </div>
</template>

<style>
#image1 {
  display: block;
  margin-top: 2em;
  margin-left: auto;
  margin-right: auto;
  height: 20em;
  border-radius: 30px;
  border-color: black;
}
</style>