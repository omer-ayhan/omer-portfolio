import Ably from "ably/promises";
import { NextApiRequest, NextApiResponse } from "next";
import connectToAbly from "../../lib/connectToAbly";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const client = connectToAbly();
  const tokenRequestData = await client.auth.createTokenRequest({
    clientId: "portfolio-token",
  });
  res.status(200).json(tokenRequestData);
}
