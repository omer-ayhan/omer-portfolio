import sendgrid from "@sendgrid/mail";
import type { NextApiRequest, NextApiResponse } from "next";
import { RateLimiterMemory } from "rate-limiter-flexible";

const rateLimiter = new RateLimiterMemory({
  points: 3,
  duration: 60,
});

sendgrid.setApiKey(process.env.SENDGRID_API);
async function sendEmail(req: NextApiRequest, res: NextApiResponse) {
  const { email, name, message, subject, token } = req.body;

  const checkValid = await checkValidation(email, name, message, subject);
  switch (req.method) {
    case "POST":
      try {
        if (!(await validateCaptcha(token))) {
          return res.status(400).json({ message: "captcha is invalid" });
        }
        if (!checkValid.isValid) {
          return res
            .status(checkValid.status)
            .json({ message: checkValid.message });
        }
        await rateLimiter
          .consume(2) // Consume 2 points
          .then(async (rateLimiterRes) => {
            // await sendgrid
            //   .send({
            //     to: "om.ayhan247@gmail.com", // Your email where you'll receive emails
            //     from: "omya123@outlook.com", // your website email address here
            //     subject: `Subject : ${subject}`,
            //     html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
            // <html lang="en">
            // <head>
            //   <meta charset="utf-8">

            //   <title>The HTML5 Herald</title>
            //   <meta name="description" content="The HTML5 Herald">
            //   <meta name="author" content="SitePoint">
            // <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />

            //   <link rel="stylesheet" href="css/styles.css?v=1.0">

            // </head>

            // <body>
            //   <div class="img-container" style="display: flex;justify-content: center;align-items: center;border-radius: 5px;overflow: hidden; font-family: 'helvetica', 'ui-sans';">
            //         </div>
            //         <div class="container" style="margin-left: 20px;margin-right: 20px;">
            //         <h3>You've got a new mail from <b>${name}</b>, <br /> their email is: ✉️${email} </h3>
            //         <div style="font-size: 16px;">
            //         <p>Message:</p>
            //         <p>${message}</p>
            //         <br>
            //         </div>
            //         <div class="footer-links" style="display: flex;justify-content: center;align-items: center;">
            //           <a href="https://github.com/omer-ayhan" style="text-decoration: none;margin: 8px;color: #9CA3AF;">GitHub</a>
            //           <a href="https://www.linkedin.com/in/omer-ayhan72/" style="text-decoration: none;margin: 8px;color: #9CA3AF;">LinkedIn</a>
            //           <a href="https://twitter.com/omer_ayhanDEV" style="text-decoration: none;margin: 8px;color: #9CA3AF;">Twitter</a>
            //         </div>
            //         </div>
            // </body>
            // </html>`,
            //   })
            //   .then(() => {
            //     delete req.body.token;
            //     res.status(201).json({ message: "Email successfully sent" });
            //   });
            delete req.body.token;
            res.status(201).json({ message: "Email successfully sent" });
          })
          .catch((rej) => {
            res.status(429).json({
              message: `Too many requests. Please try again in ${rateLimiter.duration} seconds.`,
            });
          });
      } catch (err) {
        res.status(500).json({ message: "Error sending email" });
      }
      break;
    default:
      res.status(405).json({ message: "Method not allowed" });
      break;
  }
}

export default sendEmail;

const checkValidation = async (
  email: string,
  name: string,
  message: string,
  subject: string
) => {
  if (
    name.length < 1 ||
    email.length < 1 ||
    message.length < 1 ||
    subject.length < 1
  ) {
    return {
      status: 400,
      message: "Please fill all the fields",
      isValid: false,
    };
  }
  if (name.length < 2) {
    return {
      status: 400,
      message: "Name must be at least 2 characters",
      isValid: false,
    };
  }
  if (!email.includes("@") || !email.includes(".") || email.length < 5) {
    return {
      status: 400,
      message:
        "Email must include @ and . characters and must be at least 5 characters long",
      isValid: false,
    };
  }
  if (message.length < 25) {
    return {
      status: 400,
      message: "Message must be at least 25 characters",
      isValid: false,
    };
  }
  if (subject.length < 5) {
    return {
      status: 400,
      message: "Subject must be at least 5 characters",
      isValid: false,
    };
  }
  return {
    status: 200,
    message: "",
    isValid: true,
  };
};

const validateCaptcha = async (response_key: string | null) => {
  return new Promise((resolve, reject) => {
    const secret_key = process.env.RECAPTCHA_SECRET;

    const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secret_key}&response=${response_key}`;

    fetch(url, {
      method: "POST",
    })
      .then((response) => response.json())
      .then((google_response) => {
        if (google_response.success === true) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch((err) => {
        console.log(err);
        resolve(false);
      });
  });
};
