import type { ReactElement } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import type { SwitchProps, InputProps, PaletteMode } from "@mui/material";
import { Input, Switch } from "@mui/material";
import { styled } from "@mui/system";
import { useAppSelector } from "../../context/hooks";

const project_img = "/img/project_img.jpg";

declare module "@mui/material/styles" {
  interface PaletteColor {
    main: string;
    light: string;
  }

  interface BreakpointOverrides {
    xs: true;
    sm: true;
    md: true;
    lg: true;
    xl: true;
    Mobile_S: true;
    Mobile_M: true;
    Mobile_L: true;
    Tablet: true;
    Laptop: true;
    Laptop_M: true;
    Laptop_L: true;
    FourK: true;
  }
}

type ColorState = {
  [key: string]: string;
  Primary: string;
  Secondary: string;
  Darkdef: string;
  DarkPaper: string;
  ElBackground: string;
  LightModeShadow: string;
  DarkModeShadow: string;
};

const colors: ColorState = {
  Primary: "#f79c00",
  Secondary: "#f44336",
  Darkdef: "#050018",
  DarkPaper: "#0E0433",
  ElBackground: "#dedede69",
  LightModeShadow: "#00000029",
  DarkModeShadow: "#ffffff40",
};

const stylesAll = {
  utilities: {
    shadow: "0px 0px 16.3px",
    buttons: {
      container: {
        width: { xs: "185px", FourK: "250px" },
        height: { xs: "49px", FourK: "60px" },
        borderRadius: "13px",
        boxShadow: "none",
        "&:hover": {
          backgroundColor: "secondary.main",
          boxShadow: `0 0 27px 5px ${colors.Secondary}80`,
        },
      },

      link: {
        width: "100%",
        height: "100%",
        display: "grid",
        placeContent: "center",
      },

      text: {
        textTransform: "none",
        fontSize: { xs: "1.45rem", FourK: "1.9rem" },
        textAlign: "center",
      },
    },
    title: {
      fontWeight: "medium",
      fontSize: { xs: "2.74rem", FourK: "3.8rem" },
    },
    gridContainer: {
      marginTop: "80px",
      placeContent: "center",
    },
    flexDefault: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    gridDefault: {
      display: "grid",
      placeContent: "center",
    },
  },

  navbar: {
    mobileMenu: {
      container: {
        display: { xs: "block", Mobile_L: "none" },
        padding: "0 30px",
      },
      navLinks: {
        padding: "0 30px",
      },
    },
    appBar: {
      paddingTop: { xs: "7px", Laptop: 0 },
    },
    container: {
      padding: { xs: "0 20px", Laptop: "0 100px" },
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    logo: {
      marginBottom: "4px",
      cursor: "pointer",
    },
    navLinks: {
      container: {
        color: "text.primary",
        transition: "250ms ease",
        cursor: "pointer",
        "&:hover": {
          color: "primary.main",
        },
      },
      text: {
        fontSize: {
          xs: "1.35rem",
          Laptop_L: "1.55rem",
          FourK: "2rem",
        },
        margin: "0 10px",
        fontWeight: "medium",
      },
    },

    lang: {
      text: {
        fontWeight: 500,
        fontSize: {
          xs: "1.35rem",
          Laptop_L: "1.55rem",
          FourK: "2rem",
        },
      },

      content: {
        text: {
          fontWeight: 500,
          fontSize: {
            xs: "1.35rem",
            Laptop_L: "1.55rem",
            FourK: "2rem",
          },
        },
      },
    },
  },

  intro: {
    introBox: {
      container: {
        display: "flex",
        alignItems: { xs: "start", Mobile_L: "center", Laptop: "start" },
        justifyContent: "center",
        gap: "7px",
      },
      text1: {
        fontSize: {
          xs: "1.65rem",
          Mobile_L: "1.85rem",
          FourK: "2.35rem",
        },
      },
      text2: {
        fontWeight: 600,
        fontSize: {
          xs: "2.96rem",
          Mobile_M: "3.5rem",
          Mobile_L: "3.65rem",
          Tablet: "4.3rem",
          FourK: "6.2rem",
        },
      },
      text3: {
        fontWeight: 600,
        fontSize: {
          xs: "1.95rem",
          Mobile_M: "2.3rem",
          Mobile_L: "2.4rem",
          Tablet: "2.6rem",
          FourK: "3.95rem",
        },
      },
    },

    introImg: {
      container: {
        width: {
          xs: 300,
          Mobile_L: 400,
          Laptop: 300,
        },
        right: { xs: 0, Mobile_L: 20, Tablet: "-20%", Laptop: "18%" },
        "@media (min-width: 500px) and (max-width:768px)": {
          left: "12%",
        },
        "@media (min-width: 1269px)": {
          width: 400,
        },
      },
    },
  },

  about: {
    aboutImg: {
      container: {
        marginLeft: { xs: "20px", FourK: "150px" },
        width: "360px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "20px",
      },
      linksContainer: {
        width: "100%",
        display: { xs: "none", Laptop: "flex" },
        justifyContent: "center",
        alignItems: "center",
        gap: "13px",
      },
    },
    aboutBox: {
      body: {
        fontWeight: "normal",
        fontSize: { xs: "1.25rem", Laptop_L: "1.4rem", FourK: "1.85rem" },
      },
    },
  },

  skills: {
    spacings: { xs: 5, Mobile_L: 2.3, Tablet: 5 },
    skillsWidth: {
      xs: 250,
      Mobile_L: 425,
      Tablet: 560,
      Laptop: 990,
      FourK: 1075,
    },
    skillsHeight: { xs: "300px", Laptop: "500px", FourK: "530px" },
    card: {
      container: {
        width: { xs: 185, FourK: 210 },
        height: { xs: 185, FourK: 210 },
        display: "flex",
        alignItems: "center",
        justifyContent: "end",
        gap: "15px",
        borderRadius: "20px",
        transition: "inherit",
      },
      title: {
        fontWeight: "600",
        color: "inherit",
        fontSize: { FourK: "1.9rem" },
      },
    },
  },

  projects: {
    tags: {
      gridContainer: {
        display: { xs: "none", Tablet: "flex" },
        margin: {
          xs: 0,
        },
        justifyContent: "center",
        alignItems: "center",
        gap: "15px",
      },
      container: {
        minWidth: {
          Tablet: "80px",
        },
        height: { xs: "40px", FourK: "50px" },
        backgroundColor: colors.ElBackground,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: {
          Tablet: "7px",
          Laptop: "14px",
          Laptop_M: "16px",
          FourK: "18px",
        },
        borderRadius: "130px",
        transition: "ease 250ms",
        cursor: "pointer",
        userSelect: "none",
      },
      text: {
        fontSize: {
          Tablet: ".9rem",
          Laptop: "1rem",
          Laptop_M: "1.05rem",
          FourK: "1.45rem",
        },
        fontWeight: "500",
        color: "inherit",
      },
    },
    spacing: {
      xs: 2.5,
      Mobile_M: 4.5,
      Tablet: 2.5,
      Laptop: 1,
      Laptop_M: 4,
      FourK: 6.7,
    },
    rowSpacing: { xs: 4, Laptop: 3.5, Laptop_M: 4.5 },
    projectsWidth: {
      xs: 317,
      Mobile_M: 360,
      Mobile_L: 380,
      Tablet: 670,
      Laptop: 990,
      Laptop_M: 1140,
      FourK: 1690,
    },
    projectsHeight: { xs: 525, Laptop: 530, FourK: 680 },

    search: {
      transition: "all 250ms ease",
      transitionProperty: "border-width, outline-width",
      border: "none",
      borderRadius: "13px",
    },

    card: {
      container: {
        width: {
          xs: 237,
          Mobile_M: 250,
          Mobile_L: 265,
          Tablet: 263,
          Laptop_M: 296,
          FourK: 435,
        },
        minHeight: 335,
        display: "flex",
        alignItems: "start",
        justifyContent: "start",
        padding: "20px",
        marginBottom: { xs: 0, FourK: "35px" },
        gap: "12px",
        borderRadius: "20px",
        transition: "inherit",
      },

      slider: {
        container: {
          top: { xs: "-25px", FourK: "-35px" },
          width: "100%",
          height: 0,
        },

        list: {
          container: {
            width: { xs: "30%", FourK: "27.5%" },
            height: { xs: "14px", FourK: "22px" },
            margin: 0,
            padding: "6.5px 0",
            background: "#cdcdcdd1",
            borderRadius: 100,
          },
          listChild: {
            container: {
              width: { xs: "13px", FourK: "20px" },
              height: { xs: "13px", FourK: "20px" },
              background: "#fff",
              borderRadius: "50%",
            },
            dots: {
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              background: "inherit",
            },
          },
        },
      },

      text: {
        title: {
          fontSize: { xs: "1.37rem", FourK: "2.1rem" },
          fontWeight: "600",
          color: "inherit",
        },
        desc: {
          fontFamily: "Rubik, sans-serif",
          fontSize: { xs: "1rem", FourK: "1.45rem" },
          color: "inherit",
        },
      },
      tags: {
        container: {
          minWidth: {
            xs: "78px",
            Mobile_M: "82px",
            Mobile_L: "87px",
            Laptop_M: "93px",
          },
          height: "34px",
          backgroundColor: "rgba(222, 222, 222, 0.8)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "6px",
          borderRadius: "130px",
          transition: "inherit",
          cursor: "default",
          userSelect: "none",
        },
        text: {
          lineHeight: "1.2 !important",
          fontSize: {
            xs: "0.75rem",
            Mobile_M: "0.8rem",
            Mobile_L: "0.83rem",
            Laptop_M: ".85rem",
            FourK: "1.15rem",
          },
          fontWeight: "500",
        },
      },
      buttons: {
        container: {
          minWidth: { xs: 130, FourK: 170 },
          height: { xs: 36, FourK: 50 },
          borderRadius: "12px",
          boxShadow: "none",
          "&:hover": {
            backgroundColor: "secondary.main",
          },
        },
        text: {
          textTransform: "none",
          fontSize: { xs: "1.35rem", FourK: "1.5rem" },
        },
      },
    },
  },

  blogs: {
    link: {
      flexContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent: { xs: "center", Tablet: "end" },
      },
      container: {
        width: { xs: "100px", FourK: "150px" },
        "&:hover": { textDecoration: "underline" },
      },
      text: {
        fontSize: { xs: "1.25rem", FourK: "2rem" },
      },
    },

    gridContainer: {
      height: {
        xs: "350px",
        Tablet: "660px",
        Laptop: "330px",
        Laptop_L: "350px",
        FourK: "470px",
      },
      overflow: "hidden",
    },
    card: {
      gridContainer: {
        marginLeft: { Laptop: "17px", Laptop_M: 0 },
        padding: "0 10px",
        placeContent: "center",
        height: { xs: "965px", Tablet: "100%" },
      },
      container: {
        marginBottom: { xs: "30px", Laptop: 0 },
        width: {
          xs: 237,
          Mobile_M: 250,
          Mobile_L: 265,
          Tablet: 248,
          Laptop: 242,
          Laptop_M: 296,
          Laptop_L: 330,
          FourK: 480,
        },
        minHeight: 250,
        marginLeft: { xs: 0, Laptop_M: "33px", FourK: 0 },
        display: "flex",
        alignItems: "start",
        justifyContent: "start",
        padding: "16px",
        gap: "12px",
        borderRadius: "20px",
        transition: "inherit",
      },
      text: {
        fontSize: { xs: "1.37rem", FourK: "2rem" },
        fontWeight: "600",
        color: "inherit",
      },
    },
  },

  contact: {
    container: {
      paddingBottom: { xs: "250px", FourK: "350px" },
    },

    button: {
      container: {
        padding: "12px",
        width: { xs: "100%" },
        height: "100%",
        borderRadius: "8px",
        boxShadow: "none",
      },

      text: {
        fontSize: {
          xs: "1.6rem",
          Tablet: "1.75rem",
          Laptop_M: "1.85rem",
          Laptop_L: "1.95rem",
          FourK: "2.35rem",
        },
      },
    },
  },

  footer: {
    container: {
      width: "100%",
      height: { xs: 170, FourK: 190 },
      padding: "10px",
      paddingBottom: "20px",
      bottom: "0",
      left: "0",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: 0,
    },

    link: {
      container: {
        gap: "20px",
        marginBottom: "13px",
      },
      text: {
        alignSelf: { xs: "start", Mobile_L: "center", Laptop: "start" },
        fontSize: { xs: "1rem", FourK: "1.35rem" },
      },
    },
  },

  themeSwitch: {
    width: "100px",
    height: "30px",
    top: 5,
    right: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "5px",
    zIndex: 999,
  },

  mainTabs: {
    tabs: {
      container: {
        width: {
          xs: "100%",
          Mobile_L: "400px",
          Tablet: "480px",
          Laptop: "600px",
        },
        margin: "16px 0 36px 0",
        zIndex: 999,
      },

      element: {
        "&.Mui-selected": {
          color: "secondary.main",
        },
        "&.Mui-focusVisible": {
          backgroundColor: "secondary.main",
        },
      },
      label: {
        width: { xs: "110px", Laptop: "160px" },
        fontWeight: 600,
        fontSize: {
          xs: "1.35rem",
          Laptop: "1.6rem",
          FourK: "1.96rem",
        },
      },
    },
    tabPanel: {
      container: {
        marginLeft: {
          xs: 0,
        },
        transition: ".3s ease",
        justifyContent: "start",
        alignItems: "start",
      },
    },
  },

  setColor: {
    container: {
      minWidth: {
        xs: "260px",
        Mobile_M: "300px",
        Tablet: "350px",
        FourK: "450px",
      },
      minHeight: "auto",
      padding: "15px",
      gap: "13px",
    },

    text: {
      fontSize: { xs: "1.3rem", FourK: "1.7rem" },
    },

    colorPalette: {
      gridContainer: {
        margin: 0,
        minWidth: "100%",
        minHeight: "auto",
        transition: ".3s ease",
      },

      container: {
        width: "30px",
        height: "90px",
        transition: "border-width .3s ease",
        cursor: "pointer",
      },

      icon: {
        color: "#fff",
        width: "40px",
        height: "40px",
      },
    },

    snackBar: {
      action: {
        "& > svg": {
          width: { FourK: "1.5em" },
          height: { FourK: "1.5em" },
        },
      },
      text: {
        fontSize: { xs: "1.12rem", Laptop_L: "1.22rem", FourK: "1.6rem" },
      },
    },

    preview: {
      gridContainer: {
        margin: "10px 0",
        minWidth: "100%",
        minHeight: "auto",
      },

      container: {
        height: "80px",
      },
    },

    button: {
      container: {
        width: "100%",
        borderRadius: "9px",
      },

      text: {
        fontSize: { xs: "1.2rem", Mobile_M: "1.35rem", FourK: "1.75rem" },
      },
    },
  },

  filter: {
    container: {
      width: {
        xs: "260px",
        Mobile_M: "320px",
        Tablet: "455px",
        Laptop: "475px",
        Laptop_M: "520px",
        Laptop_L: "590px",
        FourK: "700px",
      },
      minHeight: "auto",
      padding: "15px",
      gap: "13px",
    },

    input: {
      text: {
        main: {
          fontSize: { Laptop_L: "1.3rem", FourK: "1.7rem" },
        },
        label: {
          fontSize: { Laptop_M: "1rem", FourK: "1.4rem" },
        },
      },
    },

    tags: {
      gridContainer: {
        alignItems: "start",
        justifyContent: "start",
        margin: 0,
        transition: ".3s ease",
      },
      container: {
        backgroundColor: colors.ElBackground,
        width: {
          xs: "125px",
          Mobile_M: "150px",
          Tablet: "220px",
          Laptop: "150px",
          Laptop_M: "165px",
          Laptop_L: "186px",
          FourK: "220px",
        },
        height: { FourK: "40px" },
        borderRadius: "200px",
        ".MuiChip-deleteIcon": {
          width: { FourK: 29 },
          height: "auto",
        },
      },
    },

    forms: {
      container: {
        alignItems: "flex-end",
        justifyContent: "space-between",
        width: "100%",
      },
      text: {
        title: {
          fontSize: { Mobile_L: "1.05rem", FourK: "1.4rem" },
        },
      },
      select: {
        container: {
          width: "40%",
        },
        text: {
          fontSize: {
            xs: "1.05rem",
            Mobile_M: "1.15rem",
            FourK: "1.55rem",
          },
        },
      },
    },
  },
};

const props = { colors, stylesAll };

const linksMain = {
  navLinks: [
    { name: "About", to: "about" },
    { name: "Skills", to: "skills" },
    { name: "Projects", to: "projects" },
    { name: "Blogs", to: "blogs" },
    { name: "Contact", to: "contact" },
  ],
  introLinks: [
    { btn_name: "Contact Me", to: "contact" },
    { btn_name: "My Portfolio", to: "#" },
  ],
  socialLinks: [
    { icon_name: "logos:linkedin-icon", to: "#", color: "#0A66C2" },
    { icon_name: "logos:dribbble-icon", to: "#", color: "" },
    { icon_name: "octicon:mark-github-16", to: "#", color: "inherit" },
    { icon_name: "cib:upwork", to: "#", color: "#7ADD53" },
    { icon_name: "fa-brands:behance-square", to: "#", color: "#1873EB" },
    { icon_name: "logos:twitter", to: "#", color: "#55ACEE" },
  ],
  langs: [
    {
      label: "en",
      flag: "emojione:flag-for-us-outlying-islands",
      id: "a12YUaa_1221",
    },
    { label: "tr", flag: "emojione:flag-for-turkey", id: "u_21795b_Xcv" },
  ],
};

const tabObjects = {
  skillsTab: [
    { title: "Front-End", icon: "fluent:window-dev-edit-16-filled" },
    { title: "Back-End", icon: "fluent:window-dev-tools-24-filled" },
    { title: "Design", icon: "clarity:design-solid" },
    { title: "Dev Tools", icon: "fa-solid:tools" },
  ],
  projectsTab: [
    { title: "Featured", icon: "ant-design:star-filled" },
    { title: "Web Dev", icon: "fluent:window-dev-tools-24-filled" },
    { title: "Design", icon: "clarity:design-solid" },
  ],
  skillsCard: [
    { title: "LinkedIn", icon: "logos:linkedin-icon" },
    { title: "LinkedIn", icon: "logos:linkedin-icon" },
    { title: "LinkedIn", icon: "logos:linkedin-icon" },
    { title: "LinkedIn", icon: "logos:linkedin-icon" },
    { title: "LinkedIn", icon: "logos:linkedin-icon" },
    { title: "LinkedIn", icon: "logos:linkedin-icon" },
    { title: "LinkedIn", icon: "logos:linkedin-icon" },
    { title: "LinkedIn", icon: "logos:linkedin-icon" },
    // { title: "LinkedIn", icon: "logos:linkedin-icon" },
    // { title: "LinkedIn", icon: "logos:linkedin-icon" },
    // { title: "LinkedIn", icon: "logos:linkedin-icon" },
  ],
  projectsCard: [
    {
      title: "title1 Heading",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam qui autem nam vero odio magnam mollitia enim veniam, quisquam repellat",
      img: [project_img, project_img, project_img],
      tags: [
        { title: "Flutter", icon: "logos:flutter" },
        { title: "NodeJS", icon: "logos:nodejs" },
        { title: "Firebase", icon: "logos:firebase" },
        { title: "Docker", icon: "logos:docker-icon" },
      ],
      link: "#intro",
    },
    {
      title: "title2 Heading",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam qui autem nam vero odio magnam mollitia enim veniam, quisquam repellat Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam qui autem nam vero odio magnam mollitia enim veniam, quisquam repellat",
      img: [project_img, project_img, project_img],
      tags: [
        { title: "Flutter", icon: "logos:flutter" },
        { title: "AWS", icon: "logos:nodejs" },
        { title: "MongoDB", icon: "logos:firebase" },
        { title: "React-Native", icon: "logos:docker-icon" },
      ],
      link: "#intro",
    },
    {
      title: "title2 Heading",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam qui autem nam vero odio magnam mollitia enim veniam, quisquam repellat Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam qui autem nam vero odio magnam mollitia enim veniam, quisquam repellat",
      img: [project_img, project_img, project_img],
      tags: [
        { title: "Flutter", icon: "logos:flutter" },
        { title: "AWS", icon: "logos:nodejs" },
        { title: "MongoDB", icon: "logos:firebase" },
        { title: "React-Native", icon: "logos:docker-icon" },
      ],
      link: "#intro",
    },
    {
      title: "title2 Heading",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam qui autem nam vero odio magnam mollitia enim veniam, quisquam repellat Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam qui autem nam vero odio magnam mollitia enim veniam, quisquam repellat",
      img: [project_img, project_img, project_img],
      tags: [
        { title: "Flutter", icon: "logos:flutter" },
        { title: "AWS", icon: "logos:nodejs" },
        { title: "MongoDB", icon: "logos:firebase" },
        { title: "React-Native", icon: "logos:docker-icon" },
      ],
      link: "#intro",
    },
    {
      title: "title2 Heading",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam qui autem nam vero odio magnam mollitia enim veniam, quisquam repellat Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam qui autem nam vero odio magnam mollitia enim veniam, quisquam repellat",
      img: [project_img, project_img, project_img],
      tags: [
        { title: "Flutter", icon: "logos:flutter" },
        { title: "AWS", icon: "logos:nodejs" },
        { title: "MongoDB", icon: "logos:firebase" },
        { title: "React-Native", icon: "logos:docker-icon" },
      ],
      link: "#intro",
    },
    {
      title: "title2 Heading",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam qui autem nam vero odio magnam mollitia enim veniam, quisquam repellat Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam qui autem nam vero odio magnam mollitia enim veniam, quisquam repellat",
      img: [project_img, project_img, project_img],
      tags: [
        { title: "Flutter", icon: "logos:flutter" },
        { title: "AWS", icon: "logos:nodejs" },
        { title: "MongoDB", icon: "logos:firebase" },
        { title: "React-Native", icon: "logos:docker-icon" },
      ],
      link: "#intro",
    },
    {
      title: "title2 Heading",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam qui autem nam vero odio magnam mollitia enim veniam, quisquam repellat Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam qui autem nam vero odio magnam mollitia enim veniam, quisquam repellat",
      img: [project_img, project_img, project_img],
      tags: [
        { title: "Flutter", icon: "logos:flutter" },
        { title: "AWS", icon: "logos:nodejs" },
        { title: "MongoDB", icon: "logos:firebase" },
        { title: "React-Native", icon: "logos:docker-icon" },
      ],
      link: "#intro",
    },
    {
      title: "title2 Heading",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam qui autem nam vero odio magnam mollitia enim veniam, quisquam repellat Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam qui autem nam vero odio magnam mollitia enim veniam, quisquam repellat",
      img: [project_img, project_img, project_img],
      tags: [
        { title: "Flutter", icon: "logos:flutter" },
        { title: "AWS", icon: "logos:nodejs" },
        { title: "MongoDB", icon: "logos:firebase" },
        { title: "React-Native", icon: "logos:docker-icon" },
      ],
      link: "#intro",
    },
  ],

  projectTags: [
    { title: "Firebase", icon: "logos:firebase" },
    { title: "React", icon: "logos:react" },
    { title: "Tailwind", icon: "vscode-icons:file-type-tailwind" },
    { title: "NodeJS", icon: "logos:nodejs" },
  ],
  blogsCard: [
    { title: "Coming Soon", img: project_img },
    { title: "Coming Soon", img: project_img },
    { title: "Coming Soon", img: project_img },
  ],
};

type Props = {
  children?: JSX.Element | JSX.Element[];
};

function StylesProvider({ children }: Props) {
  const themeMode = useAppSelector((state) => state.nav);

  const getDesignTokens = (mode: PaletteMode) => ({
    breakpoints: {
      values: {
        xs: 0,
        sm: 420,
        lg: 767.9,
        md: 1024,
        xl: 1901,
        Mobile_S: 321,
        Mobile_M: 375,
        Mobile_L: 425,
        Tablet: 768,
        Laptop: 1023,
        Laptop_M: 1270,
        Laptop_L: 1440,
        FourK: 1900,
      },
    },
    palette: {
      mode: mode,
      primary: {
        // light: themeMode.Primary,
        main: themeMode.Primary,
      },
      secondary: {
        main: themeMode.Secondary,
      },

      ...(!themeMode.isDarkMode
        ? {
            background: {
              default: "#fff",
              paper: "#fff",
            },
          }
        : {
            background: {
              default: colors.Darkdef,
              paper: colors.DarkPaper,
            },
          }),

      text: {
        secondary: themeMode.Secondary,
        ...(mode === "light"
          ? {
              primary: colors.Darkdef,
            }
          : {
              primary: "#ffffff",
            }),
      },
    },
    typography: {
      fontFamily: "'Rubik', sans-serif",
    },
  });

  const custom_theme = createTheme(
    getDesignTokens(themeMode.isDarkMode ? "dark" : "light")
  );

  return <ThemeProvider theme={custom_theme}>{children}</ThemeProvider>;
}

const StyledSwitch = styled(
  (props: SwitchProps): ReactElement => (
    <Switch
      focusVisibleClassName=".Mui-focusVisible"
      disableRipple
      {...props}
    />
  )
)(({ theme }) => ({
  width: 46,
  height: 24,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    transitionDuration: "300ms",
    margin: "2.1px 1px",
    "&.Mui-checked": {
      transform: "translateX(22px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.primary,
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    margin: 0,
    marginLeft: "2px",
    boxSizing: "border-box",
    width: 19,
    height: 19,
  },
  "& .MuiSwitch-track": {
    // paddingLeft: "1px",
    borderRadius: 29 / 2,
    backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
    opacity: 1,
  },
}));

const FormInput = styled(
  (props: InputProps): ReactElement => <Input disableUnderline {...props} />
)(({ theme }) => ({
  borderColor: theme.palette.secondary.main,
  outlineColor: `${theme.palette.secondary.main}3a`,
  background:
    theme.palette.mode === "dark" ? colors.DarkPaper : colors.ElBackground,
  ...stylesAll.projects.search,
  "&:hover": {
    outline: `7px solid ${theme.palette.secondary.main}3a`,
  },
  "&.Mui-focused": {
    backgroundColor: "background.paper",
    outline: `7px solid ${theme.palette.secondary.main}3a`,
    border: `2px solid ${theme.palette.secondary.main}`,
  },
}));

export default StylesProvider;
export { FormInput, StyledSwitch, linksMain, tabObjects, props };
