import React, { ReactElement } from "react";
import Image from "next/image";
import { Box, Grid, Typography } from "@mui/material";
// import about_svg from "/img/About_Img/about_illustration_animated.svg";
// import about_img from "../../public/About_Img/about_illustration_photo.png";
// import bg_about from "../../public/Background/bg_about.svg";
import { props } from "../Utilities/StylesProvider";
import MainButton from "../Utilities/MainButton";
import SvgImages from "../Utilities/SvgImages";
import SocialIcons from "./SocialIcons";

function About(): ReactElement {
  const { stylesAll } = props;
  return (
    <Grid
      id="about"
      container
      spacing={1}
      justifyContent="space-between"
      alignItems="center"
      sx={{ marginTop: { Laptop: "40px" } }}>
      <Grid item xs={12} md={2} order={{ xs: 3, Laptop: 2 }}>
        <Box
          sx={{
            ...stylesAll.about.aboutImg.container,
            flexDirection: "column",
          }}>
          <Box
            sx={{
              position: "relative",
              display: {
                xs: "none",
                Laptop: "block",
              },
            }}>
            <object
              id="about-illustration-bg"
              type="image/svg+xml"
              data="/img/About_Img/about_illustration_animated.svg">
              svg-animation
            </object>
            <SvgImages svgType="about" />
            <img
              id="about-img"
              src="/img/About_Img/about_illustration_photo.png"
              alt=""
            />
          </Box>
          <SocialIcons sxBox={{ flexDirection: "column" }} />
        </Box>
      </Grid>
      <Grid
        container
        item
        xs={12}
        md={6}
        justifyContent="center"
        flexDirection="column"
        spacing={3}
        sx={{
          position: "relative",
          alignItems: { xs: "center", Laptop: "start" },
        }}
        order={{ xs: 2, Laptop: 3 }}>
        <img className="about-bg" src="/img/Background/bg_about.svg" alt="" />
        <Grid item xs={12}>
          <Typography
            variant="h3"
            sx={{
              ...stylesAll.utilities.title,
              textAlign: { xs: "center", Laptop: "start" },
            }}
            color="text.primary">
            Who I Am
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography
            variant="h6"
            sx={{
              ...stylesAll.about.aboutBox.body,
              textAlign: {
                xs: "center",
                Laptop: "start",
              },
            }}
            color="text.primary">
            I am Turkey-based Web Developer who’s designing and coding websites
            for over 2 years. My main focus is mostly on Front-End Development
            but when it requires I can also do Full-Stack Development as well.
            <br />
            <br />I am always open to learn new things to be able to adapt
            myself to the new technologies. I value team work because I get to
            have new valuable experiences.
          </Typography>
          <Typography
            variant="h6"
            sx={{
              ...stylesAll.about.aboutBox.body,
              textAlign: {
                xs: "center",
                Laptop: "start",
              },
              marginTop: "10px",
            }}
            color="text.primary">
            <b>Email:</b> om.ayhan247@gmail.com
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <MainButton
            sxButton={{
              ...stylesAll.utilities.buttons.container,
            }}
            sxLink={{
              ...stylesAll.utilities.buttons.link,
            }}
            sxText={{
              ...stylesAll.utilities.buttons.text,
            }}
            btn_name={"My Portfolio"}
          />
          <SocialIcons
            sxBox={{
              marginTop: "20px",
              display: { xs: "flex", Laptop: "none" },
              flexDirection: "column",
            }}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default About;
