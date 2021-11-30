const styles = {
  mobileMenu: {
    menuLogoShow: {
      display: { xs: "inline", Laptop: "none" },
    },
    drawerShow: {
      display: { xs: "block", Laptop: "none" },
    },
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
    show: {
      display: { xs: "none", Laptop: "block" },
    },
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
    show: {
      display: { xs: "none", Mobile_L: "inline-flex" },
    },
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
};

export const stylesSetColor = {
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
};

export default styles;
