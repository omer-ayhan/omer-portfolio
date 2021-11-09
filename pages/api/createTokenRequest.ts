import { VercelRequest, VercelResponse } from "@vercel/node";
import connectToAbly from "../../lib/connectToAbly";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  switch (req.method) {
    case "GET":
      try {
        const client = connectToAbly();
        const tokenRequestData = await client.auth.createTokenRequest({
          clientId: "portfolio-token",
        });
        res.status(200).json(tokenRequestData);
      } catch (error) {
        res.status(500).json(error);
      }
  }
}
