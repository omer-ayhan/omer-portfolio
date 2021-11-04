import connectToDB from "../../lib/database";
import { VercelRequest, VercelResponse } from "@vercel/node";

export default async function skills(req: VercelRequest, res: VercelResponse) {
  const resStatus = (httpCode: number) => res.status(httpCode);
  switch (req.method) {
    case "GET":
      try {
        const db = await connectToDB();
        const collection = db.collection("skillCards");
        if (!collection) {
          resStatus(500).json({ message: "Collection was not found" });
        }
        const skillsData = await collection
          .find({})
          .toArray()
          .catch((err) => resStatus(500).json({ message: err }));

        return resStatus(200).json({ skillsData });
      } catch (err) {
        resStatus(500).json(`Server Error: ${err}`);
      }
    default:
      return res.status(405).json({ message: "Method Not Allowed" });
  }
}
