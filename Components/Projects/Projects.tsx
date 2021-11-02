import React, { ReactElement, useState } from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  List,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { Icon } from "@iconify/react";
import MainTabs from "../Utilities/MainTabs";
import Popup from "../Utilities/Popup";
import { FormInput, props, tabObjects } from "../Utilities/StylesProvider";
// import bg_projects from "/img/Background/bg_projects.svg";
import MainTag from "../Utilities/MainTag";
import MainButton from "../Utilities/MainButton";
import Filter from "./Filter";
import { useAppSelector, useAppDispatch } from "../../context/hooks";
import { addTag, removeTag } from "../../context/reducers/projectSlices";
import Truncation from "./Truncation";
import Slider from "react-slick";

function Projects(): ReactElement {
  const stateTags = useAppSelector((state) => state.projects.tags);
  const dispatch = useAppDispatch();
  const { stylesAll, colors } = props;
  const [searchInput, setSearchInput] = useState("");

  const handleTags = (tags: string[], title: string) => {
    let titleText = title.toUpperCase();
    if (tags.includes(titleText)) {
      dispatch(removeTag({ title: titleText }));
    } else {
      dispatch(addTag({ title: titleText }));
    }
  };

  const settings = {
    className: "image-slider",
    dots: true,
    arrows: false,
    infinite: true,
    swipeToSlide: true,
    speed: 500,
    lazyLoad: "ondemand",
    slidesToShow: 1,
    slidesToScroll: 1,
    appendDots: (dots: HTMLElement) => (
      <Box
        sx={{
          ...stylesAll.utilities.flexDefault,
          ...stylesAll.projects.card.slider.container,
          position: "relative",
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

  return (
    <Grid
      id="projects"
      container
      sx={{
        ...stylesAll.utilities.gridContainer,
        position: "relative",
      }}
      spacing={1}>
      <img
        className="projects-bg"
        src="/img/Background/bg_projects.svg"
        alt=""
      />
      <Grid
        item
        xs={12}
        sx={{
          marginBottom: "20px",
        }}>
        <Typography
          variant="h3"
          sx={{
            ...stylesAll.utilities.title,
            textAlign: "center",
          }}
          color="text.primary">
          Projects
        </Typography>
      </Grid>
      {/* <Grid
        item
        container
        xs={12}
        sx={{
          ...stylesAll.utilities.gridDefault,
          gap: "20px",
        }}>
        <form
          onSubmit={(e) => e.preventDefault()}
          style={{ position: "relative" }}>
          <FormInput
            placeholder="Search"
            id="search"
            value={searchInput}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearchInput(e.target.value)
            }
          />
          <Icon id="search-icon" icon="fe:search" />
          <span id="filter">
            <Popup
              btn={<Icon id="filter-icon" icon="fluent:filter-24-filled" />}
              content={<Filter />}
              isButton={false}
              isMenuClosable={false}
            />
          </span>
        </form>
        <Grid
          item
          xs={12}
          sx={{
            ...stylesAll.projects.tags.gridContainer,
            flexDirection: "row",
          }}>
          <Grid
            container
            spacing={{ xs: 1 }}
            justifyContent="center"
            alignItems="center">
            {tabObjects.projectTags.map(({ title, icon }, index) => (
              <Grid key={index} item xs={2}>
                <MainTag
                  onClick={() => handleTags(stateTags, title)}
                  sxBox={{
                    ...stylesAll.projects.tags.container,
                  }}
                  sxText={{
                    ...stylesAll.projects.tags.text,
                  }}
                  icon={icon}
                  title={title}
                  className={"project-tag-icons"}
                  isClickable
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid> */}
      <Grid item xs={12}>
        <MainTabs
          spacing={{ ...stylesAll.projects.spacing }}
          rowSpacing={{ ...stylesAll.projects.rowSpacing }}
          cardWidth={{ ...stylesAll.projects.projectsWidth }}
          cardHeight={{ ...stylesAll.projects.projectsHeight }}
          tabSection={tabObjects.projectsTab}
          contents={tabObjects.projectsCard
            .filter(
              ({ title, desc, tags }) =>
                (stateTags.length === 0 ||
                  tags.some(
                    ({ title }) =>
                      title.toUpperCase() ===
                      stateTags[stateTags.indexOf(title.toUpperCase())]
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
                  <Slider {...settings}>
                    {img.map((imgFile, index) => (
                      <CardMedia
                        key={`${imgFile}-${index}`}
                        sx={{ objectFit: "contain" }}
                        component="img"
                        width="100%"
                        height="100%"
                        src={imgFile}
                        alt={title}
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
            ))}>
          <Grid
            // item
            container
            // xs={12}
            sx={{
              ...stylesAll.utilities.gridDefault,
              marginBottom: "50px",
              gap: "20px",
            }}>
            <form
              onSubmit={(e) => e.preventDefault()}
              style={{ position: "relative" }}>
              <FormInput
                placeholder="Search"
                id="search"
                value={searchInput}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setSearchInput(e.target.value)
                }
              />
              <Icon id="search-icon" icon="fe:search" />
              <span id="filter">
                <Popup
                  btn={<Icon id="filter-icon" icon="fluent:filter-24-filled" />}
                  content={<Filter />}
                  isButton={false}
                  isMenuClosable={false}
                />
              </span>
            </form>
            <Grid
              item
              xs={12}
              sx={{
                ...stylesAll.projects.tags.gridContainer,
                flexDirection: "row",
              }}>
              <Grid
                container
                spacing={1}
                justifyContent="center"
                alignItems="center">
                {tabObjects.projectTags.map(({ title, icon }, index) => (
                  <Grid key={index} item xs={2} mx="3.5px">
                    <MainTag
                      onClick={() => handleTags(stateTags, title)}
                      sxBox={{
                        ...stylesAll.projects.tags.container,
                      }}
                      sxText={{
                        ...stylesAll.projects.tags.text,
                      }}
                      icon={icon}
                      title={title}
                      className={"project-tag-icons"}
                      isClickable
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </MainTabs>
      </Grid>
    </Grid>
  );
}

export default Projects;
