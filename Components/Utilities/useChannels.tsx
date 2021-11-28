import { useEffect } from "react";
import { Realtime } from "ably";
import type { Types } from "ably";

const realtime = new Realtime({
  key: process.env.NEXT_PUBLIC_ABLY_USER,
  log: {
    level: 0,
  },
});

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
