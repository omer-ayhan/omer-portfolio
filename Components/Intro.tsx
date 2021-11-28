import { Grid, Typography, Box } from "@mui/material";
import { linksMain, props } from "./Utilities/StylesProvider";
import MainButton from "./Utilities/MainButton";
import SvgImages from "./Utilities/SvgImages";
import Slider from "react-slick";
import ImageSSR from "./Utilities/ImageSSR";

const Intro = () => {
  const { stylesAll } = props;
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
          sx={{
            ...stylesAll.intro.introBox.container,
            textAlign: "start",
            flexDirection: "column",
          }}>
          <Typography
            color="text.primary"
            variant="h5"
            sx={{
              ...stylesAll.intro.introBox.text1,
            }}>
            Hello! I am
          </Typography>
          <Typography
            sx={{
              ...stylesAll.intro.introBox.text2,
            }}
            color="primary"
            variant="h2">
            Ömer Ayhan
          </Typography>
          {/* Slides */}
          <Slider {...settings}>
            <Typography
              color="secondary"
              sx={{
                ...stylesAll.intro.introBox.text3,
                textAlign: { Mobile_L: "center", Laptop: "start" },
              }}
              variant="h4">
              UI/UX Designer
            </Typography>
            <Typography
              color="secondary"
              sx={{
                ...stylesAll.intro.introBox.text3,
                textAlign: { Mobile_L: "center", Laptop: "start" },
              }}
              variant="h4">
              Front-End Dev
            </Typography>
          </Slider>

          <Box
            mt="8px"
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "24px",
            }}>
            {linksMain.introLinks.map(({ btn_name, to }, index) => (
              <MainButton
                key={`${btn_name}${index * 2}`}
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
                  ...stylesAll.utilities.buttons.container,
                  zIndex: 5,
                }}
                sxLink={{
                  ...stylesAll.utilities.buttons.link,
                  textDecoration: "none",
                }}
                sxText={{
                  ...stylesAll.utilities.buttons.text,
                }}
                btn_name={btn_name}
                to={to}
                allowScroll={btn_name === "My Portfolio" ? false : true}
              />
            ))}
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12} md={3}>
        <Box
          sx={{
            position: "relative",
            ...stylesAll.intro.introImg.container,
          }}>
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
