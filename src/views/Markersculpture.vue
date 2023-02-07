<script setup>
const getPath = (path) => {
	return new URL(`../assets/${path}`, import.meta.url).href;
};
</script>

<script>
import ARDropdown from '@/components/ARDropdown.vue';
var screenshot;
var localstream;

const getPath = (path) => {
	return new URL(`../assets/${path}`, import.meta.url).href;
};

let refreshModel = true;
let xradModel1 = 0;
let yradModel1 = 90;
let zradModel1 = 270;
let xradModel2 = 0;
let yradModel2 = 90;
let zradModel2 = 270;


export default {
  components: {ARDropdown},
  mounted (){
    var logoSource = getPath("images/watermark/logo0.png");
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
      // console.log("capture")
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

      var logoWidth = 170, logoHeight = 170;
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
    refresh()
    {
      if(refreshModel)
      {
        xradModel1 = 0;
        yradModel1 = 45;
        zradModel1 = 220;

        xradModel2 = 330;
        yradModel2 = 120;
        zradModel2 = 220;
        refreshModel = false;
      }
      else
      {        
        xradModel1 = 0;
        yradModel1 = 90;
        zradModel1 = 270;

        xradModel2 = 0;
        yradModel2 = 90;
        zradModel2 = 270;
        refreshModel = true;
      }
    },
    home(){
      window.close();
    }
  },
};
let marker_visible = { marker1: false, marker2: false ,marker3 : false};
      let mixer;//animation-mixer
      let clips;//animation that going to play


      

      AFRAME.registerComponent('do-rotation', {
        init: function() {
        this.el.addEventListener("model-loaded", evt => 
          {
            mixer = new THREE.AnimationMixer(this.el.components['gltf-model'].model);
            clips = this.el.components['gltf-model'].model.animations[0];
          })
          
        }
    })
      
// ----------------------------------------------------------------------------------------------------        
//    keep check each marker   
      AFRAME.registerComponent("check-marker-sculp", {
        init: function() {
          let el = this.el;
          var track = document.getElementById('tracker');
          el.addEventListener("markerFound", function() {
            marker_visible[el.id] = true;
            if(marker_visible["marker1"] || marker_visible["marker2"] || marker_visible["marker3"])
            {
              track.style.display = 'none';
            }
          });

          el.addEventListener("markerLost", function() {
            marker_visible[el.id] = false;
            if((!marker_visible["marker1"] && !marker_visible["marker2"]) && !marker_visible["marker3"])
            {
              track.style.display = 'block';
            }
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
          this.model3 = document.querySelector("#model3").object3D;
          this.camera = document.querySelector("#camera");
          

          },
          
//   main thing        
     tick: function(time, deltaTime) 
        {

          if(marker_visible["marker2"] && !marker_visible["marker3"]  )
              {
                  this.model2.visible = true;
                  this.model1.visible = false;
                  this.model3.visible = false;
                  this.model2.rotation.x = THREE.MathUtils.degToRad(xradModel2);
                  this.model2.rotation.y = THREE.MathUtils.degToRad(yradModel2);
                  this.model2.rotation.z = THREE.MathUtils.degToRad(zradModel2);
                  
              }
            else if(marker_visible["marker1"] && !marker_visible["marker3"] )
              {
                  this.model1.visible = true;
                  this.model2.visible = false;
                  this.model3.visible = false;
                  this.model1.rotation.x = THREE.MathUtils.degToRad(xradModel1);
                  this.model1.rotation.y = THREE.MathUtils.degToRad(yradModel1);
                  this.model1.rotation.z = THREE.MathUtils.degToRad(zradModel1);
              }
              else if(marker_visible["marker3"])
              {
                  this.model3.visible = true;
                  this.model1.visible = false;;
                  this.model2.visible = false;
                  if(mixer)
                  {
                    mixer.clipAction(clips).play();
                    mixer.update(deltaTime/1000) ;
                  }
              }



        
        } });

          
          
          
          
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
#pause {
  width: 100%;
  height: 100px;
  margin-top: 400px;
  opacity: 75%;
}
#tracker{
  width: 100%;
  height: 100px;
  margin-top: 200px;
  opacity: 75%;
}
</style>

<template>
<div class="landscape:hidden">
    <div class="z-10 absolute inset-x-0 top-0 grid grid-cols-2 justify-items-stretch py-3">
      <img id="logo" class="hidden"/>
      <div>
        <button type="button" class="py-2 px-2" @click="home()">
          <img src="@/assets/icons/back_to_home.svg" />
        </button>
      </div>
      <div class="grid grid-flow-row-dense grid-cols-2 gap-3">
        <div class="p-2 w-full border bg-[#57855E] text-white border-none rounded-md my-auto">
          <button @click="refresh">รีเฟรชตำแหน่ง</button>
        </div>
        <div class="p-2 justify-self-end">
          <a-r-dropdown/>
        </div>
      </div>
    </div>

    <div class=" bg-[#AFC2AC] bg-nav z-10 inset-x-0 bottom-0 flex justify-center" style="position: absolute">
      <button type="button" @click="capture()" class="scale-75">
        <img src="@/assets/icons/icon.camera.svg"/>
        <h1 class="text-center font-bold">ถ่ายภาพ</h1>
      </button>
    </div>
    <div id="tracker" class="flex h-screen justify-center items-center">
      <div id="tracker" class="text-center bg-[#AFC2AC]">
        <h1 class="text-3xl pt-5">กรุณาหันกล้องไปทางโลโก้</h1>
      </div>
    </div>
       
      <a-scene
        embedded
        vr-mode-ui="enabled: false;"
        loading-screen="enabled: false;"
        renderer="logarithmicDepthBuffer: true;"
        arjs="trackingMethod: best; sourceType: webcam; debugUIEnabled: false;detectionMode: mono_and_matrix; matrixCodeType: 3x3; sourceWidth:1024; sourceHeight:1024; displayWidth: 1024; displayHeight:1024;"
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
        rotation = "0 0 0" 
        :gltf-model="getPath('models/upDownSideCity2.glb')" ></a-entity> 
      </a-marker>
 
      <a-marker type="barcode" id="marker2" value="8" check-marker-sculp>
       <a-entity id = "model2" visible ="false" gesture-handler position = "-1 0 0" scale = "0.75 0.75 0.75 " rotation = "0 0 0" :gltf-model="getPath('models/upDownSideCity2.glb')" ></a-entity> 
      </a-marker>
      <a-marker type="barcode" id="marker3" value="24" check-marker-sculp>
       <a-entity id = "model3" visible ="false" gesture-handler position = "0 1.5 0" scale = "0.05 0.05 0.05 "  :gltf-model="getPath('models/auditorium.glb')" do-rotation></a-entity> 
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