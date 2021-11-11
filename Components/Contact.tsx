import { ReactElement } from "react";
import { Grid, Typography } from "@mui/material";
import { FormInput, props } from "./Utilities/StylesProvider";
import MainButton from "./Utilities/MainButton";
import { ImageSSR } from "./Utilities/ImageSSR";

function Contact(): ReactElement {
  const { stylesAll } = props;
  return (
    <Grid
      id="contact"
      container
      spacing={1}
      sx={{
        ...stylesAll.utilities.gridContainer,
        ...stylesAll.contact.container,
        position: "relative",
      }}>
      <ImageSSR className="contact-bg" path="/img/Background/bg_contact.svg" />
      <Grid
        item
        xs={12}
        sx={{
          marginBottom: "20px",
        }}>
        <Typography
          variant="h3"
          sx={{
            ...stylesAll.utilities.title,
            textAlign: "center",
          }}
          color="text.primary">
          Contact Me
        </Typography>
        <Typography
          variant="body1"
          sx={{
            marginTop: "16px",
            ...stylesAll.about.aboutBox.body,
            textAlign: "center",
          }}
          color="text.primary">
          You can reach me out for job offers, freelancing or other business
          inquires in here
        </Typography>
      </Grid>
      <Grid item xs={10} xl={7}>
        <form>
          <Grid
            container
            spacing={3.4}
            sx={{
              placeContent: "center",
              position: "relative",
            }}>
            <Grid item xs={12} md={6}>
              <FormInput placeholder="Name" className="contact-form" />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormInput
                type="email"
                placeholder="Email"
                className="contact-form"
              />
            </Grid>
            <Grid item xs={12}>
              <FormInput placeholder="Subject" className="contact-form" />
            </Grid>
            <Grid item xs={12}>
              <FormInput
                sx={{
                  "& textarea": {
                    height: "100%",
                    overflowY: "scroll",
                  },
                }}
                inputComponent="textarea"
                fullWidth
                multiline
                placeholder="Message"
                className="contact-form message-form"
              />
            </Grid>
            <Grid item xs={12} md={5}>
              <MainButton
                component="span"
                sxButton={{
                  ...stylesAll.contact.button.container,
                }}
                sxLink={{
                  ...stylesAll.utilities.buttons.link,
                  textDecoration: "none",
                }}
                sxText={{
                  ...stylesAll.contact.button.text,
                  textAlign: "center",
                  textTransform: "none",
                }}
                btn_name={"Send Message"}
              />
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
}

export default Contact;
