import { colors } from "./StylesProvider";

const stylesMain = {
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
};

export default stylesMain;
