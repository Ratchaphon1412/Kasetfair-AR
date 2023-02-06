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

export default {
  mounted (){
    var logoSource = getPath("images/watermark/logo" + Math.floor( (Math.random() * 10) % 4) + ".png");
    const logo = document.getElementById('logo');
    logo.src += logoSource;
  },
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
let marker_visible = { marker1: false, marker2: false , marker3: false, marker4: false};
      let isShowed = false;//check if model show or not
      let spawn = false;//check if model spawn on camera 
      let scale = 0.01;

      

// ----------------------------------------------------------------------------------------------------        
//    keep check each marker   
      AFRAME.registerComponent("check-marker-premium", {
        init: function() {
          let el = this.el;
          var track = document.getElementById('tracker');
          el.addEventListener("markerFound", function() {
            track.style.display = 'none';
            marker_visible[el.id] = true;
          });

          el.addEventListener("markerLost", function() {
            track.style.display = 'block';
            marker_visible[el.id] = false;
            if(!marker_visible["marker2"] && !marker_visible["marker1"])
            {
              isShowed = false;
              scale = 0.01;
            }          
          });
          
        }
      });
// ----------------------------------------------------------------------------------------------------         



// ----------------------------------------------------------------------------------------------------  

//      compute model location / playAnimation  or not /phone rotation 
        AFRAME.registerComponent("spawn-team", {
          init: function() {
//        search for markers    
          this.el1 = document.querySelector("#marker1");
          this.el2 = document.querySelector("#marker2");
          
//        position of marker to compute model spawn position
          this.p1  = new THREE.Vector3(0,0,0);
          this.p2  = new THREE.Vector3(0,0,0);
           
//        make models spawn at vectorOrigin          
          this.model = document.querySelector("#model").object3D;
          this.leftModel = document.querySelector("#left-model").object3D;
          this.rightModel = document.querySelector("#right-model").object3D;
            

          },
          
//   main thing        
     tick: function(time, deltaTime) 
        {
// ***************************************************************************************************           



          
// *************************************************************************************************** 
//        compute position / rotation / newest material that should be   
          if( marker_visible["marker2"] || marker_visible["marker1"])
          {   
              if(marker_visible["marker1"] && marker_visible["marker2"])
                {
                  this.model.visible =true;
                  this.leftModel.visible = false;
                  this.rightModel.visible = false;
                }
             else 
               {
                    if(marker_visible["marker1"]) 
                    {
                      this.leftModel.visible = true;
                      this.rightModel.visible = false;
                      this.model.visible =false;
                    }
                    else if(marker_visible["marker2"]) 
                    {
                      this.leftModel.visible = false;
                      this.rightModel.visible = true;
                      this.model.visible =false;

                    }                 
  
                }
          


                if(!isShowed) {spawn = true; isShowed = true;}
                    
                }

// ***************************************************************************************************           
          
  
//  for model appear in camera to do something
          if(spawn )
            {
              
              scale += 0.001;
              this.model.scale.set(scale,scale,scale);
              this.leftModel.scale.set(scale,scale,scale);
              this.rightModel.scale.set(scale,scale,scale);
              if(scale >= 0.1)
                {
                  spawn = false; 
                }            
            }
          
//  for model to do something before disappear from camera       
          
          
          
          
          
        }});
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
#pause, #tracker{
  width: 100%;
  height: 100px;
  margin-top: 200px ;
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
        arjs="trackingMethod: best; sourceType: webcam; debugUIEnabled: false;detectionMode: mono_and_matrix; matrixCodeType: 3x3; sourceWidth:1024; sourceHeight:1024; displayWidth: 1024; displayHeight: 1024;"
        id="scene"
        gesture-detector
      >
      <a-marker type="barcode" id="marker1" value="14" check-marker-premium>
        <a-entity id = "left-model" visible = "false"  gesture-handler position ="2 0 0" rotation = "-45 0 0"  :gltf-model="getPath('models/Human_left_v2.glb')" ></a-entity>
      </a-marker>
    
      <a-marker type="barcode" id="marker2" value="8" check-marker-premium>
        <a-entity visible = "false" id = "right-model" gesture-handler position ="-1 0 0" rotation = "-45 0 0"  :gltf-model="getPath('models/Human_right_v2.glb')" ></a-entity>
        <a-entity visible = "false" id = "model" gesture-handler position ="-2 0 0" rotation = "-45 0 0"  :gltf-model="getPath('models/people_GLB_v2.glb')" ></a-entity>
      </a-marker>
                  
      <a-entity id = "camera" camera  ></a-entity>
      <a-entity spawn-team></a-entity>
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