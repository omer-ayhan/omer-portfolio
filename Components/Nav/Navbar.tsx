import type { ReactElement, KeyboardEvent, MouseEvent } from "react";
import { cloneElement, useState } from "react";

import {
  AppBar,
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  SwipeableDrawer,
  Theme,
  Typography,
  useScrollTrigger,
} from "@mui/material";
import { linksMain, props } from "../Utilities/StylesProvider";
import ThemeSwitch from "../Utilities/ThemeSwitch";
import { Icon } from "@iconify/react";
import Popup from "../Utilities/Popup";
import SvgImages from "../Utilities/SvgImages";
import SetColor from "./SetColor";
import SmoothScroll from "../Utilities/ScrollUtils/SmoothScroll";
import { changeLang } from "../../context/reducers/navSlices";
import { useAppSelector, useAppDispatch } from "../../context/hooks";

type Anchor = "right";

interface Props {
  children: ReactElement;
}
const { colors, stylesAll } = props;

const ElevationScroll = (Props: Props) => {
  const { children } = Props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return cloneElement(children, {
    sx: {
      ...stylesAll.navbar.appBar,
      background: (theme: Theme) =>
        theme.palette.mode === "dark" ? colors.Darkdef : "#fff",
      boxShadow: (theme: Theme) =>
        trigger
          ? theme.palette.mode === "dark"
            ? `0px -1.05px 15px ${colors.DarkModeShadow}`
            : `0px -1.05px 15px ${colors.LightModeShadow}`
          : "none",
    },
  });
};

function Navbar(): ReactElement {
  const theme = useAppSelector((state) => state.nav);
  const dispatch = useAppDispatch();
  const [swipe, setSwipe] = useState({
    right: false,
  });

  const toggleDrawer =
    (anchor: Anchor, open: boolean) => (event: KeyboardEvent | MouseEvent) => {
      if (
        event &&
        event.type === "keydown" &&
        ((event as KeyboardEvent).key === "Tab" ||
          (event as KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setSwipe({ ...swipe, [anchor]: open });
    };

  const mobileMenu = (anchor: Anchor) => (
    <Box role="presentation" onKeyDown={toggleDrawer(anchor, false)}>
      <List>
        <ListItem
          sx={{
            ...stylesAll.navbar.mobileMenu.container,
          }}>
          <Popup
            startIcon={<Icon icon={theme.langFlag} width="40" height="40" />}
            btn={
              <Typography
                sx={{
                  fontWeight: 500,
                  fontSize: stylesAll.navbar.lang.text.fontSize.xs,
                }}
                variant="h6"
                color="text.primary">
                {theme.lang}
              </Typography>
            }
            content={linksMain.langs.map((lang, index) => (
              <Box key={`${lang.flag}${index}`}>
                <Button
                  sx={{
                    padding: "5px 10px 5px 15px",
                  }}
                  onClick={() =>
                    dispatch(
                      changeLang({
                        lang: lang.label,
                        langFlag: lang.flag,
                      })
                    )
                  }
                  variant="text"
                  startIcon={<Icon icon={lang.flag} className="nav-icons" />}
                  color="primary"
                  aria-describedby="select language button">
                  <Typography
                    sx={{
                      fontWeight: 500,
                      fontSize: stylesAll.navbar.lang.text.fontSize.xs,
                    }}
                    variant="h6"
                    color="text.primary">
                    {lang.label}
                  </Typography>
                </Button>
              </Box>
            ))}
            isButton
          />
        </ListItem>
        {linksMain.navLinks.map(({ name, to }, index) => (
          <SmoothScroll
            key={name}
            toId={to}
            duration={1500}
            allowScroll
            sx={{
              ...stylesAll.navbar.navLinks.container,
            }}
            aria-label={name}>
            <ListItem
              button
              role="button"
              sx={{ ...stylesAll.navbar.mobileMenu.navLinks }}>
              <ListItemText
                role="textbox"
                primary={<Typography variant="h6">{name}</Typography>}
              />
            </ListItem>
          </SmoothScroll>
        ))}
      </List>
    </Box>
  );
  return (
    <>
      <ElevationScroll>
        <AppBar
          sx={{
            ...stylesAll.navbar.appBar,
          }}
          position="fixed">
          <ThemeSwitch />
          <Box
            sx={{
              ...stylesAll.navbar.container,
            }}>
            <SmoothScroll
              toId="intro"
              sx={{ ...stylesAll.navbar.logo }}
              allowScroll>
              <SvgImages svgType="logo" />
            </SmoothScroll>
            <Box sx={{ display: { xs: "none", Laptop: "block" } }}>
              {linksMain.navLinks.map(({ name, to }) => (
                <SmoothScroll
                  key={name}
                  toId={to}
                  duration={1500}
                  allowScroll
                  sx={{
                    ...stylesAll.navbar.navLinks.container,
                  }}>
                  <Typography
                    variant="h5"
                    component="span"
                    sx={{
                      ...stylesAll.navbar.navLinks.text,
                      textTransform: "capitalize",
                    }}>
                    {name}
                  </Typography>
                </SmoothScroll>
              ))}
            </Box>
            <Box
              sx={{
                ...stylesAll.utilities.flexDefault,
              }}>
              <Box
                component="span"
                sx={{
                  display: { xs: "none", Mobile_L: "inline" },
                }}>
                <Popup
                  startIcon={
                    <Icon icon={theme.langFlag} className="nav-icons" />
                  }
                  btn={
                    <Typography
                      sx={{
                        ...stylesAll.navbar.lang.text,
                      }}
                      variant="h6"
                      color="text.primary">
                      {theme.lang}
                    </Typography>
                  }
                  content={linksMain.langs.map((lang, index) => (
                    <Box key={`${lang.flag}${index}`}>
                      <Button
                        sx={{
                          padding: "5px 10px 5px 15px",
                        }}
                        onClick={() =>
                          dispatch(
                            changeLang({
                              lang: lang.label,
                              langFlag: lang.flag,
                            })
                          )
                        }
                        variant="text"
                        startIcon={
                          <Icon icon={lang.flag} className="nav-icons" />
                        }
                        color="primary"
                        aria-describedby="select language button">
                        <Typography
                          sx={{
                            ...stylesAll.navbar.lang.content.text,
                          }}
                          variant="h6"
                          color="text.primary">
                          {lang.label}
                        </Typography>
                      </Button>
                    </Box>
                  ))}
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
              <Box
                component="span"
                sx={{ display: { xs: "inline", Laptop: "none" } }}>
                <IconButton
                  color="inherit"
                  onClick={toggleDrawer("right", true)}>
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
        sx={{ display: { xs: "block", Laptop: "none" } }}
        anchor={"right"}
        open={swipe["right"]}
        onClose={toggleDrawer("right", false)}
        onOpen={toggleDrawer("right", true)}>
        {mobileMenu("right")}
      </SwipeableDrawer>
    </>
  );
}

export default Navbar;
