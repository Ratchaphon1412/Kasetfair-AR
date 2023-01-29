let eventGuid = 0
let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today

export const INITIAL_EVENTS = [
{
    id: createEventId(),
    title: "my event",
    start: "2023-01-30T10:30:00",
    end: "2023-01-30T11:30:00",
    editable: false,
    backgroundColor: "#C2185B",
    textColor: "#ffffff",

    extendedProps: {
      department: "BioChemistry",
    },
    description: "Lecture",
  },
  {
    id: createEventId(),
    title: "my event2",
    start: "2023-01-30T10:30:00",
    end: "2023-01-30T11:30:00",
    editable: false,
    // backgroundColor: "#000000",
    textColor: "#ffffff",

    extendedProps: {
      department: "BioChemistry",
    },
    description: "Lecture",
  },

]

export function createEventId() {
  return String(eventGuid++)
}