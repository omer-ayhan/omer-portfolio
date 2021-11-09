import connectToDB from "../../lib/database.js";
import { Db } from "mongodb";
import { VercelRequest, VercelResponse } from "@vercel/node";
import connectToAbly from "../../lib/connectToAbly";
import cardEmitters from "../../lib/changeEvents";

export default async function skills(req: VercelRequest, res: VercelResponse) {
  const resStatus = (httpCode: number) => res.status(httpCode);
  switch (req.method) {
    case "GET":
      try {
        const db: Db = await connectToDB();

        const collection = db.collection("skillCards");
        if (!collection) {
          resStatus(500).json({ message: "Collection was not found" });
        }
        let skillsData = await collection
          .find({})
          .toArray()
          .catch((err) => resStatus(500).json({ message: err }));
        const changeStream = collection.watch([], {
          fullDocument: "updateLookup",
        });

        changeStream.on("change", async (change) => {
          try {
            const realtime = connectToAbly();
            const channel = realtime.channels.get("skillsChannel");
            console.log("skills change");
            await cardEmitters(change, channel, collection);
          } catch (err) {
            resStatus(500).json({
              message: "Error emitting change event",
              error: err,
            });
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
