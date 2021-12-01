import type { Theme } from "@mui/material";
import { props } from "../StylesProvider";
import { adjustTextColor } from "../ColorUtils/adjustColor";
import stylesProjects from "../../Projects/Projects.style";
import stylesSkills from "../../Skills/Skills.style";

const { colors } = props;
const stylesMain = {
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
      "& .MuiTabs-scrollButtons": {
        color: "text.primary",
      },

      "& .MuiTabs-scrollButtons, .MuiTabs-scrollButtons > *": {
        width: "50px",
        height: "auto",
      },
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
  projectsSection: {
    container: {
      ...stylesProjects.card.container,
      flexDirection: "column",
      boxShadow: (theme: Theme) =>
        theme.palette.mode === "dark"
          ? `0px 0px 16.3px ${colors.DarkModeShadow}`
          : `0px 0px 16.3px ${colors.LightModeShadow}`,
    },
    slider: {
      position: "relative",
      width: "100%",
      height: {
        xs: "145px",
        Mobile_L: "165px",
        Laptop_M: "170px",
        FourK: "250px",
      },
    },
    content: {
      spacing: { xs: 1, Laptop_M: 1 },
      title: { width: "100%", minHeight: "110px", padding: 0 },
      tags: {
        width: "100%",
        transition: ".3s ease",
        padding: 0,
      },
    },
  },
  skillsSection: {
    grid: {
      transition: "inherit",
      "&:hover": {
        marginTop: "-22px",
      },
    },
    container: {
      ...stylesSkills.card.container,
      boxShadow: (theme: Theme) =>
        theme.palette.mode === "dark"
          ? `0px 0px 16.3px ${colors.DarkModeShadow}`
          : `0px 0px 16.3px ${colors.LightModeShadow}`,
      position: "relative",
      flexDirection: "column",
      "&:hover": {
        backgroundColor: "secondary.main",
        boxShadow: "none",
        color: (theme: Theme) => adjustTextColor(theme.palette.secondary.main),
      },
    },
  },
};

export default stylesMain;
