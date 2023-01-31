<template>
  <!-- Main modal -->
  <!-- Small Modal -->
  <div
    id="small-modal"
    tabindex="-1"
    class="popup fixed top-0 left-0 right-0 bottom-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full"
  >
    <div class="relative w-full h-full max-w-md md:h-auto">
      <!-- Modal content -->
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <!-- Modal header -->
        <div
          class="flex items-center justify-between p-5 border-b rounded-t dark:border-gray-600"
        >
          <h3 class="text-xl font-medium text-gray-900 dark:text-gray-400">
            {{ event.event.title }}
          </h3>

          <button
            type="button"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-hide="small-modal"
            @click="closeModal"
          >
            <svg
              aria-hidden="true"
              class="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              ></path>
            </svg>
            <span class="sr-only">Close modal</span>
          </button>
        </div>
        <!-- Modal body -->
        <div class="p-6 space-y-6">
          <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
            {{
              event.event._instance.range.start.toLocaleDateString("th-TH", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })
            }}
            {{ event.event._instance.range.start.toLocaleTimeString("th-TH") }}
            - {{ event.event._instance.range.end.toLocaleTimeString("th-TH") }}
          </p>
          <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
            {{ event.event.extendedProps.location }}
          </p>
          <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
            {{ event.event.extendedProps.description }}
          </p>
          <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
            <a :href="event.event.extendedProps.url">แผนที่</a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    event: {
      type: Object,
      required: true,
    },
    close: {
      type: Function,
      required: true,
    },
  },
  methods: {
    closeModal() {
      this.close();
    },
  },
};
</script>

<style scoped>
.popup {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  align-items: center;
  justify-content: center;
  display: flex;
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
