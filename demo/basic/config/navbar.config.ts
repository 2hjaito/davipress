export const navbarConfig = {
  items: [
    { label: 'Home', href: '/', icon: 'FaUser' },
    // { label: 'Dự án', href: '/project', icon: 'GiFrogPrince' },
    { label: 'Dự án', href: '/project', icon: 'DvTerminalBlink' },
    // { label: 'Certs', href: '/cert', icon: 'FaCertificate' },
    {
      label: 'Tutorials',
      href: '/tutorials',
      icon: 'GiEvilBook',
      items: [
        {
          text: "Nhẫn thuật Naruto",
          collapsible: false,
          children: [
            {
              text: "Tổng quan",
              link: "/tutorials/naruto-ninjutsu",
            },
            {
              text: "Rasengan",
              link: "/tutorials/naruto-ninjutsu/naruto-ninjutsu-rasengan",
            },
            {
              text: "Hiraishin no Jutsu",
              link: "/tutorials/naruto-ninjutsu/naruto-ninjutsu-hiraishin",
            },
            {
              text: "Chidori",
              link: "/tutorials/naruto-ninjutsu/naruto-ninjutsu-chidori",
            },
            {
              text: "Rasenshuriken",
              link: "/tutorials/naruto-ninjutsu/naruto-ninjutsu-rasenshuriken",
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
    },
    {
      label: 'Guide',
      href: '/guide',
      icon: 'DvAnkhWingsTome',
      items: [
        {
          text: "markdown",
          collapsible: false,
          children: [
            {
              text: "Markdown Syntax",
              link: "/guide/markdown/syntax",
            },
            {
              text: "Markdown nâng cao",
              link: "/guide/markdown",
            },
          ]
        },
        {
          text: "davipress",
          collapsible: false,
          children: [
            {
              text: "Bắt đầu với Davipress",
              link: "/guide/davipress/getting-started",
            },
            {
              text: "Tạo trang mới",
              link: "/guide/davipress/creating-pages",
            },
            {
              text: "Cấu hình Davipress",
              link: "/guide/configuration",
            },
            {
              text: "Theme và giao diện",
              link: "/guide/theme",
            },
            {
              text: "Build và deploy",
              link: "/guide/deployment",
            },
          ]
        }
      ]
    },
    { label: 'Bài viết', href: '/posts', icon: 'GiMagicPortal' },
  ],
  themeToggle: {
    title: 'Toggle theme',
  },
} as const;
