<script setup lang="ts">
import NavbarLayout from '@/components/NavbarLayout.vue';

let marker_visible = { marker1: false, marker2: false , marker3: false, marker4: false};
      let leftTime = 0;//totaltime before model that lost all track to be despawn          
      let reset = true;//true = reset everything to default
      let isShowed = false;//check if model show or not
      let spawn = false;//check if model spawn on camera 
      let despawn = false;//check if time for model to despawn
      let respawn =false;//check if model is too far
      let switchingDelay = 0;//delay if some marker are lost track and have to change model
      let currentPosition = new THREE.Vector3(0,0,0);//current model position
      let newPosition = new THREE.Vector3(0,0,0);//new model position that too far from current position 
      let center = new THREE.Vector3(0,0,0);//center between current and new     
      let invertPortrait = 0;//compete point for invertPortrait
      let landscape = 0 ;//compete point for Landscape
      let invertLandscape = 0;//compete point for invertLandscape
      let portait = 0;//compete point for portrait
      let checkpoint = 0;//using for rotation to keep trying to using differnce marker track
      let rotationCheckCount = 0;//number of time that check rotation
      let additionX = 0;//defualt addition x for each roation
      let additionY = 0;//defualt addition y for each roation
      let markerCount = 0;//check if all needed marker are found
      let playAnimation = false;//check if need to run animation for not
      let mixer;//animation-mixer
      let clips;//animation that going to play
      
//    Custom Value 
//    using when marker is too far away
      let distance = 0.5;//Distance between current point to center point || center to new
      let flippoint = 1;//to check Rotation from  xdiff & y diff
      let addX = 0;// extra x axis value
      let addY = 0;// extra y axis value
      let countdown = 225;//Delay time without tracking before model disappear
 
// ----------------------------------------------------------------------------------------------------        
//    keep check each marker   
      AFRAME.registerComponent("check-marker", {
        init: function() {
          let el = this.el;
          el.addEventListener("markerFound", function() {
            marker_visible[el.id] = true;
            markerCount += 1;
          });

          el.addEventListener("markerLost", function() {
            marker_visible[el.id] = false;
            markerCount -= 1;
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
                this.falseModel.visible =false;          
                switchingDelay = 0;
                checkpoint = 0;
                portait = 0;
                invertPortrait = 0;
                landscape = 0 ;
                invertLandscape = 0;
                rotationCheckCount = 0;
                changedModelMat = 0;

                isShowed = false;
                reset = false;
                spawn = false;
                despawn = false;  
                respawn =false;
                playanimation = false;
                center.copy(0,0,0);
                newPosition.copy(0,0,0);
                currentPosition.copy(0,0,0);
                this.falseModel.rotation.x = THREE.Math.degToRad(0);
                this.falseModel.rotation.y = THREE.Math.degToRad(90);
                this.falseModel.rotation.z = THREE.Math.degToRad(0);
              
            }


          
// *************************************************************************************************** 
//        compute position / rotation / newest material that should be   
          if( marker_visible["marker2"] && markerCount >= 2)
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
                      invertPortrait += 1;
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
                      invertLandscape += 1;
                      rotationCheckCount += 1;
                    }
                }
            
//               console.log("---------------------------------------")
//               console.log("checkpoint  : " + checkpoint);
//               console.log("xdiff : " + xdiff);
//               console.log("ydiff : " + ydiff);
//               console.log("---------------------------------------")
            
//               console.log("      Point      ")
//               console.log("invertPortrait : " + invertPortrait)
//               console.log("landscape : " + landscape);
//               console.log("invertLandscape : " + invertLandscape)
//               console.log("portait : " + portait)
//               console.log("rotationCheckCount : " + rotationCheckCount +"\n---------------------------------------")
            
//      FInd Winner Rotation       
              if(rotationCheckCount % 5  == 0)
                {
                  if ((landscape > invertLandscape ) &&  ( landscape > invertPortrait) &&  ( landscape > portait) )
                        {
                          additionX = 5;
                          additionY = -1;
                          this.falseModel.rotation.z = THREE.Math.degToRad(270);
                          console.log("Landscape ");
                        }
                   else if ((invertPortrait > invertLandscape ) &&  ( invertPortrait > landscape ) &&( invertPortrait > portait))
                        {
                          additionX = 1;
                          additionY = -3;
                          this.falseModel.rotation.z = THREE.Math.degToRad(180);
                          console.log("Invert Portrait ");
                        }
                    else if((invertLandscape > invertPortrait ) &&  ( invertLandscape > landscape )&& ( invertLandscape > portait))
                        {
                          additionX = -4;
                          additionY = 1;
                          this.falseModel.rotation.z = THREE.Math.degToRad(90);
                          console.log("Invert LandScape ");
                        }
                    else if(((portait > invertPortrait ) &&  ( portait > landscape ) && ( portait > invertLandscape) ) )
                        {
                          additionX = -1;
                          additionY = 3;
                          this.falseModel.rotation.z = THREE.Math.degToRad(0);
                          console.log("Potrait");
                        }
                    else if(!isShowed)  {reset = true; rotationCheckCount = 0; }

                    checkpoint = 0;
                    invertPortrait = 0;
                    landscape = 0 ;
                    invertLandscape = 0;
                    portait = 0;
                }

                 pseudoXPos = this.p1.x + addX + additionX;
                 pseudoYPos = this.p1.y + addY + additionY;
                 pseudoZPos = this.p1.z ;
                 let vectorOriginPosition = new THREE.Vector3(0,0,0);
                 vectorOriginPosition.set(pseudoXPos,pseudoYPos,pseudoZPos);                

// If new position is too far model will slide to it 
                if((leftTime < countdown - 1)  && respawn == false && leftTime != 0 && ( rotationCheckCount % 5  != 0 || rotationCheckCount   <= 2))
                  { 
                    if(currentPosition.distanceTo(vectorOriginPosition) > distance * 2  )
                    {        
                      newPosition.copy(vectorOriginPosition);
                      let xCen =  (newPosition.getComponent(0) + currentPosition.getComponent(0)) / 2;
                      let yCen =  (newPosition.getComponent(1) + currentPosition.getComponent(1)) / 2;
                      let zCen =  (newPosition.getComponent(2) + currentPosition.getComponent(2)) / 2;
                      center.set(xCen,yCen,zCen);
                      respawn = true;
                    }
                  }
// else -> normal tracking
                  else if(!respawn && rotationCheckCount >= 10)
                    {
                      if(!isShowed)
                          {
                            this.falseModel.position.z = vectorOriginPosition.getComponent(2);
                            spawn = true;
                            isShowed = true;
                          }
                            this.falseModel.position.x = vectorOriginPosition.getComponent(0);
                            this.falseModel.position.y = vectorOriginPosition.getComponent(1);
                            currentPosition.copy(vectorOriginPosition);
                            leftTime = countdown;
                    }
                }
          
//  ***************************************************************************************************            
//  ***************************************************************************************************           
//  ***************************************************************************************************  
//  ***************************************************************************************************           
//        Move when new position is too far
          
          if(respawn)
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
                  { p1.copy(center);
                    p2.copy(currentPosition);}
//             move model into newPosition from center     
                  else if(currentPosition.distanceTo(newPosition) > distance)
                  { center.copy(0,0,0);
                    p1.copy(newPosition);
                    p2.copy(currentPosition);}
                  
                    let xCen =  (p1.getComponent(0) + p2.getComponent(0)) / 2;
                    let yCen =  (p1.getComponent(1) + p2.getComponent(1)) / 2;
                    let zCen =  (p1.getComponent(2) + p2.getComponent(2)) / 2; 
                    positionToMove.set(xCen,yCen,zCen);
                    
                    this.falseModel.position.x = positionToMove.getComponent(0);
                    this.falseModel.position.y = positionToMove.getComponent(1);
                    currentPosition.copy(positionToMove);}
                  
                else if(currentPosition.distanceTo(newPosition) < distance) {respawn = false;}
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

<template>
    <navbar-layout>
		<!-- Code here -->
    </navbar-layout>
</template>

<style
>
</style>