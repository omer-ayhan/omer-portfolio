import { Realtime } from "ably";

const connectToAbly = (token: string, cachedAbly: Realtime | undefined) => {
  if (cachedAbly) {
    return cachedAbly;
  } else {
    const realtime = new Realtime({ key: token });
    cachedAbly = realtime;
    return cachedAbly;
  }
};

export default connectToAbly;
