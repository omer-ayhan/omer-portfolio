import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { Typography, Box } from "@mui/material";
import { props } from "./StylesProvider";
import { adjustTextColor } from "./ColorUtils/adjustColor";
import { useAppSelector } from "../../context/hooks";

interface Props {
  sxBox: object;
  sxText: object;
  className: string;
  icon: string;
  title: string;
  isClickable?: boolean;
  onClick?: (ev: React.MouseEvent<HTMLDivElement>) => void;
}

const MainTag = ({
  sxBox,
  sxText,
  className,
  icon,
  title,
  onClick = undefined,
  isClickable = false,
}: Props): React.ReactElement => {
  const projectState = useAppSelector((state) => state.projects.tags);
  const { colors } = props;
  const [toggle, setToggle] = useState(false);

  React.useEffect(() => {
    let isMounted = true;
    if (projectState.includes(title.toUpperCase()) && isMounted) {
      setToggle(true);
    } else setToggle(false);
    return () => {
      isMounted = false;
    };
  }, [projectState]);

  return (
    <Box
      component="span"
      onClick={() => (isClickable ? setToggle(!toggle) : undefined)}>
      <Box
        onClick={onClick}
        sx={{
          ...sxBox,
          ...(isClickable && toggle
            ? {
                backgroundColor: "secondary.main",
                color: (theme) => adjustTextColor(theme.palette.secondary.main),
              }
            : {
                backgroundColor: colors.ElBackground,
                color: "text.primary",
              }),
          transition: "420ms ease",
        }}>
        <Icon icon={icon} className={className} />
        <Typography variant="subtitle1" sx={{ ...sxText }}>
          {title}
        </Typography>
      </Box>
    </Box>
  );
};

export default MainTag;
