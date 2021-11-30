import type { Theme } from "@mui/material";
import { props } from "../Utilities/StylesProvider";

const { colors } = props;

const stylesMain = {
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
    background: (theme: Theme) =>
      theme.palette.mode === "dark" ? colors.DarkPaper : colors.ElBackground,
    position: "absolute",
    flexDirection: "column",
  },

  logo: {
    marginBottom: "4px",
    cursor: "pointer",
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
};

export default stylesMain;
