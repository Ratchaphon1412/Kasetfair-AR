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
    home(){
      window.close();
    }
  },
};
    let marker_visible = { marker1: false, marker2: false };

// ----------------------------------------------------------------------------------------------------        
//    keep check each marker   
      AFRAME.registerComponent("check-marker-medi", {
        init: function() {
          let el = this.el;
          var track = document.getElementById('tracker');
          el.addEventListener("markerFound", function() {
            track.style.display = 'none';
            marker_visible[el.id] = true;
          });

          el.addEventListener("markerLost", function() {
            marker_visible[el.id] = false;      
            if(!marker_visible["marker1"] &&  !marker_visible["marker2"])
            {
              track.style.display = 'block';
            }
          });
          
        }
      });
// ----------------------------------------------------------------------------------------------------         



// ----------------------------------------------------------------------------------------------------  

//      compute model location / playAnimation  or not /phone rotation 
        AFRAME.registerComponent("spawn-building", {
          init: function() {
//        search for markers    
          this.el1 = document.querySelector("#marker1");
          this.el2 = document.querySelector("#marker2");
          

          this.p1  = new THREE.Vector3(0,0,0);
          this.p2 = new THREE.Vector3(0,0,0);
//        make models spawn at vectorOrigin          
          this.model = document.querySelector("#model").object3D;
          // this.model2 = document.querySelector("#model2").object3D;


          },
          
//   main thing        
     tick: function() 
        {
          if(marker_visible["marker1"] || marker_visible["marker2"])
          {
          
          if(marker_visible["marker1"] && marker_visible["marker2"])
          {
            this.el1.object3D.getWorldPosition(this.p1);
            this.el2.object3D.getWorldPosition(this.p2);

            this.model.position.x = ((this.p1.x + this.p2.x) / 2 );
            this.model.position.y = ((this.p1.y + this.p2.y) / 2 ) - 1;
            this.model.position.z = ((this.p1.z + this.p2.z) / 2 ) - 10;
            
            this.model.visible = true;
          }
          // else
          // {
          //   if( marker_visible["marker1"])
          //   {
          //     this.el1.object3D.getWorldPosition(this.p1);
          //   }
          //   else if(marker_visible["marker2"] )
          //   {
          //     this.el2.object3D.getWorldPosition(this.p1);
          //   }
            
          //   this.model.position.x = this.p1.x;
          //   this.model.position.y = this.p1.y;
          //   this.model.position.z = this.p1.z;
          //   this.model.visible = true;

          // }
        }
        else 
        {
          this.model.visible = false;
        }
        

          
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
      <a-entity visible = "false" id = "model"  gesture-handler position ="0 0 0" scale ="0.025 0.025 0.025" rotation = "0 0 0"  :gltf-model="getPath('models/hospital_bulding.glb')" ></a-entity>

      <a-marker type="barcode" id="marker1" value="14" check-marker-medi></a-marker>
    
      <a-marker type="barcode" id="marker2" value="8" check-marker-medi></a-marker>

      <!--315 315 35-->                  
      <a-entity id = "camera" camera  ></a-entity>
      <a-entity spawn-building></a-entity>
      </a-scene>
</div>
<div class="portrait:hidden">
  <!--
  <div class="z-10 absolute inset-0 flex h-screen">
    <h1>PAUSE SCREEN 123456789</h1>0 0 0
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