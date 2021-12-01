import type { ReactElement } from "react";
import { Box } from "@mui/material";
import { Icon } from "@iconify/react";
import { changeTheme } from "../../../context/reducers/navSlices";
import { useAppSelector, useAppDispatch } from "../../../context/hooks";
import styles from "./ThemeSwitch.style";
import StyledSwitch from "../StyledSwitch";

export default function ThemeSwitch(): ReactElement {
  const themeMode = useAppSelector((state) => state.nav.isDarkMode);
  const dispatch = useAppDispatch();

  const handleTheme = () => dispatch(changeTheme());

  return (
    <Box position="absolute" sx={styles.container}>
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
        onChange={handleTheme}
        inputProps={{ "aria-label": "controlled" }}
      />
    </Box>
  );
}
