<script>
import ARDropdown from '@/components/ARDropdown.vue';
var screenshot;
var localstream;

export default {
  components: {ARDropdown},
  methods: {
    stopVideo() {
      const vid = document.getElementsByTagName("video")[0];
      const mediaStream = vid.srcObject;
      const tracks = mediaStream.getTracks();
      tracks[0].stop();
      tracks.forEach(track => track.stop())
    },
    capture() {
      // document.querySelector("video").pause();
      console.log("capture")
      const video = document.getElementsByTagName("video")[0];
      const canvas = document.createElement("canvas");
      const logo = document.getElementById("logo");

      var width = video.videoWidth,
        height = video.videoHeight;
      canvas.width = width;
      canvas.height = height;

      // วาด video กับโมเดล AR ที่ขึ้นบนจอ ลงบน canvas เปล่าๆ
      // var screenshot;
      // canvas.getContext("2d").drawImage(logo, 0, 0, 809, 750);
      canvas.getContext("2d").drawImage(video, 0, 0, width, height);
      var imgData = document
        .querySelector("a-scene")
        .components.screenshot.getCanvas("perspective");
      canvas.getContext("2d").drawImage(imgData, 0, 0, width +200, height);
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
    <div class="z-10 absolute inset-x-0 top-0 grid grid-cols-2 justify-items-stretch py-7">
      <img src="../assets/images/frames/ar2.png" class="hidden" id="logo" width="0" height="0">
      <div>
        <button type="button" class="py-2 px-2" @click="home()">
          <img src="../assets/icons/back_to_home.svg" />
        </button>
      </div>
      <div class="p-2 justify-self-end">
        <a-r-dropdown/>
      </div>
    </div>

    <div class=" bg-[#AFC2AC] bg-nav z-10 inset-x-0 bottom-0 flex justify-center" style="position: absolute">
      <button type="button" @click="capture()" class="scale-75">
        <img src="../assets/icons/icon.camera.svg"/>
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
          url="/80logo/finallogo_v2.patt"
          raycaster="objects: .clickable"
          emitevents="true"
          cursor="fuse: false; rayOrigin: mouse;"
        >
        <!--นาคแดง-->
          <a-entity
            id="red-nak"
            gltf-model="/models/chess_pieces/red_nakv2.gltf"
            class="clickable"
            gesture-handler
            position="0 0 -1.6"
            rotation="-115 -30 0"
            scale="0.9 0.9 0.9"
          ></a-entity>
        <!--ขุนแดง-->
          <a-entity
            id="red-khun"
            gltf-model="/models/chess_pieces/red_khun.gltf"
            class="clickable"
            gesture-handler
            position="1.9 0 0.7"
            rotation="-100 0 30"
            scale="0.9 0.9 0.9"
          ></a-entity>
        <!--เบี้ยแดง-->
        <a-entity
            id="red-chib"
            gltf-model="/models/chess_pieces/red_chib.gltf"
            class="clickable"
            gesture-handler
            position="-1.5 0 1.3"
            rotation="-90 -60 0"
            scale="0.9 0.9 0.9"
          ></a-entity>
        <!--ม้าขาว-->
        <a-entity
            id="white_horse"
            gltf-model="/models/chess_pieces/white_horse_v2.gltf"
            class="clickable"
            gesture-handler
            position="0.2 0 2"
            rotation="-111 90 -100"
            scale="0.9 0.9 0.9"
          ></a-entity>
        <!--เรือขาว-->
        <a-entity
            id="white_ship"
            gltf-model="/models/chess_pieces/white_ship.gltf"
            class="clickable"
            gesture-handler
            position="-1.2 0 -0.6"
            rotation="-30 0 30"
            scale="0.9 0.9 0.9"
          ></a-entity>

        </a-marker>
        <a-entity camera></a-entity>
      </a-scene>
</div>
<div class="portrait:hidden">

    <div class="flex h-screen justify-center items-center">
    <div id ="pause" class="text-center bg-[#AFC2AC]"> 
        <h1 class=" text-3xl">กรุณาใช้มือถือในแนวตั้ง</h1>
        <h1 class=" text-3xl">Please use your phone in portrait mode</h1>
    </div>
  </div>
  
</div>
</template>