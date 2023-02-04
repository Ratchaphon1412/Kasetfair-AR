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
      canvas.getContext("2d").drawImage(imgData, -100, 0, width +200, height);
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
let marker_visible = { marker1: false, marker2: false };
      let scale = 5;
      let isShowed = false;
      let countdown = 3;
      let avgDistance = 0;
      
// ----------------------------------------------------------------------------------------------------        
//    keep check each marker   
      AFRAME.registerComponent("check-marker-sculp", {
        init: function() {
          let el = this.el;
          el.addEventListener("markerFound", function() {
            marker_visible[el.id] = true;
          });

          el.addEventListener("markerLost", function() {
            console.log("Lost");
            marker_visible[el.id] = false;
          });
          
        }
      });
      
        AFRAME.registerComponent("spawn-virtual", {
          init: function() {
//        search for markers    
          this.el1 = document.querySelector("#marker1");
          this.el2 = document.querySelector("#marker2");
          
//        position of marker to compute model spawn position
          this.p1  = new THREE.Vector3(0,0,0);
          this.p2 = new THREE.Vector3(0,0,0);
          this.cameraPosition  = new THREE.Vector3(0,0,0);
           
//        make models spawn at vectorOrigin          
          this.model1 = document.querySelector("#model1").object3D;
          this.model2 = document.querySelector("#model2").object3D;
          this.camera = document.querySelector("#camera");
          

          },
          
//   main thing        
     tick: function(time, deltaTime) 
        {

            if(marker_visible["marker2"] && countdown % 3 == 0)
              {
                  this.model2.visible = true;
                  this.model1.visible = false;
                  isShowed = true;
              }
            else if(marker_visible["marker1"] && countdown % 3 == 0)
              {
                  this.model1.visible = true;
                  this.model2.visible = false;
                  isShowed = true;
              }
        
        } });


//******************************************************************          
          
          
          
          
          
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
      <img src="@/assets/images/frames/ar2.png" class="hidden" id="logo" width="0" height="0">
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
        arjs="trackingMethod: best; sourceType: webcam; debugUIEnabled: false;detectionMode: mono_and_matrix; matrixCodeType: 3x3"
        id="scene"
        gesture-detector
      >
      <a-marker type="barcode" id="marker1" value="14" check-marker-sculp>
      <a-entity 
        id = "model1" 
        visible ="false" 
        gesture-handler 
        position = "1 0 0" 
        scale = "0.75 0.75 0.75" 
        rotation = "0 90 270" 
        gltf-model="https://cdn.glitch.global/3aef7b54-ea23-46e6-9d89-ddf520796843/upDownSideCity2.glb?v=1675404942814" ></a-entity> 
      </a-marker>
 
      <a-marker type="barcode" id="marker2" value="8" check-marker-sculp>
       <a-entity id = "model2" visible ="false" gesture-handler position = "-1 0 0" scale = "0.75 0.75 0.75 " rotation = "0 90 270 " gltf-model="https://cdn.glitch.global/3aef7b54-ea23-46e6-9d89-ddf520796843/upDownSideCity2.glb?v=1675404942814" ></a-entity> 
      </a-marker>
         
      <a-marker type="barcode" id="marker3" value="24" check-marker-sculp>
       <a-entity id = "model3" visible ="false" gesture-handler position = "-1 0 0" scale = "0.75 0.75 0.75 " rotation = "0 90 270 " gltf-model="https://cdn.glitch.global/3aef7b54-ea23-46e6-9d89-ddf520796843/upDownSideCity2.glb?v=1675404942814" ></a-entity> 
      </a-marker>

       <a-entity  spawn-virtual></a-entity> 

                  
      <a-entity id = "camera" camera  ></a-entity>


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