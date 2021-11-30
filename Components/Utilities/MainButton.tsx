import type { MouseEventHandler, ReactElement } from "react";
import { Button, Link, Typography } from "@mui/material";
import SmoothScroll from "./ScrollUtils/SmoothScroll";
import { adjustTextColor } from "./ColorUtils/adjustColor";

interface Props {
  sxButton: object;
  sxLink: object;
  sxText: object;
  to?: string;
  btn_name: string;
  component?: "a" | "span" | "button";
  btnComponent?: "button" | "span";
  variant?: "contained" | "outlined" | "text";
  textColor?: string;
  allowScroll?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}

const MainButton = ({
  sxButton,
  to = "#intro",
  btn_name,
  sxLink,
  sxText,
  textColor = undefined,
  component = "a",
  btnComponent = "button",
  variant = "contained",
  allowScroll = false,
  onClick = undefined,
  ...rest
}: Props): ReactElement => {
  return (
    <SmoothScroll toId={to} duration={1500} allowScroll={allowScroll}>
      <Button
        component={btnComponent}
        onClick={onClick}
        sx={{
          ...sxButton,
          color: (theme) =>
            textColor || adjustTextColor(theme.palette.primary.main),
          "&:hover": {
            backgroundColor: "secondary.main",
            color: (theme) => adjustTextColor(theme.palette.secondary.main),
            boxShadow: (theme) =>
              `0 0 27px 5px ${theme.palette.secondary.main}80`,
          },
        }}
        variant={variant}
        color="primary"
        {...rest}>
        <Link
          component={component}
          color="inherit"
          sx={sxLink}
          href={to}
          rel="noreferrer">
          <Typography variant="h6" sx={sxText} color="inherit">
            {btn_name}
          </Typography>
        </Link>
      </Button>
    </SmoothScroll>
  );
};

export default MainButton;
