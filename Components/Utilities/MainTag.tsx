import { useState, useEffect, useMemo } from "react";
import type { MouseEvent, ReactElement } from "react";
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
  onClick?: (ev: MouseEvent<HTMLDivElement>) => void;
}
const { colors } = props;

const MainTag = ({
  sxBox,
  sxText,
  className,
  icon,
  title,
  onClick = undefined,
  isClickable = false,
}: Props): ReactElement => {
  const projectState = useAppSelector((state) => state.projects.tags);
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    let isMounted = true;
    if (projectState.includes(title.toUpperCase()) && isMounted) {
      setToggle(true);
    } else setToggle(false);
    return () => {
      isMounted = false;
    };
  }, [projectState]);

  return useMemo(
    () => (
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
                  color: (theme) =>
                    adjustTextColor(theme.palette.secondary.main),
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
    ),
    [toggle]
  );
};

export default MainTag;
