import { useEffect } from "react";
import Ably from "ably/promises";
import { Types } from "ably";
import connectToAbly from "../../lib/connectToAbly";
const realtime = connectToAbly();

function useChannels(
  channelName: string,
  channelCallBack: (channel: Types.RealtimeChannelPromise) => void,
  dependancy: React.DependencyList = []
) {
  const channel = realtime.channels.get(channelName);

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
