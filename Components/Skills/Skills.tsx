import type { ReactElement } from "react";
import { Grid, Typography } from "@mui/material";
import dynamic from "next/dynamic";
const MainTabs = dynamic(() => import("../Utilities/MainTabs"));
import styles from "./Skills.style";
import stylesUtility from "../Utilities/Utilities.style";
import type { TabDataTypes } from "../Utilities/MainTabs/TabTypes";

interface Props {
  tabData: Array<TabDataTypes>;
}

function Skills({ tabData }: Props): ReactElement {
  return (
    <Grid
      id="skills"
      sx={stylesUtility.gridContainer}
      container
      justifyContent="center"
      alignItems="center">
      <Grid item xs={12}>
        <Typography
          variant="h3"
          textAlign="center"
          sx={stylesUtility.title}
          color="text.primary">
          Skills
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <MainTabs
          spacing={styles.spacings}
          cardWidth={styles.skillsWidth}
          cardHeight={styles.skillsHeight}
          category="skills"
          channelName={process.env.NEXT_PUBLIC_SKILLS_CHANNEL}
          incomingData={tabData}
        />
      </Grid>
    </Grid>
  );
}

export default Skills;
