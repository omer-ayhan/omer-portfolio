import React from "react";
import Head from "next/head";
import Navbar from "../Components/Nav/Navbar";
import Intro from "../Components/Intro";
import StylesProvider, { props } from "../Components/Utilities/StylesProvider";
import { Box } from "@mui/material";
import About from "../Components/About/About";
import Skills from "../Components/Skills";
import Projects from "../Components/Projects/Projects";
import Blogs from "../Components/Blogs";
import Contact from "../Components/Contact";
import Footer from "../Components/Footer";
import { useAppSelector } from "../context/hooks";
import { BackToTop } from "../Components/BackToTop";

function App() {
  const themeMode = useAppSelector((state) => state.nav.isDarkMode);
  const { colors } = props;
  React.useEffect(() => {
    document.body.style.backgroundColor = themeMode ? colors.Darkdef : "#fff";
  }, [themeMode]);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          rel="stylesheet"
          type="text/css"
          charSet="UTF-8"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
        />
        <meta
          name="description"
          content="Web site created using create-react-app"
        />
        <meta name="apple-mobile-web-app-status-bar" content="#90cdf4" />
        <link rel="manifest" href="/manifest.json" />
        <title>Ömer Ayhan</title>
      </Head>
      <StylesProvider>
        <Box className="App">
          <BackToTop />
          <Navbar />
          <Intro />
          <About />
          <Skills />
          <Projects />
          <Blogs />
          <Contact />
          <Footer />
        </Box>
      </StylesProvider>
    </>
  );
}

export default App;
