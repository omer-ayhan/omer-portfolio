const stylesMain = {
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
      textAlign: { Mobile_L: "center", Laptop: "start" },
    },
  },

  introButtons: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "24px",
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
};

export default stylesMain;
