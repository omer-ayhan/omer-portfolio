import type { ReactElement, FormEvent, SyntheticEvent } from "react";
import { useState } from "react";
import { Alert, Grid, IconButton, Snackbar, Typography } from "@mui/material";
import { FormInput, props } from "./Utilities/StylesProvider";
import ImageSSR from "./Utilities/ImageSSR";
import { Icon } from "@iconify/react";
import MainButton from "./Utilities/MainButton";

type AlertTypes = "success" | "warning" | "error";

function Contact(): ReactElement {
  const { stylesAll } = props;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [msg, setMsg] = useState("");
  const [open, setOpen] = useState(false);
  const [snackType, setSnackType] = useState<AlertTypes>("success");
  const [snackMsg, setSnackMsg] = useState("");
  const [count, setCount] = useState(0);

  const cleanFields = () => {
    setName("");
    setEmail("");
    setSubject("");
    setMsg("");
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCount(count + 1);
    if (!open) {
      const res = await fetch("/api/sendMail", {
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
      cleanFields();
      const { message } = await res.json();

      if (res.status === 200 || res.status === 201) {
        setSnackType("success");
        setSnackMsg(message);
        setOpen(true);
      } else {
        setSnackType("error");
        setSnackMsg(message);
        setOpen(true);
      }
    }
    console.log(name, email, subject, msg);
  };

  console.log(count);

  const handleClose = (event?: SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
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
      <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
        <Alert
          variant="filled"
          severity={snackType}
          action={
            <IconButton
              onClick={handleClose}
              size="medium"
              sx={{
                ...stylesAll.setColor.snackBar.action,
              }}>
              <Icon icon="entypo:cross" />
            </IconButton>
          }>
          <Typography
            variant="h6"
            sx={{
              ...stylesAll.setColor.snackBar.text,
            }}
            color="common.white">
            {snackMsg}
          </Typography>
        </Alert>
      </Snackbar>

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
              <MainButton
                btnComponent="span"
                component="button"
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
                disabled={open}
              />
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
}

export default Contact;
