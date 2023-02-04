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
      url:"https://goo.gl/maps/ppqdfSmCtXjXABcUA",
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
      url:"https://goo.gl/maps/ppqdfSmCtXjXABcUA",
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
      url:"https://goo.gl/maps/ppqdfSmCtXjXABcUA",
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
      url:"https://goo.gl/maps/ppqdfSmCtXjXABcUA",
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
      url:"https://goo.gl/maps/ppqdfSmCtXjXABcUA",
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
      url:"https://goo.gl/maps/ppqdfSmCtXjXABcUA",
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
      url:"https://goo.gl/maps/ppqdfSmCtXjXABcUA",
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
      url:"https://goo.gl/maps/ppqdfSmCtXjXABcUA",
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
      url:"https://goo.gl/maps/ppqdfSmCtXjXABcUA",
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
      url:"https://goo.gl/maps/ppqdfSmCtXjXABcUA",
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
      url:"https://goo.gl/maps/ppqdfSmCtXjXABcUA",
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
      url:"https://goo.gl/maps/ppqdfSmCtXjXABcUA",
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
      url:"https://goo.gl/maps/ppqdfSmCtXjXABcUA",
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
      url:"https://goo.gl/maps/ppqdfSmCtXjXABcUA",
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
      url:"https://goo.gl/maps/ppqdfSmCtXjXABcUA",
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
      url:"https://goo.gl/maps/ppqdfSmCtXjXABcUA",
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
      url:"https://goo.gl/maps/ppqdfSmCtXjXABcUA",
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
      url:"https://goo.gl/maps/ppqdfSmCtXjXABcUA",
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
      url:"https://goo.gl/maps/ppqdfSmCtXjXABcUA",
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
      url:"https://goo.gl/maps/ppqdfSmCtXjXABcUA",
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
      url:"https://goo.gl/maps/ppqdfSmCtXjXABcUA",
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
      url:"https://goo.gl/maps/ppqdfSmCtXjXABcUA",
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
      url:"https://goo.gl/maps/ppqdfSmCtXjXABcUA",
      location:"ณ พื้นที่ลานดาวหอประชุมใหญ่",
    }
  },{
    id: createEventId(),
    title: "การประกวดผลไม้ประจำปี",
    start: "2023-02-03T09:00:00",
    end: "2023-02-03T13:00:00",
    editable: false,
    backgroundColor: "#EAEAEA",
    textColor: "#2A5E5C",

    extendedProps: {
      description: "ไม่มีข้อมูล",
      url:"https://goo.gl/maps/PGAtnX6CbHnX218h7",
      location:"ณ อาคารจักรพันธ์เพ็ญศิริ คณะเกษตร ภาควิชาพืชสวน กรมส่งเสริมการเกษตร กรมวิชาการเกษตร",
    },
},{
    id: createEventId(),
    title: "การประกวดไม้ประดับประจำปี",
    start: "2023-02-03T13:00:00",
    end: "2023-02-03T17:00:00",
    editable: false,
    backgroundColor: "#EAEAEA",
    textColor: "#2A5E5C",

    extendedProps: {
      description: "ไม่มีข้อมูล",
      url:"https://goo.gl/maps/jXCGnsCFcxna9TFq6",
      location:"ณ ชั้น 1 อาคารวชิรานุสรณ์ คณะเกษตร ภาควิชาพืชสวน ชมรมผู้พัฒนาไม้ประดับ",
    },
},{
    id: createEventId(),
    title: "การประกวดกล้วยไม้ตัดดอก",
    start: "2023-02-04T09:00:00",
    end: "2023-02-04T22:00:00",
    editable: false,
    backgroundColor: "#EAEAEA",
    textColor: "#2A5E5C",

    extendedProps: {
      description: "ไม่มีข้อมูล",
      url:"https://goo.gl/maps/jXCGnsCFcxna9TFq6",
      location:"ณ ชั้น 1 อาคารวชิรานุสรณ์ คณะเกษตร ภาควิชาพืชสวน",
    },
},{
    id: createEventId(),
    title: "การประกวด แพะ และ แกะ",
    start: "2023-02-04T09:00:00",
    end: "2023-02-04T22:00:00",
    editable: false,
    backgroundColor: "#EAEAEA",
    textColor: "#2A5E5C",

    extendedProps: {
      description: "ไม่มีข้อมูล",
      url:"https://goo.gl/maps/sVSHwr4RHP4krjdd9",
      location:"ณ ลานเอนกประสงค์ ตึกจรัด คณะเกษตร ภาควิชาสัตวบาล",
    },
},{
    id: createEventId(),
    title: "การประกวดกล้วยไม้ประดับประจำปี",
    start: "2023-02-05T09:00:00",
    end: "2023-02-05T22:00:00",
    editable: false,
    backgroundColor: "#EAEAEA",
    textColor: "#2A5E5C",

    extendedProps: {
      description: "ไม่มีข้อมูล",
      url:"https://goo.gl/maps/jXCGnsCFcxna9TFq6",
      location:"ณ โถงชั้น 1 อาคารวชิรานุสรณ์คณะเกษตร",
    },
},{
    id: createEventId(),
    title: "ร้อยสร้อยหิน",
    start: "2023-02-04T10:00:00",
    end: "2023-02-04T12:00:00",
    editable: false,
    backgroundColor: "#EAEAEA",
    textColor: "#2A5E5C",
    extendedProps: {
      description: "ไม่มีข้อมูล",
      url:"https://goo.gl/maps/jXCGnsCFcxna9TFq6",
      location:"ณ บูธคณะวิทยาศาสตร์",
    },

},{
  id: createEventId(),
  title: "ร้อยสร้อยหิน",
  start: "2023-02-04T13:00:00",
  end: "2023-02-04T15:00:00",
  editable: false,
  backgroundColor: "#EAEAEA",
  textColor: "#2A5E5C",
  extendedProps: {
    description: "ไม่มีข้อมูล",
    url:"https://www.google.com/maps/dir/13.9085504,100.6734753/คณะวิทยาศาสตร์+ม+เกษตร/@13.8753378,100.547637,12z/data=!3m1!4b1!4m9!4m8!1m1!4e1!1m5!1m1!1s0x30e29ce0f9dc88cd:0x632e76e061542acc!2m2!1d100.5718449!2d13.8446263",
    location:"ณ บูธคณะวิทยาศาสตร์",
  },

},{
  id: createEventId(),
  title:"กิมจิิ",
  start: "2023-02-05T10:00:00",
  end: "2023-02-05T12:00:00",
  editable: false,
  backgroundColor: "#EAEAEA",
  textColor: "#2A5E5C",
  extendedProps: {
    description: "ไม่มีข้อมูล",
    url:"https://www.google.com/maps/dir/13.9085504,100.6734753/คณะวิทยาศาสตร์+ม+เกษตร/@13.8753378,100.547637,12z/data=!3m1!4b1!4m9!4m8!1m1!4e1!1m5!1m1!1s0x30e29ce0f9dc88cd:0x632e76e061542acc!2m2!1d100.5718449!2d13.8446263",
    location:"ณ บูธคณะวิทยาศาสตร์",
  },
  

},{
  id: createEventId(),
  title:"เทมเป้",
  start:"2023-02-05T13:00:00",
  end:"2023-02-05T15:00:00",
  editable: false,
  backgroundColor: "#EAEAEA",
  textColor: "#2A5E5C",
  extendedProps: {
    description: "ไม่มีข้อมูล",
    url:"https://www.google.com/maps/dir/13.9085504,100.6734753/คณะวิทยาศาสตร์+ม+เกษตร/@13.8753378,100.547637,12z/data=!3m1!4b1!4m9!4m8!1m1!4e1!1m5!1m1!1s0x30e29ce0f9dc88cd:0x632e76e061542acc!2m2!1d100.5718449!2d13.8446263",
    location:"ณ บูธคณะวิทยาศาสตร์",
  },


},{
  id: createEventId(),
  title:"Hologram 3D",
  start:"2023-02-06T10:00:00",
  end:"2023-02-06T12:00:00",
  editable: false,
  backgroundColor: "#EAEAEA",
  textColor: "#2A5E5C",
  extendedProps: {
    description: "ไม่มีข้อมูล",
    url:"https://www.google.com/maps/dir/13.9085504,100.6734753/คณะวิทยาศาสตร์+ม+เกษตร/@13.8753378,100.547637,12z/data=!3m1!4b1!4m9!4m8!1m1!4e1!1m5!1m1!1s0x30e29ce0f9dc88cd:0x632e76e061542acc!2m2!1d100.5718449!2d13.8446263",
    location:"ณ บูธคณะวิทยาศาสตร์",
  },
},{
  id: createEventId(),
  title:"กิมจิิ",
  start: "2023-02-07T10:00:00",
  end: "2023-02-07T12:00:00",
  editable: false,
  backgroundColor: "#EAEAEA",
  textColor: "#2A5E5C",
  extendedProps: {
    description: "ไม่มีข้อมูล",
    url:"https://www.google.com/maps/dir/13.9085504,100.6734753/คณะวิทยาศาสตร์+ม+เกษตร/@13.8753378,100.547637,12z/data=!3m1!4b1!4m9!4m8!1m1!4e1!1m5!1m1!1s0x30e29ce0f9dc88cd:0x632e76e061542acc!2m2!1d100.5718449!2d13.8446263",
    location:"ณ บูธคณะวิทยาศาสตร์",
  },
  

},{
  id: createEventId(),
  title:"โยเกิร์ตเห็ด",
  start: "2023-02-07T13:00:00",
  end: "2023-02-07T15:00:00",
  editable: false,
  backgroundColor: "#EAEAEA",
  textColor: "#2A5E5C",
  extendedProps: {
    description: "ไม่มีข้อมูล",
    url:"https://www.google.com/maps/dir/13.9085504,100.6734753/คณะวิทยาศาสตร์+ม+เกษตร/@13.8753378,100.547637,12z/data=!3m1!4b1!4m9!4m8!1m1!4e1!1m5!1m1!1s0x30e29ce0f9dc88cd:0x632e76e061542acc!2m2!1d100.5718449!2d13.8446263",
    location:"ณ บูธคณะวิทยาศาสตร์",
  },
  

},{
  id: createEventId(),
  title:"เทมเป้",
  start:"2023-02-09T10:00:00",
  end:"2023-02-09T12:00:00",
  editable: false,
  backgroundColor: "#EAEAEA",
  textColor: "#2A5E5C",
  extendedProps: {
    description: "ไม่มีข้อมูล",
    url:"https://www.google.com/maps/dir/13.9085504,100.6734753/คณะวิทยาศาสตร์+ม+เกษตร/@13.8753378,100.547637,12z/data=!3m1!4b1!4m9!4m8!1m1!4e1!1m5!1m1!1s0x30e29ce0f9dc88cd:0x632e76e061542acc!2m2!1d100.5718449!2d13.8446263",
    location:"ณ บูธคณะวิทยาศาสตร์",
  },
},{
  id: createEventId(),
  title:"โยเกิร์ตเห็ด",
  start:"2023-02-09T13:00:00",
  end:"2023-02-09T15:00:00",
  editable: false,
  backgroundColor: "#EAEAEA",
  textColor: "#2A5E5C",
  extendedProps: {
    description: "ไม่มีข้อมูล",
    url:"https://www.google.com/maps/dir/13.9085504,100.6734753/คณะวิทยาศาสตร์+ม+เกษตร/@13.8753378,100.547637,12z/data=!3m1!4b1!4m9!4m8!1m1!4e1!1m5!1m1!1s0x30e29ce0f9dc88cd:0x632e76e061542acc!2m2!1d100.5718449!2d13.8446263",
    location:"ณ บูธคณะวิทยาศาสตร์",
  },



},{
  id: createEventId(),
  title:"Hologram 3D",
  start:"2023-02-10T10:00:00",
  end:"2023-02-10T12:00:00",
  editable: false,
  backgroundColor: "#EAEAEA",
  textColor: "#2A5E5C",
  extendedProps: {
    description: "ไม่มีข้อมูล",
    url:"https://www.google.com/maps/dir/13.9085504,100.6734753/คณะวิทยาศาสตร์+ม+เกษตร/@13.8753378,100.547637,12z/data=!3m1!4b1!4m9!4m8!1m1!4e1!1m5!1m1!1s0x30e29ce0f9dc88cd:0x632e76e061542acc!2m2!1d100.5718449!2d13.8446263",
    location:"ณ บูธคณะวิทยาศาสตร์",
  },
}
  
    

]

export function createEventId() {
  return String(eventGuid++)
}