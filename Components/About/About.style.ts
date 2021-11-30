const stylesMain = {
  aboutImg: {
    order: { xs: 3, Laptop: 2 },
    container: {
      marginLeft: { xs: "20px", FourK: "150px" },
      width: "360px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "20px",
    },
    innerContainer: {
      display: {
        xs: "none",
        Laptop: "block",
      },
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
    order: { xs: 2, Laptop: 3 },
    body: {
      fontWeight: "normal",
      fontSize: { xs: "1.25rem", Laptop_L: "1.4rem", FourK: "1.85rem" },
    },
    alignText: {
      xs: "center",
      Laptop: "start",
    },
    socialIcons: {
      marginTop: "20px",
      display: { xs: "flex", Laptop: "none" },
    },
  },
};

export default stylesMain;
