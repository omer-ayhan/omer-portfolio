import React, { ReactElement } from "react";
import { Tabs, Tab, Typography, Box, Grid } from "@mui/material";
import { Icon } from "@iconify/react";
import { props } from "./StylesProvider";
import axios, { AxiosResponse } from "axios";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
  ariaName?: string | "tabpanel";
  cardWidth: string | number | object;
  cardHeight: string | number | object;
  spacing?: object | { xs: 1 };
  rowSpacing?: object;
}
const { stylesAll } = props;

function TabPanel({
  children,
  index,
  value,
  ariaName,
  cardWidth,
  cardHeight,
  spacing,
  rowSpacing,
  ...rest
}: TabPanelProps): ReactElement {
  return (
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
  );
}

function a11yProps(index: number, ariaName?: string | "tabpanel") {
  return {
    id: `tab-${index}`,
    "aria-controls": `${ariaName}-${index}`,
  };
}

interface IAppProps {
  children?: React.ReactNode | HTMLElement;
  ariaName?: string | "tabpanel";
  contents: JSX.Element | JSX.Element[];
  cardWidth: string | number | object;
  cardHeight: string | number | object;
  spacing?: object | { xs: 1 };
  rowSpacing?: object;
  apiRequest: { url: string; category: string };
}
type TabDataTypes = {
  title: string;
  icon: string;
};

function MainTabs({
  children,
  ariaName,
  apiRequest,
  contents,
  cardWidth,
  cardHeight,
  spacing,
  rowSpacing,
}: IAppProps): ReactElement {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const [tabData, setTabData] = React.useState<object & Array<TabDataTypes>>(
    []
  );

  React.useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      axios
        .get(apiRequest.url)
        .then((res: AxiosResponse) => {
          setTabData(res.data);
        })
        .catch((err) => {
          console.log(err.message);
          return;
        });
    }
    return (): void => {
      isMounted = false;
    };
  }, [apiRequest]);

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
          {tabData.map(({ title, icon }, index) => (
            <Tab
              key={`${title}-${index}`}
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
        <TabPanel
          spacing={spacing}
          rowSpacing={rowSpacing}
          cardWidth={cardWidth}
          cardHeight={cardHeight}
          ariaName={ariaName}
          value={value}
          index={0}>
          {contents}
        </TabPanel>
        <TabPanel
          spacing={spacing}
          rowSpacing={rowSpacing}
          cardWidth={cardWidth}
          cardHeight={cardHeight}
          ariaName={ariaName}
          value={value}
          index={1}>
          Item 2
        </TabPanel>
        <TabPanel
          spacing={spacing}
          rowSpacing={rowSpacing}
          cardWidth={cardWidth}
          cardHeight={cardHeight}
          ariaName={ariaName}
          value={value}
          index={2}>
          Item 3
        </TabPanel>
      </Box>
    </Box>
  );
}

export default MainTabs;
