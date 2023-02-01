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
      let landscape = 0 ;//compete point for Landscape
      let portait = 0;//compete point for portrait
      let checkpoint = 0;//using for rotation to keep trying to using differnce marker track
      let rotationCheckCount = 0;//number of time that check rotation
      let additionX = 0;//defualt addition x for each roation
      let additionY = 0;//defualt addition y for each roation
      let playAnimation = false;//check if need to run animation for not
      let mixer;//animation-mixer
      let clips;//animation that going to play
      
//    Custom Value 
//    using when marker is too far away
      let distance = 0.5;//Distance between current point to center point || center to new
      let flippoint = 1;//to check Rotation from  xdiff & y diff
      let addX = 2;// extra x axis value
      let addY = 2;// extra y axis value
      let countdown = 225;//Delay time without tracking before model disappear
 
// ----------------------------------------------------------------------------------------------------        
//    keep check each marker   
      AFRAME.registerComponent("check-marker", {
        init: function() {
          let el = this.el;
          el.addEventListener("markerFound", function() {
            marker_visible[el.id] = true;
           
          });

          el.addEventListener("markerLost", function() {
            marker_visible[el.id] = false;
           
          });
          
        }
      });
// ----------------------------------------------------------------------------------------------------         

//  take animation that need to play from model into mixer && clips     
     // AFRAME.registerComponent('take-animation', {
     //    init: function() {
     //    this.el.addEventListener("model-loaded", evt => 
     //      {
     //        mixer = new THREE.AnimationMixer(this.el.components['gltf-model'].model);
     //        clips = this.el.components['gltf-model'].model.animations[1];
     //      })
     //    }})

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
// ***************************************************************************************************           
//        reset all variable value into defualt
          if(reset)
            {
                console.log("Reset!!!!");          
                checkpoint = 0;
                portait = 0;
                landscape = 0 ;
                rotationCheckCount = 0;


                isShowed = false;
                reset = false;
                spawn = false;
                despawn = false;  
                isTooFast =false;
                playAnimation = false;
                center.copy(0,0,0);
                newPosition.copy(0,0,0);
                currentPosition.copy(0,0,0);
                this.falseModel.rotation.x = THREE.MathUtils.degToRad(0);
                this.falseModel.rotation.y = THREE.MathUtils.degToRad(0);
                this.falseModel.rotation.z = THREE.MathUtils.degToRad(0);
            }


          
// *************************************************************************************************** 
//        compute position / rotation / newest material that should be   
          if( marker_visible["marker2"] &&  (marker_visible["marker1"] || marker_visible["marker3"] || marker_visible["marker4"]))
          { 
//        Search for 2nd tracker to compute rotation sort by tracking efficiency    
              if(marker_visible["marker3"] && checkpoint <= 0)       {this.el3.object3D.getWorldPosition(this.p2); checkpoint = 1;}
              else if(marker_visible["marker1"] && checkpoint <= 1)  {this.el1.object3D.getWorldPosition(this.p2); checkpoint = 2;}
              else if(marker_visible["marker4"] && checkpoint <= 2)    {this.el4.object3D.getWorldPosition(this.p2); checkpoint = 0;}
              else {checkpoint = 0;}
              this.el2.object3D.getWorldPosition(this.p1);
//         Using Diferrence to compute phone rotation
              let xdiff = this.p1.x - this.p2.x;
              let ydiff = this.p1.y - this.p2.y;
              let pseudoXPos = 0;
              let pseudoYPos = 0;
              let pseudoZPos = 0;

//        compete to find which is latest phone rotation
            if(!this.p2.equals(0,0,0))
              {
//            Portrait [home button on buttom] 
                if( ((xdiff > flippoint) && checkpoint == 2) 
                   || ((ydiff < -flippoint) && (xdiff < -flippoint) && checkpoint == 0) 
                   || ((xdiff > flippoint) && (ydiff < -flippoint )&& checkpoint == 1) )
                    {
                      portait += 1;
                      rotationCheckCount += 1;
                    }
//            Invert Portrait [home button on Top]    
                if(((xdiff <  - flippoint) && checkpoint == 1) 
                   || ((ydiff > flippoint) && (xdiff > flippoint) && checkpoint == 1) 
                   || ((xdiff < - flippoint) && (ydiff > flippoint) && checkpoint == 3) )
                    {
                      portait -= 1;
                      rotationCheckCount += 1;
                    }
//            Lanscape [home button on left]
                if( ((ydiff < - flippoint) && checkpoint == 2) 
                   || ((ydiff > flippoint) && (xdiff < -flippoint) && checkpoint == 0) 
                   || ((xdiff < -flippoint) && (ydiff < -flippoint) && checkpoint == 1) )
                    {
                      landscape += 1;
                      rotationCheckCount += 1;
                    }
//           invert Lanscape [home button on Right]
                if( ((ydiff > flippoint) && checkpoint == 2) 
                   || ((ydiff < -flippoint) && (xdiff > flippoint) && checkpoint == 0) 
                   || ((xdiff > flippoint) && (ydiff > flippoint )&& checkpoint == 1) )
                    {
                      landscape -= 1;
                      rotationCheckCount += 1;
                    }
                }
            
            //   console.log("---------------------------------------")
             //  console.log("checkpoint  : " + checkpoint);
            //   console.log("xdiff : " + xdiff);
             //  console.log("ydiff : " + ydiff);
           //    console.log("---------------------------------------")
            
              console.log("      Point      ")
               console.log("landscape : " + landscape);
               console.log("portait : " + portait)
               console.log("rotationCheckCount : " + rotationCheckCount +"\n---------------------------------------")
            
//      FInd Winner Rotation       
              if(rotationCheckCount % 5  == 0)
                {
                  console.log("-----------------------------------------------\n--------------------------------------------------\n---------------------------------")
                  if ( landscape > portait  && landscape > 0 && portait < 3 && portait > -3)
                        {
                          additionX = 5 + addY;
                          additionY = -1 + addX;
                          this.falseModel.rotation.z = THREE.MathUtils.degToRad(270);
                          console.log("Landscape ");
                        }
                   else if (portait < landscape && portait < 0 && landscape < 3 && landscape > -3 )
                        {
                          additionX = 1 - addX;
                          additionY = -3 - addY;
                          this.falseModel.rotation.z = THREE.MathUtils.degToRad(180);
                          console.log("Invert Portrait ");
                        }
                    else if(landscape < portait  && landscape < 0 && portait < 3 && portait > -3)
                        {
                          additionX = -4 - addY;
                          additionY = 1 - addX;
                          this.falseModel.rotation.z = THREE.MathUtils.degToRad(90);
                          console.log("Invert LandScape ");
                        }
                    else if( portait > landscape  && portait > 0 && landscape < 3 && landscape > -3)
                        {
                          additionX = -1 + addX;
                          additionY = 3 + addY; 
                          this.falseModel.rotation.z = THREE.MathUtils.degToRad(0);
                          console.log("Potrait");
                        }
                    else if(!isShowed)  {despawn = true; }

                    checkpoint = 0;
                    landscape = 0 ;
                    portait = 0;
                }
                 pseudoXPos = this.p1.x + additionX;
                 pseudoYPos = this.p1.y + additionY;
                 pseudoZPos = this.p1.z ;


// If new position is too far model will slide to it 
                if((leftTime < countdown - 1)  && isTooFast == false && leftTime != 0 && ( rotationCheckCount % 5  != 0 || rotationCheckCount   <= 2))
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
                  else if(!isTooFast && rotationCheckCount >= 10 && !despawn)
                    {
                      if(!isShowed)
                          {
                            this.falseModel.position.z = pseudoZPos;
                            spawn = true;
                            isShowed = true;
                          }
                        if(this.falseModel.position.z - pseudoZPos >= 1 ||  this.falseModel.position.z - pseudoZPos <= -1)
                          {
                             this.falseModel.position.z = (pseudoZPos + pseudoZPos ) / 2;
                          }
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
                despawn = true;                
            }
// ***************************************************************************************************           
          
  
          
//  for model appear in camera to do something
          if(spawn)
            {
              playAnimation = true;
              this.falseModel.visible = true;
              spawn = false;
            }
          
//  for model to do something before disappear from camera 
          if(despawn)
            {
              playAnimation = false;
              this.falseModel.visible = false;
              reset = true;
            }
//   Running / stop animation
           // if (mixer && playAnimation)
           // {
           //    mixer.clipAction(clips).play();
           //    mixer.update(deltaTime/1000) ;
           //  }
           // else if(!playAnimation)
           //  {
           //    mixer.update(0) ;
           //  }
// ****************************************************************************************************          
          
          
          
          
          
        }});  
          
          
          
        
</script>

<style>
a-scene {
  height: 120vh;
}
navbar-layout {
  z-index: 50;
}
video {
  margin-left: 0px !important;
}
</style>

<template>
       <a-scene
      embedded
      arjs="sourceType: webcam; ; detectionMode: mono_and_matrix; matrixCodeType: 3x3"
      vr-mode-ui="enabled: false;"
      loading-screen="enabled: false;"
      renderer="logarithmicDepthBuffer: true;"
      id="scene"
      gesture-detector
    >
         
         
      <a-marker type="barcode" id="marker1" value="14" check-marker>
        <a-box position="0 0.5 0" color="red" opacity="0.8"></a-box>
      </a-marker>
    
      <a-marker type="barcode" id="marker2" value="8" check-marker>
        <a-box position="0 0.5 0" color="red" opacity="0.8"></a-box>
      </a-marker>
    
      <a-marker type="barcode" id="marker3" value="60" check-marker>
        <a-box position="0 0.5 0" color="red" opacity="0.8"></a-box>
      </a-marker>
    
      <a-marker type="barcode" id="marker4" value="58" check-marker>
        <a-box position="0 0.5 0" color="red" opacity="0.8"></a-box>
      </a-marker>
         
                  
<!--       <a-entity id="vectorOrigin" > </a-entity> -->
<!--       <a-entity id = "false-model" gesture-handler position = "0 0 0"  gltf-model="#mdl" take-animation></a-entity> -->
      <a-entity id = "false-model" gesture-handler visible="false" scale = "2 2 2"  gltf-model="/models/nakraFullBodyColorUV.glb" ></a-entity>

      <a-entity id = "camera" camera  ></a-entity>
      <a-entity spawn-model></a-entity>

    </a-scene>
</template>

