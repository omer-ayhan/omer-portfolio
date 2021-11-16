import { useCallback, useEffect, useState, memo, useMemo } from "react";
import type { ReactElement, ReactNode, SyntheticEvent } from "react";
import {
  Tabs,
  Tab,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  List,
} from "@mui/material";
import { Icon } from "@iconify/react";
import { props } from "./StylesProvider";
import { useAppSelector } from "../../context/hooks";
import useChannels from "./useChannels";
import Slider from "react-slick";
import ImageSSR from "./ImageSSR";
import Truncation from "../Projects/Truncation";
import MainTag from "./MainTag";
import MainButton from "./MainButton";
import { adjustTextColor } from "./ColorUtils/adjustColor";

interface TabPanelProps {
  children?: ReactNode;
  index: number;
  value: number;
  ariaName?: string | "tabpanel";
  cardWidth: string | number | object;
  cardHeight: string | number | object;
  spacing?: object | { xs: 1 };
  rowSpacing?: object;
}
const { stylesAll, colors } = props;
const settings = {
  className: "image-slider",
  dots: true,
  arrows: false,
  infinite: true,
  swipeToSlide: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  appendDots: (dots: HTMLElement) => (
    <Box
      sx={{
        ...stylesAll.utilities.flexDefault,
        ...stylesAll.projects.card.slider.container,
        position: "relative",
        "& .slick-dots": {
          left: 0,
        },
      }}>
      <List
        sx={{
          ...stylesAll.utilities.flexDefault,
          ...stylesAll.projects.card.slider.list.container,
          "& li": {
            ...stylesAll.projects.card.slider.list.listChild.container,
          },
          ".slick-active": {
            background: (theme) => theme.palette.secondary.main,
          },
        }}>
        {dots}
      </List>
    </Box>
  ),
  customPaging: () => (
    <Box
      sx={{
        ...stylesAll.projects.card.slider.list.listChild.dots,
      }}></Box>
  ),
};

function TabPanel({
  children,
  index,
  value,
  ariaName = "tabpanel",
  cardWidth,
  cardHeight,
  spacing = { xs: 1 },
  rowSpacing,
  ...rest
}: TabPanelProps): ReactElement {
  return useMemo(
    () => (
      <Box
        mt={0}
        role="tabpanel"
        hidden={value !== index}
        id={`${ariaName}-${index}`}
        aria-labelledby={`tab-${index}`}
        {...rest}>
        {value === index && (
          <Grid
            container
            spacing={{ ...spacing }}
            rowSpacing={{ ...(rowSpacing || spacing) }}
            sx={{
              ...stylesAll.mainTabs.tabPanel.container,
              width: cardWidth,
              height: cardHeight,
              overflow: "hidden",
              overflowY: "scroll",
            }}>
            {children}
          </Grid>
        )}
      </Box>
    ),
    [value, children]
  );
}

function a11yProps(index: number, ariaName?: string | "tabpanel") {
  return {
    id: `tab-${index}`,
    "aria-controls": `${ariaName}-${index}`,
  };
}

interface IAppProps {
  children?: ReactNode | HTMLElement;
  ariaName?: string | "tabpanel";
  cardWidth: string | number | object;
  cardHeight: string | number | object;
  spacing?: object | { xs: number };
  rowSpacing?: object;
  category: string;
  searchInput?: string;
  channelName: string;
  incomingData: Array<TabDataTypes>;
}
type TabDataTypes = {
  title: string;
  icon: string;
  _id: string;
  items: TabDataItems[];
};

type TabDataItems = {
  title: string;
  desc: string;
  icon: string;
  img: string[];
  link: string;
  tags: Array<TabDataItems>;
};

function MainTabs({
  children,
  ariaName = "tabpanel",
  category,
  cardWidth,
  searchInput = "",
  cardHeight,
  spacing = { xs: 1 },
  rowSpacing,
  channelName,
  incomingData,
}: IAppProps): ReactElement {
  const [value, setValue] = useState(0);
  const stateTags = useAppSelector((state) => state.projects);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const [tabData, setTabData] = useState<Array<TabDataTypes>>(incomingData);

  useChannels(
    channelName,
    (channel) => {
      channel.subscribe("insertCard", (card) => {
        setTabData([...card.data]);
      });
      channel.subscribe("updateCard", (card) => {
        setTabData((tabData) => [
          ...tabData.map((item) => {
            if (item._id === card.data._id) {
              return card.data;
            }
            return item;
          }),
        ]);
      });
      channel.subscribe("deleteCard", (card) => {
        setTabData((tabData) =>
          tabData.filter((tab) => tab._id !== card.data._id)
        );
      });
    },
    [incomingData]
  );

  useEffect(() => {
    if (category === "projects") {
      setTabData(
        incomingData.map((data) => {
          if (data.items.length > 1)
            data.items.sort((a, b) =>
              stateTags.sortByTitle === "asc"
                ? a.title.localeCompare(b.title)
                : b.title.localeCompare(a.title)
            );
          return data;
        })
      );
    }
  }, [stateTags.sortByTitle]);

  const setSectionContent = useCallback(
    (items: Array<TabDataItems>) => {
      switch (category) {
        case "projects":
          return items
            .filter(
              ({ title, desc, tags }) =>
                (stateTags.tags.length === 0 ||
                  tags.some(
                    ({ title }) =>
                      title.toUpperCase() ===
                      stateTags.tags[
                        stateTags.tags.indexOf(title.toUpperCase())
                      ]
                  )) &&
                (searchInput === "" ||
                  title.toUpperCase().includes(searchInput.toUpperCase()) ||
                  desc.toUpperCase().includes(searchInput.toUpperCase()))
            )
            .map(({ title, desc, img, tags, link }, index) => (
              <Grid key={`${title}-${index}`} item xs={12} lg={6} md={4}>
                <Card
                  sx={{
                    ...stylesAll.projects.card.container,
                    flexDirection: "column",
                    boxShadow: (theme) =>
                      theme.palette.mode === "dark"
                        ? `0px 0px 16.3px ${colors.DarkModeShadow}`
                        : `0px 0px 16.3px ${colors.LightModeShadow}`,
                  }}>
                  {/* Image slider */}
                  <Slider {...settings} lazyLoad="ondemand">
                    {img.map((imgFile, index) => (
                      <ImageSSR
                        key={`${imgFile}-${index}`}
                        comp="div"
                        sx={{
                          position: "relative",
                          width: "100%",
                          cursor: img.length > 1 ? "grab" : "default",
                          "&:active": {
                            cursor: img.length > 1 ? "grabbing" : "default",
                          },
                          height: {
                            xs: "145px",
                            Mobile_L: "165px",
                            Laptop_M: "170px",
                            FourK: "250px",
                          },
                        }}
                        path={imgFile}
                        objectFit="contain"
                      />
                    ))}
                  </Slider>

                  <CardContent
                    sx={{ width: "100%", minHeight: "110px", padding: 0 }}>
                    <Typography
                      variant="h6"
                      sx={{
                        ...stylesAll.projects.card.text.title,
                        textTransform: "capitalize",
                        textAlign: "start",
                      }}>
                      {title}
                    </Typography>
                    <Truncation text={desc} />
                  </CardContent>
                  <CardContent
                    sx={{
                      width: "100%",
                      transition: ".3s ease",
                      padding: 0,
                    }}>
                    <Grid
                      container
                      spacing={{ xs: 1, Laptop_M: 1 }}
                      justifyContent="space-between"
                      alignItems="center">
                      {tags.map(({ title, icon }) => (
                        <Grid key={`${title}-${index}`} item xs={4}>
                          <MainTag
                            sxBox={{
                              ...stylesAll.projects.card.tags.container,
                            }}
                            sxText={{
                              ...stylesAll.projects.card.tags.text,
                            }}
                            icon={icon}
                            title={title}
                            className={"card-tag-icons"}
                          />
                        </Grid>
                      ))}
                    </Grid>
                  </CardContent>
                  <CardActions sx={{ padding: 0 }}>
                    <MainButton
                      sxButton={{
                        ...stylesAll.projects.card.buttons.container,
                      }}
                      sxLink={{
                        ...stylesAll.utilities.buttons.link,
                      }}
                      sxText={{
                        ...stylesAll.projects.card.buttons.text,
                        textAlign: "center",
                      }}
                      btn_name={"See More"}
                      to={link}
                    />
                  </CardActions>
                </Card>
              </Grid>
            ));
        case "skills":
          return items.map(({ title, icon }, index) => (
            <Grid
              key={`${title}-${index}`}
              item
              xs={12}
              sm={6}
              md={3}
              sx={{
                transition: "inherit",
                "&:hover": {
                  marginTop: "-22px",
                },
              }}>
              <Card
                sx={{
                  ...stylesAll.skills.card.container,
                  boxShadow: (theme) =>
                    theme.palette.mode === "dark"
                      ? `0px 0px 16.3px ${colors.DarkModeShadow}`
                      : `0px 0px 16.3px ${colors.LightModeShadow}`,
                  position: "relative",
                  flexDirection: "column",
                  "&:hover": {
                    backgroundColor: "secondary.main",
                    boxShadow: "none",
                    color: (theme) =>
                      adjustTextColor(theme.palette.secondary.main),
                  },
                }}>
                <Icon icon={icon} className="skills-icons" />
                <CardContent sx={{ padding: 0 }}>
                  <Typography
                    variant="h5"
                    sx={{
                      ...stylesAll.skills.card.title,
                      textAlign: "center",
                    }}>
                    {title}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ));
      }
    },
    [stateTags.tags, searchInput]
  );

  return (
    <Box>
      <Box
        sx={{
          ...stylesAll.utilities.flexDefault,
          flexDirection: "column",
          border: "none",
        }}>
        <Tabs
          sx={{
            ...stylesAll.mainTabs.tabs.container,
            "& .MuiTabs-scrollButtons": {
              color: "text.primary",
            },
          }}
          TabIndicatorProps={{
            style: {
              display: "none",
            },
          }}
          value={value}
          onChange={handleChange}
          aria-label="main-tabs"
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
          selectionFollowsFocus>
          {tabData.map(({ title, icon, _id }, index) => (
            <Tab
              key={`${icon}-${_id}`}
              sx={{
                ...stylesAll.mainTabs.tabs.element,
              }}
              label={
                <Typography
                  component="span"
                  sx={{
                    ...stylesAll.mainTabs.tabs.label,
                    color: value === index ? "secondary.main" : "#82808B",
                    textAlign: "center",
                    textTransform: "none",
                  }}>
                  <Icon icon={icon} color="inherit" className="tab-icons" />
                  <br />
                  {title}
                </Typography>
              }
              {...a11yProps(index, ariaName)}
            />
          ))}
        </Tabs>
        {children}
        {tabData.map((tab, index) => (
          <TabPanel
            key={`${tab.title}-${tab._id}`}
            spacing={spacing}
            rowSpacing={rowSpacing}
            cardWidth={cardWidth}
            cardHeight={cardHeight}
            ariaName={ariaName}
            value={value}
            index={index}>
            {setSectionContent(tab.items)}
          </TabPanel>
        ))}
      </Box>
    </Box>
  );
}

export default memo(MainTabs);
