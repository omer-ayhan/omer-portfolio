import { Types } from "ably";
import { ChangeStreamDocument, Collection } from "mongodb";

const cardEmitters = async (
  change: ChangeStreamDocument,
  channel: Types.RealtimeChannelPromise,
  collection: Collection
) => {
  let cardChange;
  switch (change.operationType) {
    case "insert":
      cardChange = await collection.find({}).toArray();
      channel.publish("insertCard", cardChange);
      break;
    case "delete":
      cardChange = change.documentKey;
      channel.publish("deleteCard", cardChange);
      break;
    case "update":
      cardChange = change.fullDocument;
      channel.publish("updateCard", cardChange);
      break;
    default:
      break;
  }
};

export default cardEmitters;
