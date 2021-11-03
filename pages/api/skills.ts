import connectToDB from "../../lib/database";
import { VercelRequest, VercelResponse } from "@vercel/node";

export default async function skills(req: VercelRequest, res: VercelResponse) {
  const resStatus = (httpCode: number) => res.status(httpCode);
  switch (req.method) {
    case "GET":
      try {
        const db = await connectToDB();
        const collection = db.collection("skillCards");

        const skills = await collection
          .find({})
          .toArray()
          .catch((err) => err);

        return resStatus(200).json({ skills });
      } catch (err) {
        resStatus(500).json(`Server Error: ${err}`);
      }
    default:
      return res.status(401).json({ message: "unreachable method" });
  }
}
