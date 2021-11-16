import type { ReactElement } from "react";
import { Grid, Typography } from "@mui/material";
import MainTabs from "./Utilities/MainTabs";
import { props as StyleProps } from "./Utilities/StylesProvider";

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
  tabData: Array<TabDataTypes>;
}

const { stylesAll } = StyleProps;
function Skills({ tabData }: Props): ReactElement {
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
          category="skills"
          channelName="skillCards"
          incomingData={tabData}
        />
      </Grid>
    </Grid>
  );
}

export default Skills;
