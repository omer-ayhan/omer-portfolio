import { useEffect } from "react";
import type { Types } from "ably";
import connectToAbly from "../../lib/connectToAbly";
const realtime = connectToAbly(process.env.ABLY_USER);
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
