import { Db, MongoClient } from "mongodb";
import "dotenv/config";

let cachedDB: Db;

declare var process: {
  env: {
    MONGODB_URI: string;
  };
};

const connectToDB = async (dbName: string) => {
  if (cachedDB) {
    console.log("Connection already exists");
    return Promise.resolve(cachedDB);
  } else {
    await MongoClient.connect(process.env.MONGODB_URI)
      .then(async (client) => {
        let db = client.db(dbName);
        console.log("New database connection");
        cachedDB = db;
      })
      .catch((err) => {
        return err;
      });
    return cachedDB;
  }
};

export default connectToDB;
