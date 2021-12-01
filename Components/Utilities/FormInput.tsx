import { Input } from "@mui/material";
import { styled } from "@mui/system";
import stylesProjects from "../Projects/Projects.style";
import type { ReactElement } from "react";
import type { InputProps } from "@mui/material";
import { colors } from "./StylesProvider";

const FormInput = styled(
  (props: InputProps): ReactElement => <Input disableUnderline {...props} />
)(({ theme }) => ({
  borderColor: theme.palette.secondary.main,
  outlineColor: `${theme.palette.secondary.main}3a`,
  background:
    theme.palette.mode === "dark" ? colors.DarkPaper : colors.ElBackground,
  ...stylesProjects.search,
  "&:hover": {
    outline: `7px solid ${theme.palette.secondary.main}3a`,
  },
  "&.Mui-focused": {
    backgroundColor: "background.paper",
    outline: `7px solid ${theme.palette.secondary.main}3a`,
    border: `2px solid ${theme.palette.secondary.main}`,
  },
}));

export default FormInput;
