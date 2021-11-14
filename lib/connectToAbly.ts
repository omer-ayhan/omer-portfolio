import { Realtime } from "ably";
let cachedAbly: Realtime | undefined;
const connectToAbly = (token: string) => {
  if (cachedAbly) {
    console.log("Using cached Ably instance");
    return cachedAbly;
  } else {
    const realtime = new Realtime({ key: token });
    cachedAbly = realtime;
    console.log("Created new Ably instance");
    return cachedAbly;
  }
};

export default connectToAbly;
