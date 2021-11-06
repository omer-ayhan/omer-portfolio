import { useEffect } from "react";
import Ably from "ably/promises";

const realtime = new Ably.Realtime(
  "NUENiQ.y8uDcw:HpShiptVfMBFM-BuRraN6bea9ZlCgAV3Yv_wMlVVXps"
);
async function useChannels(
  channelName: string,
  eventName: string,
  channelCallBack: (data: any) => void,
  dependancy: React.DependencyList = []
) {
  const channel = realtime.channels.get(channelName);

  const onMount = () => {
    channel.subscribe(eventName, (data) => channelCallBack(data));
  };

  const onUnMount = () => {
    channel.unsubscribe();
  };

  const useEffectHook = () => {
    onMount();
    return () => onUnMount();
  };

  useEffect(useEffectHook, dependancy);

  return Promise.resolve(channel);
}

export default useChannels;
