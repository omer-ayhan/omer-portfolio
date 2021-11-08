import connectToDB from "../../lib/database.js";
import { ChangeStreamDocument, Collection, Db } from "mongodb";
import { VercelRequest, VercelResponse } from "@vercel/node";
import { Types } from "ably";
import connectToAbly from "../../lib/connectToAbly";
import cardEmitters from "../../lib/changeEvents";

export default async function skills(req: VercelRequest, res: VercelResponse) {
  const resStatus = (httpCode: number) => res.status(httpCode);
  switch (req.method) {
    case "GET":
      try {
        const db: Db = await connectToDB();
        const realtime = connectToAbly();

        const collection = db.collection("skillCards");
        if (!collection) {
          resStatus(500).json({ message: "Collection was not found" });
        }
        let skillsData = await collection
          .find({})
          .toArray()
          .catch((err) => resStatus(500).json({ message: err }));
        const channel = realtime.channels.get("skillsChannel");
        const changeStream = collection.watch([], {
          fullDocument: "updateLookup",
        });

        changeStream.on("change", async (change) => {
          await cardEmitters(change, channel, collection);
        });

        return resStatus(200).json(skillsData);
      } catch (err) {
        resStatus(500).json(`Server Error: ${err}`);
      }
    default:
      return resStatus(405).json({ message: "Method Not Allowed" });
  }
}

// const skillEmitters = async (
//   change: ChangeStreamDocument,
//   channel: Types.RealtimeChannelPromise,
//   collection: Collection
// ) => {
//   let skillsChange;
//   switch (change.operationType) {
//     case "insert":
//       skillsChange = await collection.find({}).toArray();
//       channel.publish("newSkill", skillsChange);
//       break;
//     case "delete":
//       skillsChange = change.documentKey;
//       channel.publish("deletedSkill", skillsChange);
//       break;
//     case "update":
//       skillsChange = change.fullDocument;
//       channel.publish("updatedSkill", skillsChange);
//       break;
//     default:
//       break;
//   }
// };
