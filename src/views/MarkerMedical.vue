<script setup>
const getPath = (path) => {
	return new URL(`../assets/${path}`, import.meta.url).href;
};
</script>

<script>
import ARDropdown from '@/components/ARDropdown.vue';
var screenshot;
var localstream;

export default {
  components: {ARDropdown},
  mounted (){
    var logoSource = getPath("images/watermark/logo" + Math.floor( (Math.random() * 10) % 4) + ".png");
    const logo = document.getElementById('logo');
    logo.src += logoSource;
  },
  methods: {
    stopVideo() {
      const vid = document.getElementsByTagName("video")[0];
      const mediaStream = vid.srcObject;
      const tracks = mediaStream.getTracks();
      tracks[0].stop();
      tracks.forEach(track => track.stop())
    },
    saveFile() {
      this.capture();
      // โหลดไฟล์ภาพ
      var link = document.createElement("a");
      link.download = "screenshot.png";
      link.href = screenshot;
      link.click();

      //console.log("Capture Complete !");
    },
    async shareFile() {
      // แชร์ไฟล์ภาพ
      this.capture();
      const blob = await (await fetch(screenshot)).blob();
      const filesArray = [
        new File([blob], "bla.png", {
          type: blob.type,
          lastModified: new Date().getTime(),
        }),
      ];
      const shareData = { files: filesArray };

      // เช็คก่อนว่า browser ที่ใช้อยู่แชร์ได้มั้ย
      if (navigator.canShare && navigator.canShare(shareData)) {
        try {
          navigator.share(shareData);
        } catch (err) {
          console.error(err.name + " " + err.message);
        }
      } else console.warn("Sharing not supported", shareData);
    },
    capture() {
      // document.querySelector("video").pause();
      console.log("capture")
      const video = document.getElementsByTagName("video")[0];
      const canvas = document.createElement("canvas");
      const logo = document.getElementById('logo');

      var width = video.videoWidth,
        height = video.videoHeight;
      canvas.width = width;
      canvas.height = height;

      // วาด video กับโมเดล AR ที่ขึ้นบนจอ ลงบน canvas เปล่าๆ
      // var screenshot;
      canvas.getContext("2d").drawImage(video, 0, 0, width, height);
      var imgData = document
      .querySelector("a-scene")
      .components.screenshot.getCanvas("perspective");
      canvas.getContext("2d").drawImage(imgData, -200, 0, width +300, height);

      var logoWidth = 106, logoHeight = 173;
      var scaleLogo = 30;
      canvas.getContext("2d").drawImage(logo,
      width - (logoWidth - scaleLogo) - (logoWidth - scaleLogo) / 2,
      height - (logoHeight - scaleLogo) - (logoHeight - scaleLogo) / 4,
      logoWidth - scaleLogo,
      logoHeight - scaleLogo);
      screenshot = canvas.toDataURL("image/png");
      localStorage.setItem('screenshot', screenshot);
      this.stopVideo();
       this.$router.push({ path: "share", params: { screenshot }}).then(() => { this.$router.go() })
    },
    home(){
      window.close();
    }
  },
};
</script>

<style>
a-scene {
  height: 100vh;
}
body{
  overflow: hidden;
}
video{
  margin-left: 0px !important;
  object-fit: cover;
}
#pause{
  width: 100%;
  height: 100px;
  margin-top: 200px ;
  opacity: 75%;
}
</style>

<template>
<div class="landscape:hidden">
    <div class="z-10 absolute inset-x-0 top-0 grid grid-cols-2 justify-items-stretch py-3">
      <img id="logo" src=".." class="hidden"/>
      <div>
        <button type="button" class="py-2 px-2" @click="home()">
          <img src="@/assets/icons/back_to_home.svg" />
        </button>
      </div>
      <div class="p-2 justify-self-end">
        <a-r-dropdown/>
      </div>
    </div>

    <div class=" bg-[#AFC2AC] bg-nav z-10 inset-x-0 bottom-0 flex justify-center" style="position: absolute">
      <button type="button" @click="capture()" class="scale-75">
        <img src="@/assets/icons/icon.camera.svg"/>
        <h1 class="text-center font-bold">ถ่ายภาพ</h1>
      </button>
    </div>
       
      <a-scene
        embedded
        vr-mode-ui="enabled: false;"
        loading-screen="enabled: false;"
        renderer="logarithmicDepthBuffer: true;"
        arjs="trackingMethod: best; sourceType: webcam; debugUIEnabled: false;"
        id="scene"
        gesture-detector
      >
        <a-marker
          id="animated-marker"
          type="pattern"
          preset="custom"
          :url="getPath('80logo/finallogo_v2.patt')"
          raycaster="objects: .clickable"
          emitevents="true"
          cursor="fuse: false; rayOrigin: mouse;"
        >
          <a-entity
            id="med-model"
            :gltf-model="getPath('models/MedBuildingsv3.gltf')"
            class="clickable"
            gesture-handler
            position="0 0 -1.5"
            rotation="90 0 -180"
            scale="0.01 0.01 0.01"
          ></a-entity>
        </a-marker>
        <a-entity camera></a-entity>
      </a-scene>
</div>
<div class="portrait:hidden">
  <!--
  <div class="z-10 absolute inset-0 flex h-screen">
    <h1>PAUSE SCREEN 123456789</h1>
  </div>
  -->

    <div class="flex h-screen justify-center items-center">
    <div id ="pause" class="text-center bg-[#AFC2AC]"> <!-- ⬅️ THIS DIV WILL BE CENTERED -->
        <h1 class=" text-3xl">กรุณาใช้มือถือในแนวตั้ง</h1>
        <h1 class=" text-3xl">Please use your phone in portrait mode</h1>
    </div>
  </div>
  
</div>
</template>