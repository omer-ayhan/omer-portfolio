import type { ReactElement } from "react";
import { Box, Link, Paper, Typography } from "@mui/material";
import { linksMain } from "../Utilities/StylesProvider";
import { Icon } from "@iconify/react";
import SvgImages from "../Utilities/SvgImages";
import SmoothScroll from "../Utilities/ScrollUtils/SmoothScroll";
import styles from "./Footer.style";

function Footer(): ReactElement {
  return (
    <Paper sx={styles.container as any}>
      <SmoothScroll toId="intro" sx={styles.logo} allowScroll>
        <SvgImages svgType="logo" />
      </SmoothScroll>
      <Box sx={styles.link.container}>
        {linksMain.socialLinks
          .slice(0, 4)
          .map(({ icon_name, color, to }, index) => (
            <Link
              key={`${color}-${index}`}
              mx="10px"
              sx={{ padding: 0 }}
              href={to}
              rel="noreferrer">
              <Box component="span" color="text.primary">
                <Icon icon={icon_name} className="social-icons" color={color} />
              </Box>
            </Link>
          ))}
      </Box>
      <Typography textAlign="center" sx={styles.link.text} variant="subtitle1">
        © 2021 copyright Ömer Ayhan all right reserved
      </Typography>
    </Paper>
  );
}

export default Footer;
