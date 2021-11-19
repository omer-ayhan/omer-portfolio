import type { ReactElement, FormEvent, SyntheticEvent } from "react";
import { useState } from "react";
import {
  Alert,
  Grid,
  IconButton,
  Snackbar,
  Tooltip,
  Typography,
} from "@mui/material";
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
  const [tooltipOpen, setTooltipOpen] = useState({
    name: false,
    email: false,
    subject: false,
    message: false,
  });
  const [count, setCount] = useState(0);

  const cleanFields = () => {
    setName("");
    setEmail("");
    setSubject("");
    setMsg("");
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!open) {
      setCount(count + 1);
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
      const { message } = await res.json();

      if (res.status === 200 || res.status === 201) {
        cleanFields();
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
              <Icon color="#fff" icon="entypo:cross" />
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

      <ImageSSR className="contact-bg" path="/img/Background/bg_contact.png" />
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
        <form
          onSubmit={handleSubmit}
          onKeyDown={(e) =>
            (e.key === "U+000A" || e.key === "Enter") && e.preventDefault()
          }>
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
                endAdornment={
                  <Tooltip
                    onClose={() =>
                      setTooltipOpen({ ...tooltipOpen, name: false })
                    }
                    open={tooltipOpen.name}
                    title={
                      <Typography variant="body2">
                        Name must be at least 2 characters long
                      </Typography>
                    }>
                    <Icon
                      onClick={() =>
                        setTooltipOpen({ ...tooltipOpen, name: true })
                      }
                      style={{ cursor: "pointer", zIndex: 15 }}
                      icon="fe:warning"
                    />
                  </Tooltip>
                }
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
                endAdornment={
                  <Tooltip
                    onClose={() =>
                      setTooltipOpen({ ...tooltipOpen, email: false })
                    }
                    open={tooltipOpen.email}
                    title={
                      <Typography variant="body2">
                        Email must include @ and . and must be at least 5
                        characters long
                      </Typography>
                    }>
                    <Icon
                      onClick={() =>
                        setTooltipOpen({ ...tooltipOpen, email: true })
                      }
                      style={{ cursor: "pointer", zIndex: 15 }}
                      icon="fe:warning"
                    />
                  </Tooltip>
                }
                required
              />
            </Grid>
            <Grid item xs={12}>
              <FormInput
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Subject"
                className="contact-form"
                endAdornment={
                  <Tooltip
                    onClose={() =>
                      setTooltipOpen({ ...tooltipOpen, subject: false })
                    }
                    open={tooltipOpen.subject}
                    title={
                      <Typography variant="body2">
                        Subject must be at least 5 characters long
                      </Typography>
                    }>
                    <Icon
                      onClick={() =>
                        setTooltipOpen({ ...tooltipOpen, subject: true })
                      }
                      style={{ cursor: "pointer", zIndex: 15 }}
                      icon="fe:warning"
                    />
                  </Tooltip>
                }
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
                endAdornment={
                  <Tooltip
                    onClose={() =>
                      setTooltipOpen({ ...tooltipOpen, message: false })
                    }
                    open={tooltipOpen.message}
                    title={
                      <Typography variant="body2">
                        Message must be at least 25 characters long
                      </Typography>
                    }>
                    <Icon
                      onClick={() =>
                        setTooltipOpen({ ...tooltipOpen, message: true })
                      }
                      style={{
                        marginBottom: "auto",
                        cursor: "pointer",
                        zIndex: 15,
                      }}
                      icon="fe:warning"
                    />
                  </Tooltip>
                }
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
                  padding: "12px 0",
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
