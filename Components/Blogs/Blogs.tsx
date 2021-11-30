import type { ReactElement } from "react";
import {
  Card,
  CardActions,
  CardContent,
  Grid,
  Link,
  Typography,
  Box,
} from "@mui/material";
import { tabObjects } from "../Utilities/StylesProvider";
import MainButton from "../Utilities/MainButton";
import ImageSSR from "../Utilities/ImageSSR";
import styles from "./Blogs.style";
import stylesUtility from "../Utilities/Utilities.style";
import stylesProjects from "../Projects/Projects.style";

function Blogs(): ReactElement {
  return (
    <Grid
      id="blogs"
      container
      spacing={0}
      columnSpacing={styles.colSpacing}
      position="relative"
      sx={stylesUtility.gridContainer}>
      <ImageSSR className="blogs-bg" path="/img/Background/bg_blogs.png" />
      <Grid item xs={12}>
        <Typography
          variant="h3"
          textAlign="center"
          sx={stylesUtility.title}
          color="text.primary">
          Latest Blogs
        </Typography>
        <Box sx={styles.link.flexContainer}>
          <Link href="#" rel="noreferrer" sx={styles.link.container}>
            <Typography
              variant="h6"
              color="primary"
              textAlign="center"
              sx={styles.link.text}>
              View All
            </Typography>
          </Link>
        </Box>
      </Grid>
      <Grid item xs={12} sx={styles.gridContainer as any}>
        <Grid container item sx={styles.card.gridContainer}>
          {tabObjects.blogsCard.map(({ title, img }, index) => (
            <Grid key={`${title}-${index}`} item xs={12} lg={6} md={4}>
              <Box sx={stylesUtility.flexDefault}>
                <Card sx={styles.card.container as any}>
                  <ImageSSR
                    comp="div"
                    sx={styles.card.image}
                    path={img}
                    objectFit="contain"
                  />
                  <CardContent sx={{ width: "100%", padding: 0 }}>
                    <Typography
                      variant="h6"
                      textAlign="start"
                      sx={styles.card.text}>
                      {title}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ padding: 0 }}>
                    <MainButton
                      sxButton={stylesProjects.card.buttons.container}
                      sxLink={stylesUtility.buttons.link}
                      sxText={{
                        ...stylesProjects.card.buttons.text,
                        textAlign: "center",
                      }}
                      to="#intro"
                      btn_name="Read More"
                      disabled
                    />
                  </CardActions>
                </Card>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Blogs;
