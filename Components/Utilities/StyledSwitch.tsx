import { styled } from "@mui/system";
import { Switch } from "@mui/material";
import type { SwitchProps } from "@mui/material";
import type { ReactElement } from "react";

const StyledSwitch = styled(
  (props: SwitchProps): ReactElement => (
    <Switch
      focusVisibleClassName=".Mui-focusVisible"
      disableRipple
      {...props}
    />
  )
)(({ theme }) => ({
  width: 46,
  height: 24,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    transitionDuration: "300ms",
    margin: "2.1px 1px",
    "&.Mui-checked": {
      transform: "translateX(22px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.primary,
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    margin: 0,
    marginLeft: "2px",
    boxSizing: "border-box",
    width: 19,
    height: 19,
  },
  "& .MuiSwitch-track": {
    // paddingLeft: "1px",
    borderRadius: 29 / 2,
    backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
    opacity: 1,
  },
}));

export default StyledSwitch;
