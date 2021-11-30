import { props } from "../Utilities/StylesProvider";

const { colors } = props;
const stylesMain = {
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
        padding: 0,
        margin: 0,
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
};

export const filterStyles = {
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
      justifyContent: "space-between",
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
};

export default stylesMain;
