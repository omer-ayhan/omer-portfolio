import { ReactElement } from "react";
import { Box } from "@mui/material";
import { Icon } from "@iconify/react";
import { StyledSwitch, props } from "./StylesProvider";
import { changeTheme } from "../../context/reducers/navSlices";
import { useAppSelector, useAppDispatch } from "../../context/hooks";

export default function ThemeSwitch(): ReactElement {
  const themeMode = useAppSelector((state) => state.nav.isDarkMode);
  const dispatch = useAppDispatch();
  const { stylesAll } = props;

  return (
    <Box
      sx={{
        ...stylesAll.themeSwitch,
        position: "absolute",
      }}>
      {themeMode ? (
        <Icon
          icon="bi:moon-fill"
          width="30"
          height="24"
          inline={true}
          color="#fff"
        />
      ) : (
        <Icon
          icon="clarity:sun-solid"
          width="30"
          height="30"
          inline={true}
          color="#ffc800"
        />
      )}
      <StyledSwitch
        checked={themeMode}
        onChange={() => dispatch(changeTheme())}
        inputProps={{ "aria-label": "controlled" }}
      />
    </Box>
  );
}
