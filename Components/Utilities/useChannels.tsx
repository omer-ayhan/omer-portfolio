import { useEffect } from "react";
import { Realtime } from "ably";
import type { Types } from "ably";
import connectToAbly from "../../lib/connectToAbly";
let cachedAbly: Realtime | undefined;
const realtime = connectToAbly(process.env.ABLY_USER, cachedAbly);
function useChannels(
  channelName: string,
  channelCallBack: (channel: Types.RealtimeChannelCallbacks) => void,
  dependancy: React.DependencyList = []
) {
  const channel: Types.RealtimeChannelCallbacks =
    realtime.channels.get(channelName);

  const onUnMount = () => {
    channel.unsubscribe();
  };

  const useEffectHook = () => {
    channelCallBack(channel);
    return () => onUnMount();
  };

  useEffect(useEffectHook, dependancy);

  return channel;
}

export default useChannels;
