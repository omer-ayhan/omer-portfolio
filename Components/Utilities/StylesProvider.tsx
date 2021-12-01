import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useAppSelector } from "../../context/hooks";
import type { PaletteMode } from "@mui/material";

const project_img = "/img/project_img.jpg";

declare module "@mui/material/styles" {
  interface PaletteColor {
    main: string;
    light: string;
  }

  interface BreakpointOverrides {
    xs: true;
    sm: true;
    md: true;
    lg: true;
    xl: true;
    Mobile_S: true;
    Mobile_M: true;
    Mobile_L: true;
    Tablet: true;
    Laptop: true;
    Laptop_M: true;
    Laptop_L: true;
    FourK: true;
  }
}

type ColorState = {
  [key: string]: string;
  Primary: string;
  Secondary: string;
  Darkdef: string;
  DarkPaper: string;
  ElBackground: string;
  LightModeShadow: string;
  DarkModeShadow: string;
};

const colors: ColorState = {
  Primary: "#f79c00",
  Secondary: "#f44336",
  Darkdef: "#050018",
  DarkPaper: "#0E0433",
  ElBackground: "#dedede69",
  LightModeShadow: "#00000029",
  DarkModeShadow: "#ffffff40",
};

const linksMain = {
  navLinks: [
    { name: "About", to: "about" },
    { name: "Skills", to: "skills" },
    { name: "Projects", to: "projects" },
    { name: "Blogs", to: "blogs" },
    { name: "Contact", to: "contact" },
  ],
  introLinks: [
    { btn_name: "Contact Me", to: "contact" },
    { btn_name: "My Portfolio", to: "#" },
  ],
  socialLinks: [
    { icon_name: "logos:linkedin-icon", to: "#", color: "#0A66C2" },
    { icon_name: "logos:dribbble-icon", to: "#", color: "" },
    { icon_name: "octicon:mark-github-16", to: "#", color: "inherit" },
    { icon_name: "cib:upwork", to: "#", color: "#7ADD53" },
    { icon_name: "fa-brands:behance-square", to: "#", color: "#1873EB" },
    { icon_name: "logos:twitter", to: "#", color: "#55ACEE" },
  ],
};

const mainLangs = {
  en: {
    label: "en",
    flag: "emojione:flag-for-us-outlying-islands",
    id: "a12YUaa_1221",
  },
  tr: { label: "tr", flag: "emojione:flag-for-turkey", id: "u_21795b_Xcv" },
};

const tabObjects = {
  blogsCard: [
    { title: "Coming Soon", img: project_img },
    { title: "Coming Soon", img: project_img },
    { title: "Coming Soon", img: project_img },
  ],
};

type Props = {
  children?: JSX.Element | JSX.Element[];
};

function StylesProvider({ children }: Props) {
  const themeMode = useAppSelector((state) => state.nav);

  const getDesignTokens = (mode: PaletteMode) => ({
    breakpoints: {
      values: {
        xs: 0,
        sm: 420,
        lg: 767.9,
        md: 1024,
        xl: 1901,
        Mobile_S: 321,
        Mobile_M: 375,
        Mobile_L: 425,
        Tablet: 768,
        Laptop: 1023,
        Laptop_M: 1270,
        Laptop_L: 1440,
        FourK: 1900,
      },
    },
    palette: {
      mode: mode,
      primary: {
        // light: themeMode.Primary,
        main: themeMode.Primary,
      },
      secondary: {
        main: themeMode.Secondary,
      },

      ...(!themeMode.isDarkMode
        ? {
            background: {
              default: "#fff",
              paper: "#fff",
            },
          }
        : {
            background: {
              default: colors.Darkdef,
              paper: colors.DarkPaper,
            },
          }),

      text: {
        secondary: themeMode.Secondary,
        ...(mode === "light"
          ? {
              primary: colors.Darkdef,
            }
          : {
              primary: "#ffffff",
            }),
      },
    },
    typography: {
      fontFamily: "'Rubik', sans-serif",
    },
  });

  const custom_theme = createTheme(
    getDesignTokens(themeMode.isDarkMode ? "dark" : "light")
  );

  return <ThemeProvider theme={custom_theme}>{children}</ThemeProvider>;
}

export default StylesProvider;
export { linksMain, mainLangs, tabObjects, colors };
