import sendgrid from "@sendgrid/mail";
import { NextApiRequest, NextApiResponse } from "next";

async function sendEmail(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "POST":
      const { email, name, message, subject } = req.body;
      res.status(201).json({ message: "Email successfully sent" });
      break;

    default:
      res.status(405).json({ message: "Method not allowed" });
      break;
  }
}

export default sendEmail;
