<script>
import { defineComponent } from "vue";
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { INITIAL_EVENTS, createEventId } from "../plugins/event-utils";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css"; // bootstrap icons
import bootstrap5Plugin from "@fullcalendar/bootstrap5";

export default defineComponent({
  components: {
    FullCalendar,
  },
  data() {
    return {
      calendarOptions: {
        plugins: [
          dayGridPlugin,
          timeGridPlugin,
          interactionPlugin, // needed for dateClick
          bootstrap5Plugin,
        ],
        headerToolbar: {
          right: "prev today next",
        },

        initialView: "timeGridDay",
        initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
        themeSystem: "bootstrap5",
        nowIndicator: true,

        editable: false,
        handleWindowResize: true,
        weekends: false,
        header: false,

        selectable: true,
        selectMirror: true,
        dayMaxEvents: true,
        allDaySlot: false,
        slotEventOverlap: false,
        eventMinHeight: 30,
        eventShortHeight: 50,

        select: this.handleDateSelect,
        eventClick: this.handleEventClick,
        eventSet: this.handleEvents,
        events: [
          {
            id: 1,
            title: "my event",
            start: "2023-01-30T10:30:00",
            end: "2023-01-30T11:30:00",
            editable: false,
            backgroundColor: "#ff0000",
            textColor: "#ffffff",

            extendedProps: {
              department: "BioChemistry",
            },
            description: "Lecture",
          },
          {
            id: 2,
            title: "my event2",
            start: "2023-01-30T10:30:00",
            end: "2023-01-30T11:30:00",
            editable: false,
            backgroundColor: "#000000",
            textColor: "#ffffff",

            extendedProps: {
              department: "BioChemistry",
            },
            description: "Lecture",
          },
        ],

        /* you can update a remote database when these fire:
        eventAdd:
        eventChange:
        eventRemove:
        */
      },
      currentEvents: [],
    };
  },
  methods: {
    handleWeekendsToggle() {
      this.calendarOptions.weekends = !this.calendarOptions.weekends; // update a property
    },
    handleDateSelect(selectInfo) {
      let title = prompt("Please enter a new title for your event");
      let calendarApi = selectInfo.view.calendar;
      calendarApi.unselect(); // clear date selection
      if (title) {
        calendarApi.addEvent({
          id: createEventId(),
          title,
          start: selectInfo.startStr,
          end: selectInfo.endStr,
          allDay: selectInfo.allDay,
        });
      }
    },
    handleEventClick(clickInfo) {
      if (
        confirm(
          `Are you sure you want to delete the event '${clickInfo.event.title}'`
        )
      ) {
        clickInfo.event.remove();
      }
    },
    handleEvents(events) {
      this.currentEvents = events;
    },
  },
});
</script>

<template>
  <div class="demo-app">
    <div class="demo-app-main">
      <FullCalendar
        class="demo-app-calendar"
        :options="calendarOptions"
        :buttonIcons="{
          prev: 'bi bi-arrow-left-circle-fill',
          next: 'bi bi-arrow-right-circle-fill',
          prevYear: 'bi bi-arrow-left-circle-fill',
          nextYear: 'bi bi-arrow-right-circle-fill',
        }"
      >
        <template v-slot:eventContent="arg">
          <b>{{ arg.timeText }}</b>
          <i>{{ arg.event.title }}</i>
        </template>
      </FullCalendar>
    </div>
  </div>
</template>

<style lang="css"></style>
