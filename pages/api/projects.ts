import connectToDB from "../../lib/database";
import { VercelRequest, VercelResponse } from "@vercel/node";

export default async function projects(
  req: VercelRequest,
  res: VercelResponse
) {
  const resStatus = (httpCode: number) => res.status(httpCode);
  const { collection_name } = req.query;
  switch (req.method) {
    case "GET":
      try {
        if (!collection_name) {
          return resStatus(404).json({
            message: "Please specifiy a collection name",
          });
        }
        const db = await connectToDB();
        const collection = db.collection(collection_name.toString());

        const projectsData = await collection
          .find({})
          .toArray()
          .catch((err) => err);

        return resStatus(200).json({ projectsData });
      } catch (err) {
        resStatus(500).json(`Server Error: ${err}`);
      }
    default:
      return res.status(401).json({ message: "unreachable method" });
  }
}
