import React, { ReactElement } from "react";
import { Grid, Typography } from "@mui/material";
import MainTabs from "./Utilities/MainTabs";
import { props } from "./Utilities/StylesProvider";
function Skills(): ReactElement {
  const { stylesAll } = props;

  return (
    <Grid
      id="skills"
      sx={{ ...stylesAll.utilities.gridContainer }}
      container
      justifyContent="center"
      alignItems="center">
      <Grid item xs={12}>
        <Typography
          variant="h3"
          sx={{
            ...stylesAll.utilities.title,
            textAlign: "center",
          }}
          color="text.primary">
          Skills
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <MainTabs
          spacing={{ ...stylesAll.skills.spacings }}
          cardWidth={{ ...stylesAll.skills.skillsWidth }}
          cardHeight={{ ...stylesAll.skills.skillsHeight }}
          apiRequest={{ url: process.env.SKILLS, category: "skills" }}
        />
      </Grid>
    </Grid>
  );
}

export default Skills;
