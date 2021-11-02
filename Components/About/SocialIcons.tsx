import React from "react";
import { Link, Box } from "@mui/material";
import { Icon } from "@iconify/react";
import { linksMain, props } from "../Utilities/StylesProvider";

const { stylesAll } = props;

function SocialIcons({ sxBox }: { sxBox: object }): React.ReactElement {
  return (
    <Box
      sx={{
        ...stylesAll.about.aboutImg.linksContainer,
        ...sxBox,
      }}>
      <Box>
        {linksMain.socialLinks
          .slice(0, 3)
          .map(({ icon_name, to, color }, index) => (
            <Link key={icon_name} href={to} sx={{ margin: "0 9px" }}>
              <Box component="span" color="text.primary">
                <Icon icon={icon_name} className="social-icons" color={color} />
              </Box>
            </Link>
          ))}
      </Box>
      <Box>
        {linksMain.socialLinks
          .slice(3, 6)
          .map(({ icon_name, to, color }, index) => (
            <Link key={icon_name} href={to} sx={{ margin: "0 9px" }}>
              <Box component="span" color="text.primary">
                <Icon icon={icon_name} className="social-icons" color={color} />
              </Box>
            </Link>
          ))}
      </Box>
    </Box>
  );
}

export default SocialIcons;
