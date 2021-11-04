import React, { ReactElement } from "react";
import { Grid, Typography, Card, CardContent } from "@mui/material";
import MainTabs from "./Utilities/MainTabs";
import { Icon } from "@iconify/react";
import { props, tabObjects } from "./Utilities/StylesProvider";
import { adjustTextColor } from "./Utilities/ColorUtils/adjustColor";
import axios, { AxiosResponse } from "axios";
type TabDataTypes = {
  title: string;
  icon: string;
};
function Skills(): ReactElement {
  const { stylesAll, colors } = props;
  const [tabData, setTabData] = React.useState<object & Array<TabDataTypes>>(
    []
  );

  React.useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      // axios get request
      // save data to tabData as an array of objects
      axios
        .get("api/skills")
        .then((res: AxiosResponse) => {
          setTabData(res.data);
        })
        .catch((err) => {
          console.log(err);
          return;
        });
    }
    return () => {
      isMounted = false;
    };
  }, []);

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
          apiRequest={"api/skills"}
          contents={tabObjects.skillsCard.map(({ title, icon }, index) => (
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
          ))}
        />
      </Grid>
    </Grid>
  );
}

export default Skills;
