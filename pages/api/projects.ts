import connectToDB from "../../lib/database";
import { VercelRequest, VercelResponse } from "@vercel/node";
import { Db } from "mongodb";
import cardEmitters from "../../lib/changeEvents";
import connectToAbly from "../../lib/connectToAbly";

export default async function projects(
  req: VercelRequest,
  res: VercelResponse
) {
  const resStatus = (httpCode: number) => res.status(httpCode);
  const { collection_name } = req.query;
  switch (req.method) {
    case "GET":
      if (!collection_name) {
        return resStatus(404).json({
          message: "Please specifiy a collection name",
        });
      }
      try {
        const db: Db = await connectToDB();
        const realtime = connectToAbly();
        const collection = db.collection(collection_name.toString());

        const projectsData = await collection
          .find({})
          .toArray()
          .catch((err) =>
            resStatus(500).json({
              message: "Error fetching projects",
              error: err.message,
            })
          );
        const channel = realtime.channels.get(collection_name.toString());
        const changeStream = collection.watch([], {
          fullDocument: "updateLookup",
        });

        changeStream.on("change", async (change) => {
          try {
            await cardEmitters(change, channel, collection);
          } catch (err) {
            resStatus(500).json({
              message: "Error emitting change event",
              error: err,
            });
          }
        });

        return resStatus(200).json(projectsData);
      } catch (err) {
        resStatus(500).json(`Server Error: ${err}`);
      }
    default:
      return res.status(401).json({ message: "unreachable method" });
  }
}
