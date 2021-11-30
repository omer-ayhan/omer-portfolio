const stylesMain = {
  container: {
    paddingBottom: { xs: "250px", FourK: "350px" },
  },
  body: {
    fontWeight: "normal",
    fontSize: { xs: "1.25rem", Laptop_L: "1.4rem", FourK: "1.85rem" },
  },

  tooltip: { cursor: "pointer", zIndex: 15 },
  tooltipTextArea: {
    marginBottom: "auto",
    cursor: "pointer",
    zIndex: 15,
  },
  textarea: {
    "& textarea": {
      height: "100%",
      overflowY: "scroll",
    },
  },
  button: {
    container: {
      padding: "0",
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
      textAlign: "center",
      textTransform: "none",
    },
  },
};

export default stylesMain;
