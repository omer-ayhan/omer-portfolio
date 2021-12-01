import type { ReactElement, ReactNode } from "react";
import { useMemo } from "react";
import { Box, Grid } from "@mui/material";
import styles from "./MainTabs.style";

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

export default function TabPanel({
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
        id={`${ariaName}|-|${index}`}
        aria-labelledby={`tab-${index}`}
        {...rest}>
        {value === index && (
          <Grid
            container
            spacing={{ ...spacing }}
            rowSpacing={{ ...(rowSpacing || spacing) }}
            sx={{
              ...styles.tabPanel.container,
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
