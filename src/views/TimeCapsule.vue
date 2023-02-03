<template>
    <div id="app">
    <!-- ปุ่มย้อนกลับ -->
        <div class="z-10 absolute inset-x-0 top-0 grid grid-cols-2 justify-items-stretch py-7">
          <div>
            <router-link :to="{ name: 'home'}">
              <button type="button" class="py-2 px-2">
                <img src="../assets/icons/back_to_home.svg" />
              </button>
          </router-link>
          </div>
          <!-- <div>
            <button type="button" class="py-2 px-2">
              <svg xmlns="http://www.w3.org/2000/svg" height="30" width="30"><path d="m12 20-8-8 8-8 1.425 1.4-5.6 5.6H20v2H7.825l5.6 5.6Z"/></svg>
            </button> กลับหน้าหลัก
          </div> -->
        </div>
        
        <div class=" bg-[#AFC2AC] bg-nav z-10 inset-x-0 flex justify-center fixed bottom-0" style="position: absolute">
            <div v-if="isCameraOpen && !isLoading">
                <button type="button"  @click="capture()" class="scale-75" id="btn">
                    <img
                        src="../assets/icons/icon.camera.svg"/>
                    <h1 class="text-center font-bold">ถ่ายภาพ</h1>
                </button>
            </div>
            <!-- download ภาพ -->
            <div v-if="isPhotoTaken && isCameraOpen">
              <button
                type="button"
                id="downloadPhoto"
                download="my-photo.jpg"
                class="button scale-75"
                role="button"
                @click="downloadImage">
                <img src="../assets/icons/save_icon.svg" />
                <h1 class="text-center font-bold">บันทึก</h1>
              </button>
            </div>

            <button v-if="isPhotoTaken" type="button" @click="shareFile()" class="scale-75">
              <img src="../assets/icons/share_icon.svg" />
              <h1 class="text-center font-bold">แชร์</h1>
            </button>

        </div>


      <div class="web-camera-container">
        <div class="camera-button">
          <button
            type="button"
            class="button-oc"
            :class="{ 'is-primary': !isCameraOpen, 'is-danger': isCameraOpen }"
            @click="toggleCamera"
          >
            <button v-if="!isCameraOpen" class="flex"> <img src="../assets/icons/icon.photo_camera.svg"/> <h class="ml-2">กดอนุญาตใช้งานกล้อง</h></button>
            <button v-else class="flex px-2"> <img src="../assets/icons/icon.no_photography.svg"/> <h class="ml-2">ปิดกล้อง</h></button>
          </button>
        </div>
        <div v-show="isCameraOpen && isLoading" class="camera-loading">
          <ul class="loader-circle">
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>

        <div class="portrait:hidden text-red-600 font-weight: 700 text-2xl">
            *ใช้โทรศัพท์ในแนวตั้ง
        </div>
        
        <div class="landscape:hidden">
            <div
            v-if="isCameraOpen"
            v-show="!isLoading"
            class="camera-box"
            :class="{ flash: isShotPhoto }"
            >
    
            <!-- <dev class="test"><img src="./assets/1..jpg"  height="337"></dev> -->
            <!-- justify-center -->

            <!-- โชว์รูปภาพ
            <div class="filter-select">
                <img v-if="image" :key="image.id" @click="switchImage" class="image" :src="image.src" alt="image.alt">
            </div> -->
            
            <!-- <div class="camera-shutter" :class="{ flash: isShotPhoto }"></div> -->
            <div class="p-2">
                <div class="relative" @click="switchImage">
                <!-- โชว์รูปภาพ -->
                <!-- <div class="filter-select"> -->
                    <!-- <img v-if="image" :key="image.id" @click="switchImage" class="image filter-select" :src="image.src" alt="image.alt"> -->
                <!-- </div> -->
                <div class="absolute w-full inser-x-0">
                    <img v-if="image" :key="image.id" class="image w-full" :src="image.src" alt="image.alt">
                </div>
                
                    <video
                    v-show="!isPhotoTaken"
                    ref="camera"
                    webkit-playsinline
                    playsinline
                    autoplay
                    id="video">
                    </video>

                    <canvas
                        v-show="isPhotoTaken"
                        id="photoTaken"
                        ref="canvas"
                        :width="337.5"
                        :height="450"></canvas>
            </div>
            <!-- <video
                v-show="!isPhotoTaken"
                ref="camera"
                :width="450"
                :height="337.5"
                webkit-playsinline
                playsinline
                autoplay
                id="video"
            ></video> -->
    
            </div>
            </div>
        </div> 
  
        <!-- <div v-if="isCameraOpen && !isLoading" class="camera-shoot">
          <button type="button" class="button" @click="takePhoto">
            <img
              src="https://img.icons8.com/material-outlined/50/000000/camera--v2.png"
            />
          </button>
        </div> -->
        <div class="landscape:hidden">
            <!-- ปุ่มสลับกล้อง -->
            <!-- <div v-if="isCameraOpen && !isLoading" class="change-camera-type">
            <button type="button" class="button" @click="toggleCameraType">
                <img
                src="https://img.icons8.com/material-outlined/30/000000/switch-camera.png"
                />
            </button>
            </div> -->
            
            <!-- ปุ่มกดถ่ายรูป -->
            <!-- <div v-if="isCameraOpen && !isLoading" >
                <button type="button" class="button is-success"  id="btn" @click="capture()">
                    <span class="icon is-small">
                    <i class="fas fa-camera"></i>
                    </span>

                    <img
                    src="../assets/icons/icon.camera.svg"
                    />
                </button>
            </div> -->
        </div>
        
        <!-- download ภาพ -->
        <!-- <div v-if="isPhotoTaken && isCameraOpen" class="camera-download">
          <a
            id="downloadPhoto"
            download="my-photo.jpg"
            class="button"
            role="button"
            @click="downloadImage"
          >
            Download
          </a>
        </div> -->

      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'App',
    data() {
      return {
        isCameraOpen: false,
        isPhotoTaken: false,
        isShotPhoto: false,
        isLoading: false,
        btnScreenshot: document.querySelector("#btnScreenshot"),
        
        cameraType: 'environment',
        link: '#',
        
        index: 0,
        image: null,
       
        images: [{
            id: 1,
            src: '../assets/images/time-capsule/PhotoFrame-80-EN.png',
            alt: "hall",
      
          },
          {
            id: 2,
            src: "../assets/images/time-capsule/PhotoFrame-80-TH.png",
            alt: "restaurant"
          },
          {
            id: 3,
            src: "../assets/images/time-capsule/p1.png",
            alt: "PhotoFrame-80-English"
          },
          {
            id: 4,
            src: "../assets/images/time-capsule/p2.png",
            alt: "PhotoFrame-80-Thailand"
          },
          {
            id: 5,
            src: "../assets/images/time-capsule/p3.png",
            alt: "PhotoFrame-80-Thailand"
          },
          {
            id: 6,
            src: "../assets/images/time-capsule/p4.png",
            alt: "PhotoFrame-80-Thailand"
          },
          {
            id: 7,
            src: "../assets/images/time-capsule/p5.png",
            alt: "PhotoFrame-80-Thailand"
          }
        ],

        video: null,
        canvas: null,
        width: 768,
        height: 1024,
        screenshot: null,
        imgData: null,
        link: null,
        // imgShare: null
      
      
    };
    },
  
    mounted() {
      this.switchImage();
    },
  
    methods: {
      switchImage() {
        this.image = this.images[this.index];
        this.index = (this.index + 1) % this.images.length;
      },
  
      toggleCamera() {
        if (this.isCameraOpen) {
          this.isCameraOpen = false;
          this.isPhotoTaken = false;
          this.isShotPhoto = false;
          this.stopCameraStream();
        } else {
          this.isCameraOpen = true;
          this.createCameraElement();
        }
      },
      toggleCameraType() {
        if (
          !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
            navigator.userAgent
          )
        ) {
          // false for not mobile device
          alert('You dont have another camera to switch to');
          return;
        }
        if (this.isCameraOpen) {
          this.toggleCamera();
        }
        this.cameraType = this.cameraType === 'user' ? 'environment' : 'user';
        this.toggleCamera();
      },
  
      createCameraElement() {
        this.isLoading = true;
  
        const constraints = (window.constraints = {
          audio: false,
          video: {
            facingMode: { exact: this.cameraType },
          },
        });
  
        navigator.mediaDevices
          .getUserMedia(constraints)
          .then((stream) => {
            this.isLoading = false;
            this.$refs.camera.srcObject = stream;
          })
          .catch((error) => {
            this.isLoading = false;
            alert("May the browser didn't support or there is some errors.");
          });
      },
  
      stopCameraStream() {
        let tracks = this.$refs.camera.srcObject.getTracks();
  
        tracks.forEach((track) => {
          track.stop();
        });
      },
  
    //   takePhoto() {
    //     if (!this.isPhotoTaken) {
    //       this.isShotPhoto = true;
  
    //       const FLASH_TIMEOUT = 50;
  
    //       setTimeout(() => {
    //         this.isShotPhoto = false;
    //       }, FLASH_TIMEOUT);
    //     }
  
    //     this.isPhotoTaken = !this.isPhotoTaken;
  
    //     const context = this.$refs.canvas.getContext('2d');
    //     context.drawImage(this.$refs.camera, 0, 0, 450, 337.5);
    //   },
  
    // ------------
  
      // btnScreenshot(){
  
      //     const video = document.getElementsByTagName("video")[0];
      //     const canvas = document.createElement("canvas");
  
      //     var width = video.videoWidth, height = video.videoHeight;
      //     canvas.width = width;
      //     canvas.height = height;
          
      //     var screenshot;
      //     canvas.getContext('2d').drawImage(video, 0, 0, 1920, 1080);
  
      //     var imgData = document.querySelector('.img1');     
      //     canvas.getContext('2d').drawImage(imgData, 0, 0, imgData.width, imgData.height);
      //     screenshot = canvas.toDataURL('image/png');
          
      //     var link = document.createElement('a');
      //     link.download = 'screenshot.png';
      //     link.href = screenshot;
      //     link.click();
   
      // },
      downloadImage() {
        this.link.click();
      },

      capture() {
        this.video = document.getElementsByTagName("video")[0];
        this.canvas = document.createElement("canvas");
        // this.width = this.video.videoWidth;
        // this.height = this.video.videoHeight;
        this.canvas.width = this.width;
        this.canvas.height = this.height;

        // alert(width, height);
        //แคปรูป
        this.canvas.getContext('2d').drawImage(this.video, 0, 0, this.width, this.height);
        //ผลลัพธ์
        this.imgData = document.querySelector('.image');     
        this.canvas.getContext('2d').drawImage(this.imgData, 0, 0, this.width, this.height);
        this.screenshot = this.canvas.toDataURL('image/png');
  
        this.link = document.createElement("a");
        this.link.download = "screenshot.png";
        this.link.href = this.screenshot;

        // link.click();

        if(!this.isPhotoTaken) {
            this.isShotPhoto = true;

            const FLASH_TIMEOUT = 50;

            setTimeout(() => {
            this.isShotPhoto = false;
            }, FLASH_TIMEOUT);
        }
      
        this.isPhotoTaken = !this.isPhotoTaken;
        
        //preview
        this.canvas.width = 337.5
        this.canvas.width = 450
        this.context = this.$refs.canvas.getContext('2d');
        this.context.drawImage(this.$refs.camera, 0, 0, 337.5, 450);
        // this.shareFile(this.screenshot);
        
  
      },
      async shareFile() {
      // แชร์ไฟล์ภาพ
      // this.capture();
      const blob = await (await fetch(this.screenshot)).blob();
      const filesArray = [
        new File([blob], "screenshot.png", {
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
    }  
    },
  };
  </script>
  
  <style scoped>

  .button-oc{
    flex: auto;
    background-color: #4d4d4d; /* Green */
    border-radius: 10px;
    border-color: rgb(207, 207, 207);
    color: rgb(255, 255, 255);
    padding: 16px 32px;
    text-align: center;
    display: inline-block;
    font-size: 20px;
    cursor: pointer;

    margin-bottom: 1rem;
  
  }
  /* .img-select{
  position: absolute;
  z-index: 2;
  } */
  
  body {
    display: flex;
    /* justify-content: center; */
    overflow: hidden;
  }
 

  .filter-select {
    position: absolute;
    z-index: 2;
    width: 306px;
    height: 407px;
    /* margin: 2px; */
    cursor: pointer;
    transition: filter 0.3s ease-in;
    /* border: 3px solid #ccc; */
    /* border-radius: 4px; */
  }
 

  
  .image:hover {
    filter: brightness(1.2);
  }
  
  .web-camera-container {
    /* padding-bottom: 10px; */
    margin-top: 4rem;
    /* margin-bottom: 2rem; */
    padding: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    /* border: 0px solid #ccc; */
    border-radius: 4px;
    /* width: auto; */
  }
  /* .web-camera-container .camera-button {
    margin-bottom: 2rem;
    background-color: rgb(255, 10, 10);
  } */
  .web-camera-container .camera-box .camera-shutter {
    opacity: 0;
    width: 337.5px;
    height: 450px;
    background-color: #fff;
    position: absolute;
  }
  .web-camera-container .camera-box .camera-shutter.flash {
    opacity: 1;
  }
  .web-camera-container .camera-shoot,
  .web-camera-container .change-camera-type {
    margin-top: 5rem 0;
    /* padding-bottom: 3rem; */
    /* margin-bottom: 3rem; */
  }
  .web-camera-container .camera-shoot button,
  .web-camera-container .change-camera-type button {
    height: 60px;
    width: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 100%;
  }
  /* .web-camera-container .camera-shoot button img,
  .web-camera-container .change-camera-type button img {
    height: 35px;
    object-fit: cover;
  } */
  .web-camera-container .camera-loading {
    overflow: hidden;
    height: 100%;
    position: absolute;
    width: 100%;
    min-height: 150px;
    margin: 3rem 0 0 -1.2rem;
  }
  .web-camera-container .camera-loading ul {
    height: 100%;
    position: absolute;
    width: 100%;
    z-index: 999999;
    margin: 0;
  }
  .web-camera-container .camera-loading .loader-circle {
    display: block;
    height: 14px;
    margin: 0 auto;
    top: 50%;
    left: 100%;
    transform: translateY(-50%);
    transform: translateX(-50%);
    position: absolute;
    width: 100%;
    padding: 0;
  }
  .web-camera-container .camera-loading .loader-circle li {
    display: block;
    float: left;
    width: 10px;
    height: 10px;
    line-height: 10px;
    padding: 0;
    position: relative;
    margin: 0 0 0 4px;
    background: #999;
    animation: preload 1s infinite;
    top: -50%;
    border-radius: 100%;
  }
  .web-camera-container .camera-loading .loader-circle li:nth-child(2) {
    animation-delay: 0.2s;
  }
  .web-camera-container .camera-loading .loader-circle li:nth-child(3) {
    animation-delay: 0.4s;
  }
  @keyframes preload {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0.4;
    }
    100% {
      opacity: 1;
    }
  }
  </style>
  