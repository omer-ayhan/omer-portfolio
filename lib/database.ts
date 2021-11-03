import { Db, MongoClient } from "mongodb";
import "dotenv/config";

let cachedDB: Db;

declare var process: {
  env: {
    MONGODB_URI: string;
    DB_NAME: string;
  };
};

const connectToDB = async () => {
  if (cachedDB) {
    console.log("Connection already exists");
    return Promise.resolve(cachedDB);
  } else {
    await MongoClient.connect(process.env.MONGODB_URI)
      .then(async (client) => {
        let db = client.db(process.env.DB_NAME);
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
