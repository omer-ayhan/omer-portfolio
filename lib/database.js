import { MongoClient } from "mongodb";

let cachedDB;
const connectToDB = async () => {
  if (cachedDB) {
    return Promise.resolve(cachedDB);
  } else {
    await MongoClient.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
      .then(async (client) => {
        let db = client.db(process.env.DB_NAME);
        cachedDB = db;
      })
      .catch((err) => {
        return err;
      });
    return cachedDB;
  }
};

export default connectToDB;
