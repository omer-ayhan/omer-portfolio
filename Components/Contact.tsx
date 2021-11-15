import type { ReactElement, FormEvent } from "react";
import { useState } from "react";
import { Grid, Typography } from "@mui/material";
import type { Theme } from "@mui/material";
import { FormInput, props } from "./Utilities/StylesProvider";
import { ImageSSR } from "./Utilities/ImageSSR";
import { adjustTextColor } from "./Utilities/ColorUtils/adjustColor";

function Contact(): ReactElement {
  const { stylesAll } = props;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await fetch("/api/contactMe", {
      body: JSON.stringify({
        email: email,
        name: name,
        subject: subject,
        message: msg,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });
    // const { message } = await res.json();
    // console.log(res.status);

    console.log(name, email, subject, msg);
  };

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
        <form onSubmit={handleSubmit}>
          <Grid
            container
            spacing={3.4}
            sx={{
              placeContent: "center",
              position: "relative",
            }}>
            <Grid item xs={12} md={6}>
              <FormInput
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                className="contact-form"
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormInput
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="contact-form"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <FormInput
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Subject"
                className="contact-form"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <FormInput
                sx={{
                  "& textarea": {
                    height: "100%",
                    overflowY: "scroll",
                  },
                }}
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                inputComponent="textarea"
                fullWidth
                multiline
                placeholder="Message"
                className="contact-form message-form"
                required
              />
            </Grid>
            <Grid item xs={12} md={5}>
              {/* @ts-ignore */}
              <FormInput
                type="submit"
                sx={{
                  ...stylesAll.contact.button.container,
                  color: (theme: Theme) =>
                    adjustTextColor(theme.palette.primary.main),
                  ...stylesAll.contact.button.text,
                  "&:focus": {
                    outline: "none",
                  },
                  "&:hover": {
                    color: (theme: Theme) =>
                      adjustTextColor(theme.palette.secondary.main),
                    outline: "none",
                    backgroundColor: "secondary.main",
                    boxShadow: (theme: Theme) =>
                      `0 0 27px 5px ${theme.palette.secondary.main}80`,
                  },
                }}
                value="Send Message"
              />
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
}

export default Contact;
