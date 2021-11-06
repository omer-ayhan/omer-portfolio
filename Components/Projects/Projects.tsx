import React, { ReactElement, useState } from "react";
import { Grid, Typography } from "@mui/material";
import { Icon } from "@iconify/react";
import MainTabs from "../Utilities/MainTabs";
import Popup from "../Utilities/Popup";
import { FormInput, props, tabObjects } from "../Utilities/StylesProvider";
import MainTag from "../Utilities/MainTag";
import Filter from "./Filter";
import { useAppSelector, useAppDispatch } from "../../context/hooks";
import { addTag, removeTag } from "../../context/reducers/projectSlices";
import { ImageSSR } from "../Utilities/ImageSSR";
import axios, { AxiosResponse } from "axios";
type TagDataTypes = {
  _id: string;
  title: string;
  icon: string;
};
function Projects(): ReactElement {
  const stateTags = useAppSelector((state) => state.projects.tags);
  const dispatch = useAppDispatch();
  const { stylesAll } = props;
  const [searchInput, setSearchInput] = useState("");
  const [tagData, setTagData] = React.useState<Array<TagDataTypes>>([]);

  React.useEffect(
    () => {
      const abortController = new AbortController();
      const signal = abortController.signal;
      axios
        .get(process.env.PROJECT_TAGS, {
          method: "GET",
          signal: signal,
        })
        .then((res: AxiosResponse) => {
          setTagData(
            res.data.map((tag: TagDataTypes) => ({
              title: tag.title,
              icon: tag.icon,
              _id: tag._id,
            }))
          );
        })
        .catch((err) => {
          console.log(err.message);
          return;
        });

      return (): void => {
        abortController.abort();
      };
    },
    // cleanup for api
    //   const abortController = new AbortController();
    //   const signal = abortController.signal;
    //     axios
    //       .get(process.env.PROJECT_TAGS, {signal})
    //       .then((res: AxiosResponse) => {
    //         setTagData(res.data);
    //       })
    //       .catch((err) => {
    //         console.log(err.message);
    //         return;
    //       });
    //   return (): void => {
    //     isMounted = false;
    //   };
    // },
    []
  );

  const handleTags = (tags: string[], title: string) => {
    let titleText = title.toUpperCase();
    if (tags.includes(titleText)) {
      dispatch(removeTag({ title: titleText }));
    } else {
      dispatch(addTag({ title: titleText }));
    }
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
      <ImageSSR
        className="projects-bg"
        path="/img/Background/bg_projects.svg"
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
      <Grid item xs={12}>
        <MainTabs
          spacing={{ ...stylesAll.projects.spacing }}
          rowSpacing={{ ...stylesAll.projects.rowSpacing }}
          cardWidth={{ ...stylesAll.projects.projectsWidth }}
          cardHeight={{ ...stylesAll.projects.projectsHeight }}
          apiRequest={{ url: process.env.PROJECTS, category: "projects" }}
          searchInput={searchInput}>
          <Grid
            container
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
                {tagData.map(({ title, icon, _id }) => (
                  <Grid key={_id} item xs={2} mx="3.5px">
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
