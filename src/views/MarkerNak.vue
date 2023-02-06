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
let marker_visible = { marker1: false, marker2: false , marker3: false, marker4: false};
      let leftTime = 0;//totaltime before model that lost all track to be despawn          
      let reset = true;//true = reset everything to default
      let isShowed = false;//check if model show or not
      let spawn = false;//check if model spawn on camera 
      let despawn = false;//check if time for model to despawn
      let isTooFast =false;//check if model is too far
      let currentPosition = new THREE.Vector3(0,0,0);//current model position
      let newPosition = new THREE.Vector3(0,0,0);//new model position that too far from current position 
      let center = new THREE.Vector3(0,0,0);//center between current and new     
      let rotationCheckCount = 0;//number of time that check rotation
      let additionX = -2;//defualt addition x for each roation
      let additionY = 8.5;//defualt addition y for each roation
      let playAnimation = false;//check if need to run animation for not
      let mixer;//animation-mixer
      let clips;//animation that going to play
      let scale = 0.1;
      
      
//    Custom Value 
//    using when marker is too far away
      let distance = 0.5;//Distance between current point to center point || center to new
      let countdown = 50;//Delay time without tracking before model disappear
 
// ----------------------------------------------------------------------------------------------------        
//    keep check each marker   
      AFRAME.registerComponent("check-marker-naka", {
        init: function() {
          let el = this.el;
          el.addEventListener("markerFound", function() {
            marker_visible[el.id] = true;
           
          });
          el.addEventListener("markerLost", function() {
            marker_visible[el.id] = false;
           
          });
         
        }
})
// ----------------------------------------------------------------------------------------------------         

//  take animation that need to play from model into mixer && clips     
     AFRAME.registerComponent('take-animation', {
        init: function() {
        this.el.addEventListener("model-loaded", evt => 
          {
            mixer = new THREE.AnimationMixer(this.el.components['gltf-model'].model);
            clips = this.el.components['gltf-model'].model.animations[0];

          })}})

// ----------------------------------------------------------------------------------------------------  

//      compute model location / playanimation  or not /phone rotation 
        AFRAME.registerComponent("spawn-model", {
          init: function() {
//        search for markers    
          this.el1 = document.querySelector("#marker1");
          this.el2 = document.querySelector("#marker2");
          this.el3 = document.querySelector("#marker3");
          this.el4 = document.querySelector("#marker4");
          
//        position of marker to compute model spawn position
          this.p1  = new THREE.Vector3(0,0,0);
          this.p2  = new THREE.Vector3(0,0,0);
           
//        make models spawn at vectorOrigin          
          this.falseModel = document.querySelector("#false-model").object3D;
            

          },
          
//   main thing        
     tick: function(time, deltaTime) 
        {
          console.log(isTooFast)
          var track = document.getElementById('tracker');
          // if((!marker_visible["marker2"] &&  !marker_visible["marker1"] && !marker_visible["marker2"] && !marker_visible["marker1"]))
          // {
          //   this.falseModel.visible = false;
          //   reset  =true;
          // }
// ***************************************************************************************************           
//        reset all variable value into defualt
          if(reset)
            {
                console.log("Reset!!!!");          

                isShowed = false;
                reset = false;
                spawn = false;
                despawn = false;  
                isTooFast =false;
                playAnimation = false;
                scale = 0.1;
                center.copy(0,0,0);
                newPosition.copy(0,0,0);
                currentPosition.copy(0,0,0);

              //  this.falseModel.rotation.x = THREE.MathUtils.degToRad(0);
              //  this.falseModel.rotation.y = THREE.MathUtils.degToRad(0);
              //  this.falseModel.rotation.z = THREE.MathUtils.degToRad(270);
            }


          
// *************************************************************************************************** 
//        compute position / rotation / newest material that should be   
          if(( marker_visible["marker2"] ||  (marker_visible["marker1"] )) && (marker_visible["marker3"] || marker_visible["marker4"]))
          { 
            track.style.display = 'none';
//        Search for 2nd tracker to compute rotation sort by tracking efficiency 
              if(marker_visible["marker3"]) {this.el3.object3D.getWorldPosition(this.p2); track.style.display = 'none';}
              else if(marker_visible["marker4"]){this.el4.object3D.getWorldPosition(this.p2); track.style.display = 'none';}
              
              if(marker_visible["marker1"]) {this.el1.object3D.getWorldPosition(this.p1); track.style.display = 'none';}
              else if(marker_visible["marker2"]){this.el2.object3D.getWorldPosition(this.p1); track.style.display = 'none';}
              else{track.style.display = 'block';}

//         Using Diferrence to compute phone rotation
              let pseudoXPos = 0;
              let pseudoYPos = 0;
              let pseudoZPos = 0;

              pseudoXPos = this.p1.x + additionX;
              pseudoYPos = this.p2.y + additionY;
              pseudoZPos = ((this.p1.z + this.p2.z) / 2 ) - 50;


// If new position is too far model will slide to it 
                if((leftTime < countdown - 1)  && isTooFast == false && leftTime != 0 )
                  { 
                    if(currentPosition.distanceTo(new THREE.Vector3(pseudoXPos,pseudoYPos,pseudoZPos)) > distance * 2  )
                    {   
                      newPosition.set(pseudoXPos,pseudoYPos,pseudoZPos);
                      let xCen =  (newPosition.getComponent(0) + currentPosition.getComponent(0)) / 2;
                      let yCen =  (newPosition.getComponent(1) + currentPosition.getComponent(1)) / 2;
                      let zCen =  (newPosition.getComponent(2) + currentPosition.getComponent(2)) / 2;
                      center.set(xCen,yCen,zCen);
                      isTooFast = true;
                    }
                  }
// else -> normal tracking
                  else if(!isTooFast)
                    {
                      if(!isShowed)
                          {
                            this.falseModel.position.z = pseudoZPos;
                            spawn = true;
                            isShowed = true;
                            
                          }
                        if(this.falseModel.position.z - pseudoZPos >= 1 ||  this.falseModel.position.z - pseudoZPos <= -1)
                          {this.falseModel.position.z = (pseudoZPos + pseudoZPos ) / 2;}
                            
                            this.falseModel.position.x = pseudoXPos;
                            this.falseModel.position.y = pseudoYPos;
                            currentPosition.set(pseudoXPos,pseudoYPos,pseudoZPos);
                            leftTime = countdown;
                    }
                }
          
//  ***************************************************************************************************            
//  ***************************************************************************************************           
//  ***************************************************************************************************  
//  ***************************************************************************************************           
//        Move when new position is too far
          
          if(isTooFast)
            {
              let positionToMove = new THREE.Vector3(0,0,0);
              let p1 = new THREE.Vector3(0,0,0);
              let p2 = new THREE.Vector3(0,0,0);
              // console.log(center)
              if(leftTime % 2 ==0)
                {
//             move model into center between current && new      
                  if((currentPosition.distanceTo(center) > distance && !center.equals(0,0,0)) || (currentPosition.distanceTo(newPosition) > distance))
                  {
                    if(currentPosition.distanceTo(center) > distance && !center.equals(0,0,0))
                    { 
                      p1.copy(center);
                      p2.copy(currentPosition);
                    }
//             move model into newPosition from center     
                    else if(currentPosition.distanceTo(newPosition) > distance)
                    { 
                      center.copy(0,0,0);
                      p1.copy(newPosition);
                      p2.copy(currentPosition);
                    }
                  
                      let xCen =  (p1.getComponent(0) + p2.getComponent(0)) / 2;
                      let yCen =  (p1.getComponent(1) + p2.getComponent(1)) / 2;
                      let zCen =  (p1.getComponent(2) + p2.getComponent(2)) / 2; 
                      positionToMove.set(xCen,yCen,zCen);
                    
                      this.falseModel.position.x = positionToMove.getComponent(0);
                      this.falseModel.position.y = positionToMove.getComponent(1);
                      currentPosition.copy(positionToMove);}
                  
                  else if(currentPosition.distanceTo(newPosition) < distance) {isTooFast = false;}
                }
            }       
          

// ***************************************************************************************************          
//  Delay Before Disappear      
          if(leftTime > 0 )
            {
              if(leftTime % 50 == 0 && leftTime != countdown)  { console.log("timeLeft : " + leftTime); }
              leftTime -= 1;
              
            }        
          else if(leftTime <= 0 && isShowed )
            {
                console.log("deSpawning model");
                isShowed = false;
                despawn = true;                
            }
// ***************************************************************************************************           
          
  
          
//  for model appear in camera to do something
          if(spawn)
            {
              
              this.falseModel.scale.set(scale,scale,scale);
              playAnimation = true;
              scale += 0.03;
              this.falseModel.visible = true;
              if(scale >= 2.8)
                {
                  spawn = false; 
                }            
            }
          
//  for model to do something before disappear from camera 
          if(despawn)
            {
              this.falseModel.scale.set(scale,scale,scale);
              scale -= 0.05;
              if(scale <= 0.01)
                {
                  playAnimation = false;
                  this.falseModel.visible = false;
                  reset = true;                
                }    
            }
//   Running / stop animation
            if (mixer && playAnimation)
           {
              mixer.clipAction(clips).play();
              mixer.update(deltaTime/1000) ;
            }
           else if(!playAnimation && mixer)
            {
              mixer.update(0);
            }


// ****************************************************************************************************          
          
          
          
          
          
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

      <a-marker type="barcode" id="marker1" value="14" check-marker-naka></a-marker>
      <a-marker type="barcode" id="marker2" value="8" check-marker-naka></a-marker>
      <a-marker type="barcode" id="marker3" value="60" check-marker-naka></a-marker>
      <a-marker type="barcode" id="marker4" value="58" check-marker-naka></a-marker>
 
      <a-entity 
        id = "false-model" 
        visible="false" 
        gesture-handler 
        rotation ="10 340 0" 
        take-animation 
        :gltf-model="getPath('models/naga-wave-green.glb')" 
      ></a-entity>

      <a-entity id = "camera" camera  ></a-entity>
      <a-entity spawn-model></a-entity>

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