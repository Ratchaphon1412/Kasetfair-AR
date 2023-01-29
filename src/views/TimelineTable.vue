<script>
import { defineComponent } from "vue";
import FullCalendar from "@fullcalendar/vue3";
// import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import thLocale from "@fullcalendar/core/locales/th";
import { INITIAL_EVENTS, createEventId } from "../plugins/event-utils";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css"; // bootstrap icons
import bootstrap5Plugin from "@fullcalendar/bootstrap5";

import MapZone from "../components/MapZone.vue";
import TimeSlide from "../components/TimeSlide.vue";

export default defineComponent({
  components: {
    FullCalendar,
    MapZone,
    TimeSlide,
  },
  data() {
    return {
      calendarOptions: {
        plugins: [
          //   dayGridPlugin, // needed for dayGridWeek/dayGridDay
          timeGridPlugin, // needed for timeGridWeek/timeGridDay
          interactionPlugin, // needed for dateClick
          bootstrap5Plugin, // bootstrap5 theme
        ],
        // headerToolbar: false, // hide the header
        headerToolbar: {
          left: "title",

          right: "prev today next",
        },
        initialView: "timeGridDay", // start with the timeGridWeek view
        initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
        themeSystem: "bootstrap5", // bootstrap5 theme
        nowIndicator: true, // show the current time
        locale: thLocale, // locale for the calendar (thai)

        editable: false, // don't allow editing of events
        handleWindowResize: true, // allow the calendar to be responsive
        weekends: true, // show weekends mon - sun

        selectable: false, // don't allow selection of dates
        selectMirror: false, // when dragging, don't show the original event
        dayMaxEvents: true, // allow "more" link when too many events
        allDaySlot: false, // hide the all-day slot
        slotEventOverlap: false, //don't allow events to overlap
        eventMinHeight: 100, // minimum height of an event
        eventShortHeight: 100, // minimum height of an event
        views: {},

        //select: this.handleDateSelect, // this is the function that will be called when a date is selected
        eventClick: this.handleEventClick, // this is the function that will be called when an event is clicked
        // eventSet: this.handleEvents, // this is the function that will be called when events are set or reset

        events: [], // this is the array of events that will be displayed on the calendar

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
    getDate(date) {
      console.log(date);
    },
  },
});
</script>

<template>
  <TimeSlide :callback="getDate" />

  <div class="container mx-auto">
    <div class="grid grid-rows-1 grid-cols-12 grap-3">
      <div class="col-start-2 col-span-9 row-span-6">
        <MapZone />
      </div>
    </div>
  </div>

  <div class="w-full p-5">
    <div class="grid grid-cols-12 grid-rows-1">
      <div class="col-start-1 col-span-12 row-span-12">
        <FullCalendar
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
  </div>
</template>

<style lang="css">
#calendar {
  /* various CSS styles to make calendar*/
  background-color: #a0a8a0;
}

.fc-state-highlight {
  opacity: 0;
  border: none;
}

/* Styling for each event from Schedule */
.fc-time-grid-event.fc-v-event.fc-event {
  border-radius: 4px;
  border: none;
  padding: 5px;
  opacity: 0.65;
  left: 5% !important;
  right: 5% !important;
}

/* Bolds the name of the event and inherits the font size */
.fc-event {
  font-size: inherit !important;
  font-weight: bold !important;
}

/* Remove the header border from Schedule */
.fc td,
.fc th {
  border-style: none !important;
  border-color: black !important;
  border-width: 1px !important;
  padding: 0 !important;
  vertical-align: top !important;
  background-color: #b6c3c2 !important;
  color: #ffffff;
}

/* Inherits background for each event from Schedule. */
.fc-event .fc-bg {
  z-index: 1 !important;
  background: inherit !important;
  opacity: 0.25 !important;
}

/* Normal font weight for the time in each event */
.fc-time-grid-event .fc-time {
  font-weight: normal !important;
}

/* Apply same opacity to all day events */
.fc-ltr .fc-h-event.fc-not-end,
.fc-rtl .fc-h-event.fc-not-start {
  opacity: 0.65 !important;
  margin-left: 12px !important;
  padding: 5px !important;
}

/* Apply same opacity to all day events */
.fc-day-grid-event.fc-h-event.fc-event.fc-not-start.fc-end {
  opacity: 0.65 !important;
  margin-left: 12px !important;
  padding: 5px !important;
}

/* Material design button */
.fc-button {
  display: inline-block;
  position: relative;
  cursor: pointer;
  min-height: 36px;
  min-width: 88px;
  line-height: 36px;
  vertical-align: middle;
  -webkit-box-align: center;
  -webkit-align-items: center;
  align-items: center;
  text-align: center;
  border-radius: 2px;
  box-sizing: border-box;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  outline: none;
  border: 0;
  padding: 0 6px;
  margin: 6px 8px;
  letter-spacing: 0.01em;
  background: transparent;
  color: currentColor;
  white-space: nowrap;
  text-transform: uppercase;
  font-weight: 500;
  font-size: 14px;
  font-style: inherit;
  font-variant: inherit;
  font-family: inherit;
  text-decoration: none;
  overflow: hidden;
  -webkit-transition: box-shadow 0.4s cubic-bezier(0.25, 0.8, 0.25, 1),
    background-color 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  transition: box-shadow 0.4s cubic-bezier(0.25, 0.8, 0.25, 1),
    background-color 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.fc-button:hover {
  background-color: rgba(158, 158, 158, 0.2);
}

.fc-button:focus,
.fc-button:hover {
  text-decoration: none;
}

/* The active button box is ugly so the active button will have the same appearance of the hover */
.fc-state-active {
  background-color: rgba(158, 158, 158, 0.2);
}

/* Not raised button */
.fc-state-default {
  box-shadow: None;
}
.red {
  background-color: red;
}
</style>
