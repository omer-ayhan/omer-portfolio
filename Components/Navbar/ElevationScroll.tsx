import { useScrollTrigger } from "@mui/material";
import { cloneElement } from "react";
import type { ReactElement } from "react";
import type { Theme } from "@mui/system";
import { props } from "../Utilities/StylesProvider";
import styles from "./Navbar.style";
interface Props {
  children: ReactElement;
}
const { colors } = props;

const ElevationScroll = (Props: Props) => {
  const { children } = Props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return cloneElement(children, {
    sx: {
      ...styles.appBar,
      background: (theme: Theme) =>
        theme.palette.mode === "dark" ? colors.Darkdef : "#fff",
      boxShadow: (theme: Theme) =>
        trigger
          ? theme.palette.mode === "dark"
            ? `0px -1.05px 15px ${colors.DarkModeShadow}`
            : `0px -1.05px 15px ${colors.LightModeShadow}`
          : "none",
    },
  });
};

export default ElevationScroll;
