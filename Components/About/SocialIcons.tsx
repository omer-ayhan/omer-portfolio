import { memo } from "react";
import type { ReactElement } from "react";
import { Link, Box } from "@mui/material";
import { Icon } from "@iconify/react";
import { linksMain } from "../Utilities/StylesProvider";
import type { SxProps } from "@mui/system";
import styles from "./About.style";

interface Props {
  sxBox?: SxProps;
}

function SocialIcons({ sxBox }: Props): ReactElement {
  return (
    <Box
      flexDirection="column"
      sx={{
        ...styles.aboutImg.linksContainer,
        ...sxBox,
      }}>
      <Box>
        {linksMain.socialLinks
          .slice(0, 3)
          .map(({ icon_name, to, color }, index) => (
            <Link key={`${icon_name}_ic_${index}`} href={to} mx="9px">
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

export default memo(SocialIcons);
