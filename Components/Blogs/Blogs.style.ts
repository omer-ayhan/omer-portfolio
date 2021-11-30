import type { Theme } from "@mui/material";
import { props } from "../Utilities/StylesProvider";

const { colors } = props;

const stylesMain = {
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
    overflowY: "scroll",
  },
  colSpacing: { Laptop: 5, FourK: 2 },
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
      boxShadow: (theme: Theme) =>
        theme.palette.mode === "dark"
          ? `0px 0px 16.3px ${colors.DarkModeShadow}`
          : `0px 0px 16.3px ${colors.LightModeShadow}`,
      flexDirection: "column",
    },
    image: {
      position: "relative",
      width: "100%",
      height: {
        xs: "145px",
        Laptop: "155px",
        Laptop_M: "170px",
        Laptop_L: "190px",
        FourK: "275px",
      },
    },
    text: {
      fontSize: { xs: "1.37rem", FourK: "2rem" },
      fontWeight: "600",
      color: "inherit",
    },
  },
};

export default stylesMain;
