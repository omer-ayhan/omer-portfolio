import connectToDB from "../../lib/database.js";
import { ChangeStream, ChangeStreamDocument, Db } from "mongodb";
import Ably from "ably/promises";
import { VercelRequest, VercelResponse } from "@vercel/node";
import { Types } from "ably";

export default async function skills(req: VercelRequest, res: VercelResponse) {
  const resStatus = (httpCode: number) => res.status(httpCode);
  switch (req.method) {
    case "GET":
      try {
        const db: Db = await connectToDB();
        const realtime = new Ably.Realtime(process.env.ABLY_API_KEY);
        realtime.auth.requestToken({
          clientId: process.env.ABLY_CLIENT_ID,
        });

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
        let newChangeStream;

        changeStream.once("change", (change) => {
          // let skillsChange;
          const resumeToken = changeStream.resumeToken;
          skillEmitters(change, channel, changeStream);
          // switch (change.operationType) {
          //   case "insert":
          //     skillsChange = change.fullDocument;
          //     channel.publish("newSkills", skillsChange);
          //     changeStream.close();
          //     break;
          //   case "delete":
          //     skillsChange = change.documentKey;
          //     channel.publish("newSkills", skillsChange);
          //     changeStream.close();
          //     break;
          //   case "update":
          //     skillsChange = change.fullDocument;
          //     channel.publish("newSkills", skillsChange);
          //     break;
          //   // case "replace":
          //   //   skillsData = await collection.find({}).toArray();
          //   //   channel.publish("newSkills", skillsData);
          //   //   break;
          //   default:
          //     break;
          // }

          newChangeStream = collection.watch([], {
            resumeAfter: resumeToken,
            fullDocument: "updateLookup",
          });

          newChangeStream.on("change", (change) => {
            skillEmitters(change, channel, changeStream);

            // switch (change.operationType) {
            //   case "insert":
            //     console.log(change.fullDocument);
            //     skillsChange = change.fullDocument;
            //     channel.publish("newSkills", skillsChange);
            //     changeStream.close();
            //     break;
            //   case "delete":
            //     console.log(change.documentKey);
            //     skillsChange = change.documentKey;
            //     channel.publish("newSkills", skillsChange);
            //     changeStream.close();
            //     break;
            //   case "update":
            //     skillsChange = change.fullDocument;
            //     channel.publish("newSkills", skillsChange);
            //     break;
            //   // case "replace":
            //   //   skillsData = await collection.find({}).toArray();
            //   //   channel.publish("newSkills", skillsData);
            //   //   break;
            //   default:
            //     break;
            // }
          });
        });
        return resStatus(200).json(skillsData);
      } catch (err) {
        resStatus(500).json(`Server Error: ${err}`);
      }
    default:
      return resStatus(405).json({ message: "Method Not Allowed" });
  }
}

const skillEmitters = (
  change: ChangeStreamDocument,
  channel: Types.RealtimeChannelPromise,
  changeStream: ChangeStream
) => {
  let skillsChange;
  switch (change.operationType) {
    case "insert":
      skillsChange = change.fullDocument;
      console.log(skillsChange);
      channel.publish("newSkills", skillsChange);
      changeStream.close();
      break;
    case "delete":
      skillsChange = change.documentKey;
      console.log(skillsChange);
      channel.publish("newSkills", skillsChange);
      changeStream.close();
      break;
    case "update":
      skillsChange = change.fullDocument;
      console.log(skillsChange);
      channel.publish("newSkills", skillsChange);
      changeStream.close();
      break;
    // case "replace":
    //   skillsData = await collection.find({}).toArray();
    //   channel.publish("newSkills", skillsData);
    //   break;
    default:
      break;
  }
};
