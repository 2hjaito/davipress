// tutorial.config.ts
export interface TutorialConfigItem {
  text: string
  link?: string           // Nếu là trang cụ thể
  icon?: string
  children?: TutorialConfigItem[]
  collapsible?: boolean   // true = có thể đóng/mở, false = luôn mở nếu có children
}

export const tutorialSidebar: TutorialConfigItem[] = [
  {
    text: "Nhẫn thuật Naruto",
    collapsible: false,
    children: [
      {
        text: "Tổng quan",
        link: "/tutorial/naruto-ninjutsu",
      },
      {
        text: "Rasengan",
        link: "/tutorial/naruto-ninjutsu/naruto-ninjutsu-rasengan",
      },
      {
        text: "Hiraishin no Jutsu",
        link: "/tutorial/naruto-ninjutsu/naruto-ninjutsu-hiraishin",
      },
      {
        text: "Chidori",
        link: "/tutorial/naruto-ninjutsu/naruto-ninjutsu-chidori",
      },
      {
        text: "Rasenshuriken",
        link: "/tutorial/naruto-ninjutsu/naruto-ninjutsu-rasenshuriken",
      },
    ]
  },
  {
    text: "No Jutsu",
    collapsible: false, // dropdown
    children: [
      {
        text: "Rasengan",
        icon: "GiCircleSparks",
        collapsible: true, // dropdown tiếp
        children: [
          { text: "Khối cầu xoay", icon: "SiCircle", link: "/tutorials/rasengan/rasengan-cap-1-co-ban" },
          { text: "Chidori", icon: "SiThunderbird", link: "/tutorials/rasengan/chidori-cap-2-chuyen-sau" },
          { text: "Rasenshuriken", icon: "GiTargetShot", link: "/tutorials/rasengan/rasenshuriken-cap-3-tuyet-ky" }
        ]
      },
      {
        text: "Hiraishin no Jutsu",
        icon: "TiFlash",
        collapsible: true, // dropdown tiếp
        children: [
          { text: "Định vị không gian", link: "/tutorials/hiraishin-no-jutsu/phi-loi-than-cap-1-dinh-vi-khong-gian" },
          { text: "Làm chủ chiến trường", link: "/tutorials/hiraishin-no-jutsu/phi-loi-than-cap-3-lam-chu-chien-truong" },
          { text: "Phản công siêu tốc", link: "/tutorials/hiraishin-no-jutsu/phi-loi-than-cap-2-phan-cong-sieu-toc" },
        ]
      }
    ]
  }
]
