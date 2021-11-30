import React, { useState } from "react";
import type { FormEvent, ReactElement } from "react";
import { Grid, Typography } from "@mui/material";
import { Icon } from "@iconify/react";
import Popup from "../Utilities/Popup";
import { FormInput } from "../Utilities/StylesProvider";
// import Filter from "./Filter";
import ImageSSR from "../Utilities/ImageSSR";
import dynamic from "next/dynamic";
const MainTabs = dynamic(() => import("../Utilities/MainTabs"));
const ProjectTags = dynamic(() => import("./ProjectTags"));
const Filter = dynamic(() => import("./Filter"), {
  loading: () => <div>Loading...</div>,
});
import styles from "./Projects.style";
import stylesUtility from "../Utilities/Utilities.style";

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
interface Props {
  tabData: Array<TabDataTypes[]>;
}

function Projects({ tabData }: Props): ReactElement {
  const [searchInput, setSearchInput] = useState("");

  const preventDefault = (e: FormEvent<HTMLFormElement>) => e.preventDefault();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearchInput(e.target.value);

  return (
    <Grid
      id="projects"
      container
      position="relative"
      sx={stylesUtility.gridContainer}
      spacing={1}>
      <ImageSSR
        className="projects-bg"
        path="/img/Background/bg_projects.png"
      />
      <Grid item xs={12} mb="20px">
        <Typography
          variant="h3"
          textAlign="center"
          sx={stylesUtility.title}
          color="text.primary">
          Projects
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <MainTabs
          spacing={styles.spacing}
          rowSpacing={styles.rowSpacing}
          cardWidth={styles.projectsWidth}
          cardHeight={styles.projectsHeight}
          category="projects"
          searchInput={searchInput}
          incomingData={tabData[0]}
          channelName={process.env.NEXT_PUBLIC_PROJECTS_CHANNEL}>
          <Grid container gap="20px" mb="50px" sx={stylesUtility.gridDefault}>
            <form onSubmit={preventDefault} style={{ position: "relative" }}>
              <FormInput
                placeholder="Search"
                id="search"
                onChange={handleSearch}
                startAdornment={<Icon id="search-icon" icon="fe:search" />}
              />
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
              flexDirection="row"
              sx={styles.tags.gridContainer}>
              <ProjectTags incomingData={tabData[1]} />
            </Grid>
          </Grid>
        </MainTabs>
      </Grid>
    </Grid>
  );
}

export default Projects;
