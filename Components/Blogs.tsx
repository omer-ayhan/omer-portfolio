import React, { ReactElement } from "react";
import Image from "next/image";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Link,
  Typography,
  Box,
} from "@mui/material";
import { props, tabObjects } from "./Utilities/StylesProvider";
// import bg_blogs from "../public/img/Background/bg_blogs.svg";
import MainButton from "./Utilities/MainButton";

function Blogs(): ReactElement {
  const { stylesAll, colors } = props;
  return (
    <Grid
      id="blogs"
      container
      spacing={0}
      columnSpacing={{ Laptop: 5, FourK: 2 }}
      sx={{ ...stylesAll.utilities.gridContainer, position: "relative" }}>
      <img className="blogs-bg" src="/img/Background/bg_blogs.svg" alt="" />
      <Grid item xs={12}>
        <Typography
          variant="h3"
          sx={{
            ...stylesAll.utilities.title,
            textAlign: "center",
          }}
          color="text.primary">
          Latest Blogs
        </Typography>
        <Box
          sx={{
            ...stylesAll.blogs.link.flexContainer,
          }}>
          <Link
            href="#"
            rel="noreferrer"
            sx={{
              ...stylesAll.blogs.link.container,
            }}>
            <Typography
              variant="h6"
              color="primary"
              sx={{
                ...stylesAll.blogs.link.text,
                textAlign: "center",
              }}>
              View All
            </Typography>
          </Link>
        </Box>
      </Grid>
      <Grid
        item
        xs={12}
        sx={{
          ...stylesAll.blogs.gridContainer,
          overflowY: "scroll",
        }}>
        <Grid
          container
          item
          sx={{
            ...stylesAll.blogs.card.gridContainer,
          }}>
          {tabObjects.blogsCard.map(({ title, img }, index) => (
            <Grid key={`${title}-${index}`} item xs={12} lg={6} md={4}>
              <Box
                sx={{
                  ...stylesAll.utilities.flexDefault,
                }}>
                <Card
                  sx={{
                    ...stylesAll.blogs.card.container,
                    boxShadow: (theme) =>
                      theme.palette.mode === "dark"
                        ? `0px 0px 16.3px ${colors.DarkModeShadow}`
                        : `0px 0px 16.3px ${colors.LightModeShadow}`,
                    flexDirection: "column",
                  }}>
                  <CardMedia
                    sx={{ objectFit: "contain" }}
                    component="img"
                    width="100%"
                    height="100%"
                    src={img}
                    alt={title}
                  />
                  <CardContent sx={{ width: "100%", padding: 0 }}>
                    <Typography
                      variant="h6"
                      sx={{
                        ...stylesAll.blogs.card.text,
                        textAlign: "start",
                      }}>
                      {title}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ padding: 0 }}>
                    <MainButton
                      sxButton={{
                        ...stylesAll.projects.card.buttons.container,
                      }}
                      sxLink={{
                        ...stylesAll.utilities.buttons.link,
                      }}
                      sxText={{
                        ...stylesAll.projects.card.buttons.text,
                        textAlign: "center",
                      }}
                      to={"#intro"}
                      btn_name={"Read More"}
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
