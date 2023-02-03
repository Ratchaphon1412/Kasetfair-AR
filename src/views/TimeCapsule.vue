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
        <div v-if="!isCameraOpen" class=" text-red-600 font-weight: 800 text-l">
            คำแนะนำ: ใช้อุปกรณ์มือถือใช้งานหน้านี้
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

            <div class="p-2">
                <div class="relative" @click="switchImage">
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
                      :height="450">
                    </canvas>
                </div>
              </div>
            </div>
        </div> 
      </div>
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
        firstTuch: true,
        
        cameraType: 'environment',
        link: '#',
        
        index: 0,
        image: null,
       
        images: [{
            id: 1,
            src: '../assets/images/time-capsule/tuch.png',
            alt: "tuch",
      
          },
          {
            id: 2,
            src: "../assets/images/time-capsule/PhotoFrame-80-TH.png",
            alt: "PhotoFrame-80-TH"
          },
          {
            id: 3,
            src: "../assets/images/time-capsule/p1.png",
            alt: "p1"
          },
          {
            id: 4,
            src: "../assets/images/time-capsule/p2.png",
            alt: "p2"
          },
          {
            id: 5,
            src: "../assets/images/time-capsule/p3.png",
            alt: "p3"
          },
          {
            id: 6,
            src: "../assets/images/time-capsule/p4.png",
            alt: "p4"
          },
          {
            id: 7,
            src: "../assets/images/time-capsule/p5.png",
            alt: "p5"
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
      this.image = this.images[this.index];
    },
  
    methods: {
      switchImage() {
        this.index = (this.index + 1) % (this.images.length - 1);
        this.image = this.images[this.index + 1];
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
            alert("อุปกรณ์ของคุณไม่รองรับ โปรดใช้โทรศัพท์มือถือในการเปิดหน้านี้");
          });
      },
  
      stopCameraStream() {
        let tracks = this.$refs.camera.srcObject.getTracks();
  
        tracks.forEach((track) => {
          track.stop();
        });
      },
  
      downloadImage() {
        this.link.click();
      },

      capture() {
        this.video = document.getElementsByTagName("video")[0];
        this.canvas = document.createElement("canvas");
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
  body {
    display: flex;
    overflow: hidden;
  }
  .filter-select {
    position: absolute;
    z-index: 2;
    width: 306px;
    height: 407px;
    cursor: pointer;
    transition: filter 0.3s ease-in;
  }
  .image:hover {
    filter: brightness(1.2);
  }
  .web-camera-container {
    margin-top: 4rem;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
  }
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
  