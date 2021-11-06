import connectToDB from "../../lib/database";
import Ably from "ably/promises";
import { VercelRequest, VercelResponse } from "@vercel/node";

export default async function skills(req: VercelRequest, res: VercelResponse) {
  const resStatus = (httpCode: number) => res.status(httpCode);
  switch (req.method) {
    case "GET":
      try {
        const db = await connectToDB();
        const realtime = new Ably.Realtime(
          "NUENiQ.y8uDcw:HpShiptVfMBFM-BuRraN6bea9ZlCgAV3Yv_wMlVVXps"
        );

        const collection = db.collection("skillCards");
        if (!collection) {
          resStatus(500).json({ message: "Collection was not found" });
        }
        let skillsData = await collection
          .find({})
          .toArray()
          .catch((err) => resStatus(500).json({ message: err }));
        const channel = realtime.channels.get("skillsChannel");
        collection.watch().on("change", async (change) => {
          switch (change.operationType) {
            case "insert":
              skillsData = await collection.find({}).toArray();
              channel.publish("newSkills", skillsData);
              break;
            case "delete":
              skillsData = await collection.find({}).toArray();
              channel.publish("newSkills", skillsData);
              break;
            case "update":
              skillsData = await collection.find({}).toArray();
              channel.publish("newSkills", skillsData);
              break;
            case "replace":
              skillsData = await collection.find({}).toArray();
              channel.publish("newSkills", skillsData);
              break;
            default:
              break;
          }
        });
        return resStatus(200).json(skillsData);
      } catch (err) {
        resStatus(500).json(`Server Error: ${err}`);
      }
    default:
      return resStatus(405).json({ message: "Method Not Allowed" });
  }
}
