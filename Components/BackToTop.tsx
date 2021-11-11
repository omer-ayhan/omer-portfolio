import { Box, Fab, useScrollTrigger, Zoom } from "@mui/material";
import SmoothScroll from "./Utilities/ScrollUtils/SmoothScroll";
import { Icon } from "@iconify/react";

export const BackToTop = () => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 280,
  });

  return (
    <SmoothScroll
      sx={{ display: { xs: "none", Tablet: "block" } }}
      toId="intro"
      allowScroll>
      <Zoom in={trigger}>
        <Box
          role="button container"
          sx={{
            position: "fixed",
            bottom: 16,
            right: 16,
            zIndex: 10,
          }}>
          <Fab
            sx={{ width: { FourK: "67px" }, height: { FourK: "67px" } }}
            color="secondary"
            size="medium"
            aria-label="scroll back to top">
            <Icon
              style={{ marginBottom: "6px" }}
              className="social-icons"
              icon="bx:bxs-up-arrow"
            />
          </Fab>
        </Box>
      </Zoom>
    </SmoothScroll>
  );
};
