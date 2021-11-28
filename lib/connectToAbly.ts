import { Realtime } from "ably";
let cachedAbly: Realtime | undefined;
const connectToAbly = (token?: string) => {
  if (cachedAbly) {
    return cachedAbly;
  } else {
    const realtime = new Realtime({
      key: token,
      log: {
        level: 0,
      },
    });
    cachedAbly = realtime;
    return cachedAbly;
  }
};

export default connectToAbly;
