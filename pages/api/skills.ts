import connectToDB from "../../lib/database";
import Ably from "ably/promises";
import { VercelRequest, VercelResponse } from "@vercel/node";

export default async function skills(req: VercelRequest, res: VercelResponse) {
  const resStatus = (httpCode: number) => res.status(httpCode);
  switch (req.method) {
    case "GET":
      try {
        const db = await connectToDB();
        const realtime = new Ably.Realtime({ key: process.env.ABLY_API_KEY });
        const collection = db.collection("skillCards");
        if (!collection) {
          resStatus(500).json({ message: "Collection was not found" });
        }
        const skillsData = await collection
          .find({})
          .toArray()
          .catch((err) => resStatus(500).json({ message: err }));

        collection.watch().on("change", (change) => {
          switch (change.operationType) {
            case "insert" || "delete":
              realtime.channels
                .get("skillCards")
                .publish("newSkillCard", change.fullDocument);
              break;
            case "replace":
              realtime.channels
                .get("skillCards")
                .publish("updatedSkillCard", change.fullDocument);
            default:
              break;
          }
        });
        return resStatus(200).json(skillsData);
      } catch (err) {
        resStatus(500).json(`Server Error: ${err}`);
      }
    default:
      return res.status(405).json({ message: "Method Not Allowed" });
  }
}
