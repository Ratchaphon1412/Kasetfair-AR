<template>
  <div class="w-full">
    <div class="col-span-12">
      <div className="bg-gray-100">
        <!-- { /*variation dark set*/ } -->
        <div
          class="flex bg-white shadow-md justify-start md:justify-center rounded-lg overflow-x-scroll mx-auto md:mx-12 xs:mx-4 xs:justify-center"
        >
          <div v-for="date in arrayDate">
            <div ref="nowDate" v-if="date.getTime() === dateCurrent.getTime()">
              <!--- current day-->
              <div
                class="flex group bg-[#69B19B] hover:bg-[#80D2B9] shadow-lg dark-shadow rounded-lg mx-1 cursor-pointer justify-center relative w-16"
                @click="clickDate(date)"
              >
                <span
                  ref="targetDiv"
                  class="flex h-3 w-3 absolute -top-1 -right-1"
                >
                  <span
                    class="animate-ping absolute group-hover:opacity-75 opacity-0 inline-flex h-full w-full rounded-full bg-purple-400"
                  ></span>
                  <span
                    class="relative inline-flex rounded-full h-3 w-3 bg-[#F16C2A]"
                  ></span>
                </span>
                <div class="flex items-center px-4 py-4">
                  <div class="text-center">
                    <p class="text-gray-100 text-sm">
                      {{ date.toLocaleString("th-th", { weekday: "short" }) }}
                    </p>
                    <p class="text-gray-100 mt-3 font-bold">
                      {{ date.getDate() }}
                    </p>
                  </div>
                </div>
              </div>
              <!--- end-->
            </div>
            <div v-else>
              <!--- previous days-->
              <div
                class="flex group hover:bg-[#80D2B9] hover:shadow-lg hover-dark-shadow rounded-lg mx-1 transition-all duration-300 cursor-pointer justify-center w-16"
                @click="clickDate(date)"
              >
                <div class="flex items-center px-4 py-4">
                  <div class="text-center">
                    <p
                      class="text-gray-900 group-hover:text-gray-100 text-sm transition-all duration-300"
                    >
                      {{ date.toLocaleString("th-th", { weekday: "short" }) }}
                    </p>
                    <p
                      class="text-gray-900 group-hover:text-gray-100 mt-3 group-hover:font-bold transition-all duration-300"
                    >
                      {{ date.getDate() }}
                    </p>
                  </div>
                </div>
              </div>
              <!--- end-->
            </div>
          </div>

          <!--- end-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";

export default {
  setup() {
    let dateToday = new Date();
    let arrayDate = [];
    let dateCurrent = new Date();
    for (let i = 8; i >= 0; i--) {
      let result = dateToday.setDate(dateToday.getDate() - i);
      arrayDate.push(new Date(result));
      dateToday = new Date();
    }
    for (let i = 1; i <= 8; i++) {
      let result = dateToday.setDate(dateToday.getDate() + i);
      arrayDate.push(new Date(result));
      dateToday = new Date();
    }

    console.log(arrayDate);

    console.log(arrayDate[8].getTime() == dateToday.getTime());

    return {
      arrayDate,
      dateCurrent,
    };
  },
  data() {
    return {
      renderComplete: false,
    };
  },
  props: {
    callback: {
      type: Function,
    },
  },
  methods: {
    clickDate(date) {
      this.callback(date);
    },
  },
  mounted() {},
};
</script>

<style scoped></style>
