<template>
  <div
    class="h-screen overflow-y-auto overflow-x-auto grid grid-cols-1 content-center"
  >
    <div
      class="map-zone"
      :style="{ transform: `scale(${zoomLevel})` }"
      @wheel="handleWheel"
      @touchstart="handleTouchStart"
      @touchmove="handleTouchMove"
      @touchend="handleTouchEnd"
    >
      <img
        class="justify-items-center w-auto h-auto max-w- max-h-full"
        src="@/assets/images/FinalMapKasetFair.svg"
        alt=""
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      zoomLevel: 2,
      initialDistance: 0,
      currentDistance: 0,
      minScale: 1,
      maxScale: 3,
    };
  },
  methods: {
    handleWheel(event) {
      event.preventDefault();
      // this.zoomLevel += event.deltaY * -0.01;
    },
    handleTouchStart(event) {
      if (event.touches.length >= 2) {
        this.initialDistance = this.getTouchDistance(event);
        if (this.zoomLevel < this.minScale) {
          this.zoomLevel = this.minScale;
        }
        if (this.zoomLevel > this.maxScale) {
          this.zoomLevel = this.maxScale;
        }
      }
    },
    handleTouchMove(event) {
      if (event.touches.length >= 2) {
        this.currentDistance = this.getTouchDistance(event);
        this.zoomLevel =
          this.zoomLevel * (this.currentDistance / this.initialDistance);
        if (this.zoomLevel < this.minScale) {
          this.zoomLevel = this.minScale;
        }
        if (this.zoomLevel > this.maxScale) {
          this.zoomLevel = this.maxScale;
        }
      }
    },
    handleTouchEnd() {
      this.initialDistance = 0;
      this.currentDistance = 0;
    },
    getTouchDistance(event) {
      const touch1 = event.touches[0];
      const touch2 = event.touches[1];
      const deltaX = touch2.clientX - touch1.clientX;
      const deltaY = touch2.clientY - touch1.clientY;
      return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    },
  },
};
</script>

<style scoped>
.red {
  background-color: red;
}

.h-screen {
  height: 100vh;
}

.w-screen {
  width: 100vw;
}
.overflow-hidden {
  overflow: hidden;
}
</style>
