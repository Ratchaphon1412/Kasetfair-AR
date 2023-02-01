<script>
var screenshot;
var localstream;

export default {
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
      canvas.getContext("2d").drawImage(imgData, 0, 0, width, height);
      screenshot = canvas.toDataURL("image/png");
    },
  },
};
</script>

<style>
a-scene {
  height: 100vh;
}
navbar-layout{
  z-index: 50;
}
</style>

<template>
      <div class="z-10 absolute left-0 top-0 " style="position: absolute">
        <button type="button" class="py-2 px-2">
            <img src= "../assets/icons/back_to_home.svg"/>
        </button>
      </div>

      <div class="z-10 inset-x-0 bottom-0 flex justify-center" style="position: absolute" id="button">
        <!--<button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" id="share_btn" @click="shareFile()">share</button>
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" id="save_btn" @click="saveFile()">save</button>-->
          <button type="button" @click="stopVideo()">
            <img src= "../assets/icons/icon.camera.svg"/>
            <h1 class="text-center pt-1 font-bold">ถ่ายภาพ</h1>
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
          <a-entity
            id="bowser-model"
            animation-mixer="loop: repeat"
            gltf-model="/models/Cow.gltf"
            class="clickable"
            gesture-handler
            rotation="-90 0 0"
            scale="1 1 1"
          ></a-entity>
        </a-marker>
        <a-entity camera></a-entity>
      </a-scene>
</template>