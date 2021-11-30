import { Box, Fab, useScrollTrigger, Zoom } from "@mui/material";
import SmoothScroll from "../Utilities/ScrollUtils/SmoothScroll";
import { Icon } from "@iconify/react";
import styles from "./BackToTop.style";

const BackToTop = () => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 280,
  });

  return (
    <SmoothScroll sx={styles.show} toId="intro" allowScroll>
      <Zoom in={trigger}>
        <Box role="button container" position="fixed" sx={styles.container}>
          <Fab
            sx={styles.buttonContainer}
            color="secondary"
            size="medium"
            aria-label="scroll back to top">
            <Icon
              style={styles.icon}
              className="social-icons"
              icon="bx:bxs-up-arrow"
            />
          </Fab>
        </Box>
      </Zoom>
    </SmoothScroll>
  );
};
export default BackToTop;
