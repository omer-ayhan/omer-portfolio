import { useState, useCallback } from "react";
import type { ReactElement, KeyboardEvent, MouseEvent } from "react";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  SwipeableDrawer,
  Typography,
} from "@mui/material";
import { linksMain, mainLangs } from "../Utilities/StylesProvider";
import ThemeSwitch from "../Utilities/ThemeSwitch";
import { Icon } from "@iconify/react";
import Popup from "../Utilities/Popup";
import SvgImages from "../Utilities/SvgImages";
import SetColor from "./SetColor";
import SmoothScroll from "../Utilities/ScrollUtils/SmoothScroll";
import Link from "next/link";
import { useRouter } from "next/router";
import ElevationScroll from "./ElevationScroll";
import styles from "./Navbar.style";
import stylesUtility from "../Utilities/Utilities.style";

type Anchor = "right";

type Langs = "en" | "tr";

function Navbar(): ReactElement {
  const mainLangsArray = Object.values(mainLangs);
  const router = useRouter();
  // @ts-ignore
  const langState: Langs = router.locale ?? "en";
  const [swipe, setSwipe] = useState({
    right: false,
  });

  const mapNavLinks = linksMain.navLinks.map(({ name, to }) => (
    <SmoothScroll
      key={name}
      toId={to}
      duration={1500}
      allowScroll
      sx={styles.navLinks.container}>
      <Typography
        variant="h5"
        component="span"
        sx={{
          ...styles.navLinks.text,
          textTransform: "capitalize",
        }}>
        {name}
      </Typography>
    </SmoothScroll>
  ));

  const mapMobileNavLinks = linksMain.navLinks.map(({ name, to }) => (
    <SmoothScroll
      key={name}
      toId={to}
      duration={1500}
      allowScroll
      sx={styles.navLinks.container}
      aria-label={name}>
      <ListItem button role="button" sx={styles.mobileMenu.navLinks}>
        <ListItemText
          role="textbox"
          primary={<Typography variant="h6">{name}</Typography>}
        />
      </ListItem>
    </SmoothScroll>
  ));

  const mapLangs = mainLangsArray.map((lang, index) => (
    <Box key={`${lang.flag}${index}`}>
      <Link href="/" locale={lang.label} passHref>
        <Button
          sx={{
            padding: "5px 10px 5px 15px",
          }}
          variant="text"
          startIcon={<Icon icon={lang.flag} className="nav-icons" />}
          color="primary"
          aria-describedby="select language button">
          <Typography
            sx={{
              fontWeight: 500,
              fontSize: styles.lang.text.fontSize.xs,
            }}
            variant="h6"
            color="text.primary">
            {lang.label}
          </Typography>
        </Button>
      </Link>
    </Box>
  ));

  const toggleDrawer = useCallback(
    (event: KeyboardEvent | MouseEvent, anchor: Anchor, open: boolean) => () => {
      if (
        event &&
        event.type === "keydown" &&
        ((event as KeyboardEvent).key === "Tab" ||
          (event as KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setSwipe({ ...swipe, [anchor]: open });
    },
    [swipe]
  );

  const mobileMenu = (anchor: Anchor) => (
    <Box
      role="presentation"
      onKeyDown={(event: KeyboardEvent | MouseEvent) =>
        toggleDrawer(event, anchor, false)
      }>
      <List>
        <ListItem sx={styles.mobileMenu.container}>
          <Popup
            startIcon={
              <Icon icon={mainLangs[langState].flag} width="40" height="40" />
            }
            btn={
              <Typography
                sx={{
                  fontWeight: 500,
                  fontSize: styles.lang.text.fontSize.xs,
                }}
                variant="h6"
                color="text.primary">
                {mainLangs[langState].label}
              </Typography>
            }
            content={mapLangs}
            isButton
          />
        </ListItem>
        {mapMobileNavLinks}
      </List>
    </Box>
  );

  return (
    <>
      <ElevationScroll>
        <AppBar sx={styles.appBar} position="fixed">
          <ThemeSwitch />
          <Box sx={styles.container}>
            <SmoothScroll toId="intro" sx={styles.logo} allowScroll>
              <SvgImages svgType="logo" />
            </SmoothScroll>
            <Box sx={styles.navLinks.show}>{mapNavLinks}</Box>
            <Box sx={stylesUtility.flexDefault}>
              <Box component="span" sx={styles.lang.show}>
                <Popup
                  startIcon={
                    <Icon
                      icon={mainLangs[langState].flag}
                      className="nav-icons"
                    />
                  }
                  btn={
                    <Typography
                      sx={styles.lang.text}
                      variant="h6"
                      color="text.primary">
                      {mainLangs[langState].label}
                    </Typography>
                  }
                  content={mapLangs}
                  isButton
                />
              </Box>
              <Box component="span">
                <Popup
                  btn={<SvgImages svgType="colorSet" />}
                  color="primary"
                  content={<SetColor />}
                  isButton={false}
                  isMenuClosable={false}
                />
              </Box>
              <Box component="span" sx={styles.mobileMenu.menuLogoShow}>
                <IconButton
                  color="inherit"
                  onClick={(event: KeyboardEvent | MouseEvent) =>
                    toggleDrawer(event, "right", true)
                  }>
                  <Icon
                    icon="icon-park-outline:hamburger-button"
                    width="40"
                    height="40"
                  />
                </IconButton>
              </Box>
            </Box>
          </Box>
        </AppBar>
      </ElevationScroll>
      <SwipeableDrawer
        sx={styles.mobileMenu.drawerShow}
        anchor={"right"}
        open={swipe["right"]}
        onClose={(event: KeyboardEvent | MouseEvent) =>
          toggleDrawer(event, "right", false)
        }
        onOpen={(event: KeyboardEvent | MouseEvent) =>
          toggleDrawer(event, "right", true)
        }>
        {mobileMenu("right")}
      </SwipeableDrawer>
    </>
  );
}

export default Navbar;
