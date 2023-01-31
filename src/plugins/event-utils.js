let eventGuid = 0
let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today

export const INITIAL_EVENTS = [
{
    id: createEventId(),
    title: "แสดงกลองสถาปัตย์",
    url:"https://www.google.com/maps/dir//เวทีสนามอินทร์+เกษตร/data=!4m6!4m5!1m1!4e2!1m2!1m1!1s0x30e29ce783fef46b:0xdfe8047a1944b34a?sa=X&ved=2ahUKEwiJrIanyO_8AhVgCLcAHaUsBC4Q9Rd6BAhXEAQ",
    start: "2023-01-30T10:30:00",
    end: "2023-01-30T11:30:00",
    editable: false,
    backgroundColor: "#EAEAEA",
    textColor: "#2A5E5C",

    extendedProps: {
      description: "  Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique dolores commodi reprehenderit ad repudiandae non quia nostrum quis error voluptates corrupti quam sequi aut, deserunt magnam qui quaerat, impedit quidem.",
      location:"เวทีสนามอินทร์",
    },
    
  },
  {
    id: createEventId(),
    title: "ชมรมดาวกระจุย",
    url:"https://www.google.com/maps/dir//เวทีสนามอินทร์+เกษตร/data=!4m6!4m5!1m1!4e2!1m2!1m1!1s0x30e29ce783fef46b:0xdfe8047a1944b34a?sa=X&ved=2ahUKEwiJrIanyO_8AhVgCLcAHaUsBC4Q9Rd6BAhXEAQ",
    start: "2023-01-30T10:30:00",
    end: "2023-01-30T11:45:00",
    editable: false,
    backgroundColor: "#EAEAEA",
    textColor: "#2A5E5C",

    extendedProps: {
      description: "  Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique dolores commodi reprehenderit ad repudiandae non quia nostrum quis error voluptates corrupti quam sequi aut, deserunt magnam qui quaerat, impedit quidem.",
      location:"เวทีสนามอินทร์",
    },
  
  },

]

export function createEventId() {
  return String(eventGuid++)
}