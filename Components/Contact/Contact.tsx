import { useState, useRef } from "react";
import type { ReactElement, KeyboardEvent } from "react";
import {
  Alert,
  Grid,
  IconButton,
  Snackbar,
  Tooltip,
  Typography,
} from "@mui/material";
import ReCAPTCHA from "react-google-recaptcha";
import { Formik, FormikHelpers } from "formik";
import { Icon } from "@iconify/react";

import ImageSSR from "../Utilities/ImageSSR";
import MainButton from "../Utilities/MainButton";
import styles from "./Contact.style";
import stylesUtility from "../Utilities/Utilities.style";
import { stylesSetColor } from "../Navbar/Navbar.style";
import FormInput from "../Utilities/FormInput";

type AlertTypes = "success" | "warning" | "error";
type TooltipTypes = {
  name?: boolean;
  email?: boolean;
  subject?: boolean;
  message?: boolean;
};

type Values = {
  name: string;
  email: string;
  subject: string;
  msg: string;
};

function Contact(): ReactElement {
  const [token, setToken] = useState<string | null>(null);
  const [snack, setSnack] = useState({
    open: false,
    type: "success",
    msg: "",
    disabledBtn: false,
  });

  const initialStates = {
    name: "",
    email: "",
    subject: "",
    msg: "",
  };

  const [tooltipOpen, setTooltipOpen] = useState({
    name: false,
    email: false,
    subject: false,
    message: false,
  });
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const handleSubmitForm = async (
    values: Values,
    { resetForm }: FormikHelpers<Values>
  ) => {
    const { name, email, subject, msg } = values;
    if (token === null) {
      setSnack({
        open: true,
        type: "error",
        msg: "Please verify you are not a robot",
        disabledBtn: false,
      });
      return;
    }
    if (!snack.open) {
      try {
        setSnack({
          ...snack,
          disabledBtn: true,
        });
        const res = await fetch("/api/sendMail", {
          body: JSON.stringify({
            email: email,
            name: name,
            subject: subject,
            message: msg,
            token: token,
          }),
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
        });

        const { message } = await res.json();
        if (res.status >= 200 && res.status <= 299) {
          console.log(values);
          resetForm({});
          setToken(null);
          setSnack({
            open: true,
            type: "success",
            msg: message,
            disabledBtn: false,
          });
        } else {
          console.log("error", res.status, res.statusText);
          setSnack({
            open: true,
            type: "error",
            msg: message || res.statusText,
            disabledBtn: false,
          });
        }
      } catch {
        setToken(null);
        setSnack({
          open: true,
          type: "error",
          msg: "Server or Request Error",
          disabledBtn: false,
        });
      } finally {
        recaptchaRef.current?.reset();
      }
    }
  };

  const onReCAPTCHAChange = (captchaCode: string | null) => {
    if (!captchaCode) {
      return;
    }
    setToken(captchaCode);
  };

  const handleClose = (_: any, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setSnack({
      ...snack,
      open: false,
    });
  };

  const handleTooltip = (tooltip: TooltipTypes) =>
    setTooltipOpen({ ...tooltipOpen, ...tooltip });

  const disableKey = (e: KeyboardEvent<HTMLFormElement>) => {
    (e.key === "U+000A" || e.key === "Enter") &&
      (e.target as HTMLTextAreaElement).type !== "textarea" &&
      e.preventDefault();
  };

  return (
    <Grid
      id="contact"
      container
      spacing={1}
      position="relative"
      sx={{
        ...stylesUtility.gridContainer,
        ...styles.container,
      }}>
      <Snackbar open={snack.open} autoHideDuration={4000} onClose={handleClose}>
        <Alert
          variant="filled"
          severity={snack.type as AlertTypes}
          action={
            <IconButton
              onClick={handleClose}
              size="medium"
              sx={stylesSetColor.snackBar.action}>
              <Icon color="#fff" icon="entypo:cross" />
            </IconButton>
          }>
          <Typography
            variant="h6"
            sx={stylesSetColor.snackBar.text}
            color="common.white">
            {snack.msg}
          </Typography>
        </Alert>
      </Snackbar>

      <ImageSSR className="contact-bg" path="/img/Background/bg_contact.png" />
      <Grid item xs={12} mb="20px">
        <Typography
          variant="h3"
          textAlign="center"
          color="text.primary"
          sx={stylesUtility.title}>
          Contact Me
        </Typography>
        <Typography
          variant="body1"
          mt="16px"
          textAlign="center"
          color="text.primary"
          sx={styles.body}>
          You can reach me out for job offers, freelancing or other business
          inquires in here
        </Typography>
      </Grid>
      <Grid item xs={12} sm={11} xl={9}>
        <Formik initialValues={initialStates} onSubmit={handleSubmitForm}>
          {({ values, handleChange, handleSubmit }) => (
            <form onSubmit={handleSubmit} onKeyDown={disableKey}>
              <Grid
                container
                spacing={3.4}
                position="relative"
                justifyContent="center">
                <Grid item xs={12} md={6}>
                  <FormInput
                    value={values.name}
                    onChange={handleChange("name")}
                    placeholder="Name"
                    className="contact-form"
                    endAdornment={
                      <Tooltip
                        onClose={() => handleTooltip({ name: false })}
                        open={tooltipOpen.name}
                        title={
                          <Typography variant="body2">
                            Name must be at least 2 characters long
                          </Typography>
                        }>
                        <Icon
                          onClick={() => handleTooltip({ name: true })}
                          style={styles.tooltip}
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
                    value={values.email}
                    onChange={handleChange("email")}
                    placeholder="Email"
                    className="contact-form"
                    endAdornment={
                      <Tooltip
                        onClose={() => handleTooltip({ email: false })}
                        open={tooltipOpen.email}
                        title={
                          <Typography variant="body2">
                            Email must include @ and . characters and must be at
                            least 5 characters long
                          </Typography>
                        }>
                        <Icon
                          onClick={() => handleTooltip({ email: true })}
                          style={styles.tooltip}
                          icon="fe:warning"
                        />
                      </Tooltip>
                    }
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormInput
                    value={values.subject}
                    onChange={handleChange("subject")}
                    placeholder="Subject"
                    className="contact-form"
                    endAdornment={
                      <Tooltip
                        onClose={() => handleTooltip({ subject: false })}
                        open={tooltipOpen.subject}
                        title={
                          <Typography variant="body2">
                            Subject must be at least 5 characters long
                          </Typography>
                        }>
                        <Icon
                          onClick={() => handleTooltip({ subject: true })}
                          style={styles.tooltip}
                          icon="fe:warning"
                        />
                      </Tooltip>
                    }
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormInput
                    sx={styles.textarea as any}
                    value={values.msg}
                    onChange={handleChange("msg")}
                    inputComponent="textarea"
                    fullWidth
                    multiline
                    placeholder="Message"
                    className="contact-form message-form"
                    endAdornment={
                      <Tooltip
                        onClose={() => handleTooltip({ message: false })}
                        open={tooltipOpen.message}
                        title={
                          <Typography variant="body2">
                            Message must be at least 25 characters long
                          </Typography>
                        }>
                        <Icon
                          onClick={() => handleTooltip({ message: true })}
                          style={styles.tooltipTextArea}
                          icon="fe:warning"
                        />
                      </Tooltip>
                    }
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <span style={stylesUtility.gridDefault}>
                    <ReCAPTCHA
                      ref={recaptchaRef}
                      sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                      onChange={onReCAPTCHAChange}
                    />
                  </span>
                </Grid>
                <Grid item xs={12} md={5}>
                  <MainButton
                    type="submit"
                    btnComponent="span"
                    component="button"
                    sxButton={styles.button.container}
                    sxLink={{
                      ...stylesUtility.buttons.link,
                      padding: "12px 0",
                      textDecoration: "none",
                    }}
                    sxText={styles.button.text}
                    btn_name="Send Message"
                    disabled={snack.disabledBtn || snack.open}
                  />
                </Grid>
              </Grid>
            </form>
          )}
        </Formik>
      </Grid>
    </Grid>
  );
}

export default Contact;
