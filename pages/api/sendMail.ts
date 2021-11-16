import sendgrid from "@sendgrid/mail";
import { NextApiRequest, NextApiResponse } from "next";
sendgrid.setApiKey(process.env.SENDGRID_API);
async function sendEmail(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "POST":
      const { email, name, message, subject } = req.body;
      try {
        // await sendgrid.send({
        //   to: "om.ayhan247@gmail.com", // Your email where you'll receive emails
        //   from: "omya123@outlook.com", // your website email address here
        //   subject: `Subject : ${subject}`,
        //   html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
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
        //         <h3>You've got a new mail from ${name}, their email is: ✉️${email} </h3>
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
        // });
        res.status(201).json({ message: "Email successfully sent" });
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
