import type { ReactElement } from "react";
import { Box, Grid, Link, Typography } from "@mui/material";
import MainButton from "../Utilities/MainButton";
import SvgImages from "../Utilities/SvgImages";
import SocialIcons from "./SocialIcons";
import ImageSSR from "../Utilities/ImageSSR";
import styles from "./About.style";
import stylesUtility from "../Utilities/Utilities.style";

function About(): ReactElement {
  return (
    <Grid
      id="about"
      container
      spacing={1}
      justifyContent="space-between"
      alignItems="center"
      mt={{ Laptop: "40px" }}>
      <Grid item xs={12} md={2} order={styles.aboutImg.order}>
        <Box sx={styles.aboutImg.container} flexDirection="column">
          <Box position="relative" sx={styles.aboutImg.innerContainer}>
            <object
              id="about-illustration-bg"
              type="image/svg+xml"
              data="/img/About_Img/about_illustration_animated.svg">
              svg-animation
            </object>
            <SvgImages svgType="about" />
            <ImageSSR
              id="about-img"
              path="/img/About_Img/about_illustration_photo.png"
            />
          </Box>
          <SocialIcons />
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
        position="relative"
        sx={{
          alignItems: styles.aboutBox.alignText,
        }}
        order={styles.aboutBox.order}>
        <ImageSSR className="about-bg" path="/img/Background/bg_about.svg" />
        <Grid item xs={12}>
          <Typography
            variant="h3"
            textAlign={styles.aboutBox.alignText as any}
            sx={stylesUtility.title}
            color="text.primary">
            Who I Am
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography
            variant="h6"
            textAlign={styles.aboutBox.alignText as any}
            sx={styles.aboutBox.body}
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
            mt="10px"
            textAlign={styles.aboutBox.alignText as any}
            sx={styles.aboutBox.body}
            color="text.primary">
            <b>Email:</b>{" "}
            <Link href="mailto:om.ayhan247@gmail.com">
              om.ayhan247@gmail.com
            </Link>
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <MainButton
            sxButton={stylesUtility.buttons.container}
            sxLink={stylesUtility.buttons.link}
            sxText={stylesUtility.buttons.text}
            btn_name="My Portfolio"
          />
          <SocialIcons sxBox={styles.aboutBox.socialIcons} />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default About;
