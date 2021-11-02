import React, { ReactElement } from "react";
import { Box, Link, Paper, Typography } from "@mui/material";
import { linksMain, props } from "./Utilities/StylesProvider";
import { Icon } from "@iconify/react";
import SvgImages from "./Utilities/SvgImages";
import SmoothScroll from "./Utilities/ScrollUtils/SmoothScroll";

function Footer(): ReactElement {
  const { stylesAll, colors } = props;

  return (
    <Paper
      sx={{
        ...stylesAll.footer.container,
        background: (theme) =>
          theme.palette.mode === "dark"
            ? colors.DarkPaper
            : colors.ElBackground,
        position: "absolute",
        flexDirection: "column",
      }}>
      <SmoothScroll toId="intro" sx={{ ...stylesAll.navbar.logo }} allowScroll>
        <SvgImages svgType="logo" />
      </SmoothScroll>
      <Box
        sx={{
          ...stylesAll.utilities.flexDefault,
          ...stylesAll.footer.link.container,
        }}>
        {linksMain.socialLinks
          .slice(0, 4)
          .map(({ icon_name, color, to }, index) => (
            <Link
              key={`${color}-${index}`}
              sx={{ padding: 0 }}
              href={to}
              rel="noreferrer">
              <Box component="span" color="text.primary">
                <Icon icon={icon_name} className="social-icons" color={color} />
              </Box>
            </Link>
          ))}
      </Box>
      <Typography
        sx={{
          ...stylesAll.footer.link.text,
          textAlign: "center",
        }}
        variant="subtitle1">
        © 2021 copyright Ömer Ayhan all right reserved
      </Typography>
    </Paper>
  );
}

export default Footer;
