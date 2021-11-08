import Ably from "ably/promises";

let cachedAbly: Ably.Realtime | undefined;
const connectToAbly = () => {
  if (cachedAbly) {
    return cachedAbly;
  } else {
    const realtime = new Ably.Realtime(process.env.ABLY_API_KEY);
    realtime.auth.requestToken({
      clientId: process.env.ABLY_CLIENT_ID,
    });
    cachedAbly = realtime;
    return cachedAbly;
  }
};

export default connectToAbly;
