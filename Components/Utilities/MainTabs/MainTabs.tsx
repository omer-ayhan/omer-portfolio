import { useCallback, useEffect, useState, memo } from "react";
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
import { useAppSelector } from "../../../context/hooks";
import useChannels from "../hooks/useChannels";
import Slider from "react-slick";
import ImageSSR from "../ImageSSR";
import Truncation from "../../Projects/Truncation";
import MainTag from "../MainTag";
import MainButton from "../MainButton";
import TabPanel from "./TabPanel";
import styles from "./MainTabs.style";
import stylesUtility from "../Utilities.style";
import stylesProjects from "../../Projects/Projects.style";
import stylesSkills from "../../Skills/Skills.style";
import type { TabDataItems, TabDataTypes } from "./TabTypes";

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
      position="relative"
      sx={{
        ...stylesUtility.flexDefault,
        ...stylesProjects.card.slider.container,
      }}>
      <List
        sx={{
          ...stylesUtility.flexDefault,
          ...stylesProjects.card.slider.list.container,
          "& li": {
            ...stylesProjects.card.slider.list.listChild.container,
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
    <Box sx={stylesProjects.card.slider.list.listChild.dots}></Box>
  ),
};

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
  category: "projects" | "skills";
  searchInput?: string;
  channelName: string;
  incomingData: Array<TabDataTypes>;
}

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
                <Card sx={styles.projectsSection.container as any}>
                  {/* Image slider */}
                  <Slider {...settings} lazyLoad="ondemand">
                    {img.map((imgFile, index) => (
                      <ImageSSR
                        key={`${imgFile}-${index}`}
                        comp="div"
                        sx={{
                          ...styles.projectsSection.slider,
                          cursor: img.length > 1 ? "grab" : "default",
                          "&:active": {
                            cursor: img.length > 1 ? "grabbing" : "default",
                          },
                        }}
                        path={imgFile}
                        objectFit="contain"
                      />
                    ))}
                  </Slider>

                  <CardContent sx={styles.projectsSection.content.title}>
                    <Typography
                      variant="h6"
                      textAlign="start"
                      sx={stylesProjects.card.text.title as any}>
                      {title}
                    </Typography>
                    <Truncation text={desc} />
                  </CardContent>
                  <CardContent sx={styles.projectsSection.content.tags}>
                    <Grid
                      container
                      spacing={styles.projectsSection.content.spacing}
                      justifyContent="space-between"
                      alignItems="center">
                      {tags.map(({ title, icon }) => (
                        <Grid key={`${title}-${index}`} item xs={4}>
                          <MainTag
                            sxBox={stylesProjects.card.tags.container}
                            sxText={stylesProjects.card.tags.text}
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
                      sxButton={stylesProjects.card.buttons.container}
                      sxLink={stylesUtility.buttons.link}
                      sxText={stylesProjects.card.buttons.text}
                      btn_name="See More"
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
              sx={styles.skillsSection.grid}>
              <Card sx={styles.skillsSection.container as any}>
                <Icon icon={icon} className="skills-icons" />
                <CardContent sx={{ padding: 0 }}>
                  <Typography
                    variant="h5"
                    textAlign="center"
                    sx={stylesSkills.card.title}>
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
      <Box flexDirection="column" border="none" sx={stylesUtility.flexDefault}>
        <Tabs
          sx={styles.tabs.container}
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
              sx={styles.tabs.element}
              label={
                <Typography
                  component="span"
                  textAlign="center"
                  sx={{
                    ...styles.tabs.label,
                    color: value === index ? "secondary.main" : "#82808B",
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
