let eventGuid = 0
let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today

export const INITIAL_EVENTS = [


{
    id: createEventId(),
    title: "รำ 4 ภาค โรงเรียนสตรีวิทยา2",

    start: "2023-02-03T17:30:00",
    end: "2023-02-03T18:00:00",
    editable: false,
    backgroundColor: "#EAEAEA",
    textColor: "#2A5E5C",

    extendedProps: {
      description: "  ไม่มีข้อมูล",
      url:"https://www.google.com/maps/dir//เวทีสนามอินทร์+เกษตร/data=!4m6!4m5!1m1!4e2!1m2!1m1!1s0x30e29ce783fef46b:0xdfe8047a1944b34a?sa=X&ved=2ahUKEwiJrIanyO_8AhVgCLcAHaUsBC4Q9Rd6BAhXEAQ",
      location:"ณ พื้นที่ลานดาวหอประชุมใหญ่",
    },
  },{
    id: createEventId(),
    title: "การแสดงจากวิทยาเขตกำแพงแสน Nontri Band",

    start: "2023-02-03T18:00:00",
    end: "2023-02-03T21:00:00",
    editable: false,
    backgroundColor: "#EAEAEA",
    textColor: "#2A5E5C",

    extendedProps: {
      description: "  ไม่มีข้อมูล",
      url:"https://www.google.com/maps/dir//เวทีสนามอินทร์+เกษตร/data=!4m6!4m5!1m1!4e2!1m2!1m1!1s0x30e29ce783fef46b:0xdfe8047a1944b34a?sa=X&ved=2ahUKEwiJrIanyO_8AhVgCLcAHaUsBC4Q9Rd6BAhXEAQ",
      location:"ณ พื้นที่ลานดาวหอประชุมใหญ่",
    },
  },{
    id: createEventId(),
    title: "การแสดงจากวิทยาเขตเฉลิมพระเกียรติ จ.สกลนคร",
    start:"2023-02-04T18:00:00",
    end:"2023-02-04T21:00:00",
    editable: false,
    backgroundColor: "#EAEAEA",
    textColor: "#2A5E5C",
    extendedProps:{
      description:"ไม่มีข้อมูล",
      url:"https://www.google.com/maps/dir//เวทีสนามอินทร์+เกษตร/data=!4m6!4m5!1m1!4e2!1m2!1m1!1s0x30e29ce783fef46b:0xdfe8047a1944b34a?sa=X&ved=2ahUKEwiJrIanyO_8AhVgCLcAHaUsBC4Q9Rd6BAhXEAQ",
      location:"ณ พื้นที่ลานดาวหอประชุมใหญ่",
    }

  },{
    id: createEventId(),
    title: "การแสดงจากวิทยาเขต ศรีราชา ขบวนธง + วงสตริง",
    start:"2023-02-05T18:00:00",
    end:"2023-02-05T21:00:00",
    editable: false,
    backgroundColor: "#EAEAEA",
    textColor: "#2A5E5C",
    extendedProps:{
      description:"ไม่มีข้อมูล",
      url:"https://www.google.com/maps/dir//เวทีสนามอินทร์+เกษตร/data=!4m6!4m5!1m1!4e2!1m2!1m1!1s0x30e29ce783fef46b:0xdfe8047a1944b34a?sa=X&ved=2ahUKEwiJrIanyO_8AhVgCLcAHaUsBC4Q9Rd6BAhXEAQ",
      location:"ณ พื้นที่ลานดาวหอประชุมใหญ่",
    }
  },{
    id: createEventId(),
    title: "ดนตรีไทย + นาฏศิลป์ + โขนละคอน",
    start:"2023-02-06T18:00:00",
    end:"2023-02-06T20:00:00",
    editable: false,
    backgroundColor: "#EAEAEA",
    textColor: "#2A5E5C",
    extendedProps:{
      description:"ไม่มีข้อมูล",
      url:"https://www.google.com/maps/dir//เวทีสนามอินทร์+เกษตร/data=!4m6!4m5!1m1!4e2!1m2!1m1!1s0x30e29ce783fef46b:0xdfe8047a1944b34a?sa=X&ved=2ahUKEwiJrIanyO_8AhVgCLcAHaUsBC4Q9Rd6BAhXEAQ",
      location:"ณ พื้นที่ลานดาวหอประชุมใหญ่",
    }
  },{
    id: createEventId(),
    title: "วงดนตรีสตริง รร.สาธิต มศว.",
    start:"2023-02-07T17:30:00",
    end:"2023-02-07T18:00:00",
    editable: false,
    backgroundColor: "#EAEAEA",
    textColor: "#2A5E5C",
    extendedProps:{
      description:"ไม่มีข้อมูล",
      url:"https://www.google.com/maps/dir//เวทีสนามอินทร์+เกษตร/data=!4m6!4m5!1m1!4e2!1m2!1m1!1s0x30e29ce783fef46b:0xdfe8047a1944b34a?sa=X&ved=2ahUKEwiJrIanyO_8AhVgCLcAHaUsBC4Q9Rd6BAhXEAQ",
      location:"ณ พื้นที่ลานดาวหอประชุมใหญ่",
    }
  },{
    id: createEventId(),
    title: "Cover Dance รร.ฤืธิยะวรรณาลัย",
    start:"2023-02-07T18:00:00",
    end:"2023-02-07T18:30:00",
    editable: false,
    backgroundColor: "#EAEAEA",
    textColor: "#2A5E5C",
    extendedProps:{
      description:"ไม่มีข้อมูล",
      url:"https://www.google.com/maps/dir//เวทีสนามอินทร์+เกษตร/data=!4m6!4m5!1m1!4e2!1m2!1m1!1s0x30e29ce783fef46b:0xdfe8047a1944b34a?sa=X&ved=2ahUKEwiJrIanyO_8AhVgCLcAHaUsBC4Q9Rd6BAhXEAQ",
      location:"ณ พื้นที่ลานดาวหอประชุมใหญ่",
    }
  },{
    id: createEventId(),
    title: "KU Chorus",
    start:"2023-02-07T18:30:00",
    end:"2023-02-07T19:30:00",
    editable: false,
    backgroundColor: "#EAEAEA",
    textColor: "#2A5E5C",
    extendedProps:{
      description:"ไม่มีข้อมูล",
      url:"https://www.google.com/maps/dir//เวทีสนามอินทร์+เกษตร/data=!4m6!4m5!1m1!4e2!1m2!1m1!1s0x30e29ce783fef46b:0xdfe8047a1944b34a?sa=X&ved=2ahUKEwiJrIanyO_8AhVgCLcAHaUsBC4Q9Rd6BAhXEAQ",
      location:"ณ พื้นที่ลานดาวหอประชุมใหญ่",
    }
  },{
    id: createEventId(),
    title: "KDC",
    start:"2023-02-07T19:30:00",
    end:"2023-02-07T20:00:00",
    editable: false,
    backgroundColor: "#EAEAEA",
    textColor: "#2A5E5C",
    extendedProps:{
      description:"ไม่มีข้อมูล",
      url:"https://www.google.com/maps/dir//เวทีสนามอินทร์+เกษตร/data=!4m6!4m5!1m1!4e2!1m2!1m1!1s0x30e29ce783fef46b:0xdfe8047a1944b34a?sa=X&ved=2ahUKEwiJrIanyO_8AhVgCLcAHaUsBC4Q9Rd6BAhXEAQ",
      location:"ณ พื้นที่ลานดาวหอประชุมใหญ่",
    }
  },{
    id: createEventId(),
    title: "อคูสติก",
    start:"2023-02-07T20:00:00",
    end:"2023-02-07T21:00:00",
    editable: false,
    backgroundColor: "#EAEAEA",
    textColor: "#2A5E5C",
    extendedProps:{
      description:"ไม่มีข้อมูล",
      url:"https://www.google.com/maps/dir//เวทีสนามอินทร์+เกษตร/data=!4m6!4m5!1m1!4e2!1m2!1m1!1s0x30e29ce783fef46b:0xdfe8047a1944b34a?sa=X&ved=2ahUKEwiJrIanyO_8AhVgCLcAHaUsBC4Q9Rd6BAhXEAQ",
      location:"ณ พื้นที่ลานดาวหอประชุมใหญ่",
    }
  },{
    id: createEventId(),
    title: "Cover Dance รร.สตรีนนทบุรี",
    start:"2023-02-08T17:00:00",
    end:"2023-02-08T17:30:00",
    editable: false,
    backgroundColor: "#EAEAEA",
    textColor: "#2A5E5C",
    extendedProps:{
      description:"ไม่มีข้อมูล",
      url:"https://www.google.com/maps/dir//เวทีสนามอินทร์+เกษตร/data=!4m6!4m5!1m1!4e2!1m2!1m1!1s0x30e29ce783fef46b:0xdfe8047a1944b34a?sa=X&ved=2ahUKEwiJrIanyO_8AhVgCLcAHaUsBC4Q9Rd6BAhXEAQ",
      location:"ณ พื้นที่ลานดาวหอประชุมใหญ่",
    }
  },{
    id: createEventId(),
    title: "ชมรมเชียร์",
    start:"2023-02-08T17:30:00",
    end:"2023-02-08T18:00:00",
    editable: false,
    backgroundColor: "#EAEAEA",
    textColor: "#2A5E5C",
    extendedProps:{
      description:"ไม่มีข้อมูล",
      url:"https://www.google.com/maps/dir//เวทีสนามอินทร์+เกษตร/data=!4m6!4m5!1m1!4e2!1m2!1m1!1s0x30e29ce783fef46b:0xdfe8047a1944b34a?sa=X&ved=2ahUKEwiJrIanyO_8AhVgCLcAHaUsBC4Q9Rd6BAhXEAQ",
      location:"ณ พื้นที่ลานดาวหอประชุมใหญ่",
    }
  },{
    id: createEventId(),
    title: "KDC",
    start:"2023-02-08T18:00:00",
    end:"2023-02-08T18:30:00",
    editable: false,
    backgroundColor: "#EAEAEA",
    textColor: "#2A5E5C",
    extendedProps:{
      description:"ไม่มีข้อมูล",
      url:"https://www.google.com/maps/dir//เวทีสนามอินทร์+เกษตร/data=!4m6!4m5!1m1!4e2!1m2!1m1!1s0x30e29ce783fef46b:0xdfe8047a1944b34a?sa=X&ved=2ahUKEwiJrIanyO_8AhVgCLcAHaUsBC4Q9Rd6BAhXEAQ",
      location:"ณ พื้นที่ลานดาวหอประชุมใหญ่",
    }
  },{
    id: createEventId(),
    title: "นิสิตอีสาน",
    start:"2023-02-08T18:30:00",
    end:"2023-02-08T20:00:00",
    editable: false,
    backgroundColor: "#EAEAEA",
    textColor: "#2A5E5C",
    extendedProps:{
      description:"ไม่มีข้อมูล",
      url:"https://www.google.com/maps/dir//เวทีสนามอินทร์+เกษตร/data=!4m6!4m5!1m1!4e2!1m2!1m1!1s0x30e29ce783fef46b:0xdfe8047a1944b34a?sa=X&ved=2ahUKEwiJrIanyO_8AhVgCLcAHaUsBC4Q9Rd6BAhXEAQ",
      location:"ณ พื้นที่ลานดาวหอประชุมใหญ่",
    }
  },{
    id: createEventId(),
    title: "อคูสติก",
    start:"2023-02-08T20:00:00",
    end:"2023-02-08T21:00:00",
    editable: false,
    backgroundColor: "#EAEAEA",
    textColor: "#2A5E5C",
    extendedProps:{
      description:"ไม่มีข้อมูล",
      url:"https://www.google.com/maps/dir//เวทีสนามอินทร์+เกษตร/data=!4m6!4m5!1m1!4e2!1m2!1m1!1s0x30e29ce783fef46b:0xdfe8047a1944b34a?sa=X&ved=2ahUKEwiJrIanyO_8AhVgCLcAHaUsBC4Q9Rd6BAhXEAQ",
      location:"ณ พื้นที่ลานดาวหอประชุมใหญ่",
    }
  },{
    id: createEventId(),
    title: "วงดนตรีเพื่อชีวิต รร.วรรณาลัย",
    start:"2023-02-09T17:30:00",
    end:"2023-02-09T18:00:00",
    editable: false,
    backgroundColor: "#EAEAEA",
    textColor: "#2A5E5C",
    extendedProps:{
      description:"ไม่มีข้อมูล",
      url:"https://www.google.com/maps/dir//เวทีสนามอินทร์+เกษตร/data=!4m6!4m5!1m1!4e2!1m2!1m1!1s0x30e29ce783fef46b:0xdfe8047a1944b34a?sa=X&ved=2ahUKEwiJrIanyO_8AhVgCLcAHaUsBC4Q9Rd6BAhXEAQ",
      location:"ณ พื้นที่ลานดาวหอประชุมใหญ่",
    }
  },{
    id: createEventId(),
    title: "KU Chorus",
    start:"2023-02-09T18:00:00",
    end:"2023-02-09T19:00:00",
    editable: false,
    backgroundColor: "#EAEAEA",
    textColor: "#2A5E5C",
    extendedProps:{
      description:"ไม่มีข้อมูล",
      url:"https://www.google.com/maps/dir//เวทีสนามอินทร์+เกษตร/data=!4m6!4m5!1m1!4e2!1m2!1m1!1s0x30e29ce783fef46b:0xdfe8047a1944b34a?sa=X&ved=2ahUKEwiJrIanyO_8AhVgCLcAHaUsBC4Q9Rd6BAhXEAQ",
      location:"ณ พื้นที่ลานดาวหอประชุมใหญ่",
    }
  },{
    id: createEventId(),
    title: "วง Yellow brown band รร.หอวัง กทม.",
    start:"2023-02-09T19:00:00",
    end:"2023-02-09T19:30:00",
    editable: false,
    backgroundColor: "#EAEAEA",
    textColor: "#2A5E5C",
    extendedProps:{
      description:"ไม่มีข้อมูล",
      url:"https://www.google.com/maps/dir//เวทีสนามอินทร์+เกษตร/data=!4m6!4m5!1m1!4e2!1m2!1m1!1s0x30e29ce783fef46b:0xdfe8047a1944b34a?sa=X&ved=2ahUKEwiJrIanyO_8AhVgCLcAHaUsBC4Q9Rd6BAhXEAQ",
      location:"ณ พื้นที่ลานดาวหอประชุมใหญ่",
    }
  },{
    id: createEventId(),
    title: "ชาวเหนือ",
    start:"2023-02-09T19:30:00",
    end:"2023-02-09T21:00:00",
    editable: false,
    backgroundColor: "#EAEAEA",
    textColor: "#2A5E5C",
    extendedProps:{
      description:"ไม่มีข้อมูล",
      url:"https://www.google.com/maps/dir//เวทีสนามอินทร์+เกษตร/data=!4m6!4m5!1m1!4e2!1m2!1m1!1s0x30e29ce783fef46b:0xdfe8047a1944b34a?sa=X&ved=2ahUKEwiJrIanyO_8AhVgCLcAHaUsBC4Q9Rd6BAhXEAQ",
      location:"ณ พื้นที่ลานดาวหอประชุมใหญ่",
    }
  },{
    id: createEventId(),
    title: "รร. Princess สาธิต มศว. (อคูสติก)",
    start:"2023-02-10T17:00:00",
    end:"2023-02-10T18:00:00",
    editable: false,
    backgroundColor: "#EAEAEA",
    textColor: "#2A5E5C",
    extendedProps:{
      description:"ไม่มีข้อมูล",
      url:"https://www.google.com/maps/dir//เวทีสนามอินทร์+เกษตร/data=!4m6!4m5!1m1!4e2!1m2!1m1!1s0x30e29ce783fef46b:0xdfe8047a1944b34a?sa=X&ved=2ahUKEwiJrIanyO_8AhVgCLcAHaUsBC4Q9Rd6BAhXEAQ",
      location:"ณ พื้นที่ลานดาวหอประชุมใหญ่",
    }
  },{
    id: createEventId(),
    title: "ชนรมดนตรีสากล มหาวิทยาลัยเกษตรศาสตร์ (KU Band)",
    start:"2023-02-10T18:00:00",
    end:"2023-02-10T21:00:00",
    editable: false,
    backgroundColor: "#EAEAEA",
    textColor: "#2A5E5C",
    extendedProps:{
      description:"ไม่มีข้อมูล",
      url:"https://www.google.com/maps/dir//เวทีสนามอินทร์+เกษตร/data=!4m6!4m5!1m1!4e2!1m2!1m1!1s0x30e29ce783fef46b:0xdfe8047a1944b34a?sa=X&ved=2ahUKEwiJrIanyO_8AhVgCLcAHaUsBC4Q9Rd6BAhXEAQ",
      location:"ณ พื้นที่ลานดาวหอประชุมใหญ่",
    }
  },{
    id: createEventId(),
    title: "วงดนตรีลูกทุ่งไทย รร.ราชวินิต บางเขน",
    start:"2023-02-11T17:00:00",
    end:"2023-02-11T18:00:00",
    editable: false,
    backgroundColor: "#EAEAEA",
    textColor: "#2A5E5C",
    extendedProps:{
      description:"ไม่มีข้อมูล",
      url:"https://www.google.com/maps/dir//เวทีสนามอินทร์+เกษตร/data=!4m6!4m5!1m1!4e2!1m2!1m1!1s0x30e29ce783fef46b:0xdfe8047a1944b34a?sa=X&ved=2ahUKEwiJrIanyO_8AhVgCLcAHaUsBC4Q9Rd6BAhXEAQ",
      location:"ณ พื้นที่ลานดาวหอประชุมใหญ่",
    }
  },{
    id: createEventId(),
    title: "ชมรมวงดนตรีรวมดาวกระจุย",
    start:"2023-02-11T18:00:00",
    end:"2023-02-11T21:00:00",
    editable: false,
    backgroundColor: "#EAEAEA",
    textColor: "#2A5E5C",
    extendedProps:{
      description:"ไม่มีข้อมูล",
      url:"https://www.google.com/maps/dir//เวทีสนามอินทร์+เกษตร/data=!4m6!4m5!1m1!4e2!1m2!1m1!1s0x30e29ce783fef46b:0xdfe8047a1944b34a?sa=X&ved=2ahUKEwiJrIanyO_8AhVgCLcAHaUsBC4Q9Rd6BAhXEAQ",
      location:"ณ พื้นที่ลานดาวหอประชุมใหญ่",
    }
  },

    

]

export function createEventId() {
  return String(eventGuid++)
}