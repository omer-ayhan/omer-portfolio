import { Grid, Typography, Box } from "@mui/material";
import { linksMain } from "../Utilities/StylesProvider";
import MainButton from "../Utilities/MainButton";
import SvgImages from "../Utilities/SvgImages";
import Slider from "react-slick";
import ImageSSR from "../Utilities/ImageSSR";
import useTranslation from "next-translate/useTranslation";
import styles from "./Intro.style";
import stylesUtility from "../Utilities/Utilities.style";

const Intro = () => {
  const { t } = useTranslation("common");
  const [intro_svg, intro_img, bg_intro] = [
    "/img/Intro_Img/intro_illustration_animated2.svg",
    "/img/Intro_Img/intro_illustration_photo.png",
    "/img/Background/bg_intro.png",
  ];
  const settings = {
    className: "slides-wrapper",
    autoplay: true,
    autoplaySpeed: 2500,
    speed: 300,
    dots: false,
    arrows: false,
    swipe: false,
    pauseOnHover: false,
    vertical: true,
    easing: "alternate",
  };
  return (
    <Grid
      id="intro"
      container
      spacing={1}
      pt="110px"
      justifyContent="center"
      alignItems="center">
      <Grid item xs={12} md={6}>
        <ImageSSR className="intro-bg" path={bg_intro} priorty />
        <Box
          flexDirection="column"
          textAlign="start"
          sx={styles.introBox.container}>
          <Typography
            color="text.primary"
            variant="h5"
            sx={styles.introBox.text1}>
            {t("intro_title")}
          </Typography>
          <Typography sx={styles.introBox.text2} color="primary" variant="h2">
            Ömer Ayhan
          </Typography>
          {/* Slides */}
          <Slider {...settings}>
            <Typography
              color="secondary"
              sx={styles.introBox.text3 as any}
              variant="h4">
              UI/UX Designer
            </Typography>
            <Typography
              color="secondary"
              sx={styles.introBox.text3 as any}
              variant="h4">
              Front-End Dev
            </Typography>
          </Slider>

          <Box mt="8px" sx={styles.introButtons}>
            {linksMain.introLinks.map(({ btn_name, to }, index) => (
              <MainButton
                key={`${btn_name}|${index * 2}`}
                component={btn_name === "My Portfolio" ? "a" : "span"}
                sxButton={{
                  ...(btn_name === "My Portfolio"
                    ? {
                        display: {
                          xs: "none",
                          Mobile_L: "block",
                        },
                      }
                    : ""),
                  ...stylesUtility.buttons.container,
                  zIndex: 5,
                }}
                sxLink={{
                  ...stylesUtility.buttons.link,
                  textDecoration: "none",
                }}
                sxText={stylesUtility.buttons.text}
                btn_name={btn_name}
                to={to}
                allowScroll={btn_name === "My Portfolio" ? false : true}
              />
            ))}
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12} md={3}>
        <Box position="relative" sx={styles.introImg.container}>
          <object id="illustration-bg" type="image/svg+xml" data={intro_svg}>
            svg-animation
          </object>
          <SvgImages svgType="intro" />
          <ImageSSR className="intro-img" path={intro_img} priorty />
        </Box>
      </Grid>
    </Grid>
  );
};

export default Intro;
