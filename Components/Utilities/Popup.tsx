import type { FC, ReactElement, MouseEvent } from "react";
import { useState, useMemo } from "react";
import Popover from "@mui/material/Popover";
import { IconButton, Button, Box } from "@mui/material";
import type { ButtonProps } from "@mui/material/Button";
import type { IconButtonProps } from "@mui/material/IconButton";

export interface Props {
  isButton: boolean;
  startIcon?: JSX.Element | null;
  btn: JSX.Element;
  varText?: "text" | "contained" | "outlined";
  content: JSX.Element | JSX.Element[];
  color?: string | "primary";
  isMenuClosable?: boolean;
}

const Popup: FC<Props & IconButtonProps & ButtonProps> = ({
  isButton,
  startIcon,
  varText = "text",
  content,
  color,
  btn,
  isMenuClosable = true,
}): ReactElement => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "popover-default" : undefined;

  return useMemo(
    () => (
      <div>
        {isButton ? (
          <Button
            variant={varText}
            startIcon={startIcon}
            color={color}
            aria-describedby={id}
            onClick={handleClick}>
            {btn}
          </Button>
        ) : (
          <IconButton color={color} aria-describedby={id} onClick={handleClick}>
            {btn}
          </IconButton>
        )}
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}>
          <Box onClick={isMenuClosable ? handleClose : undefined}>
            {content}
          </Box>
        </Popover>
      </div>
    ),
    [content, anchorEl]
  );
};

export default Popup;
