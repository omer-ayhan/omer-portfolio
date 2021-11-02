import { VercelRequest, VercelResponse } from "@vercel/node";
import connectToDB from "../../lib/database";

export default async function skills(req: VercelRequest, res: VercelResponse) {
  const resStatus = (httpCode: number) => res.status(httpCode);
  switch (req.method) {
    case "GET":
      try {
        const db = await connectToDB("Skills");
        const collection = await db.collection("skillCards");

        const skills = await collection
          .find({})
          .toArray()
          .catch((err) => err);
        return resStatus(200).json({ skills });
      } catch (err) {
        resStatus(500).send(`Server Error: ${err}`);
      }
    default:
      return res.status(401).send({ message: "unreachable method" });
  }
}
