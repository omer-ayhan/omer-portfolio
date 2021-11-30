const stylesMain = {
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
};

export default stylesMain;
