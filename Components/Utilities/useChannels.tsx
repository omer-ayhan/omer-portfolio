import { useEffect } from "react";
import Ably from "ably/promises";

const realtime = new Ably.Realtime(process.env.ABLY_API_KEY);

realtime.auth.requestToken({
  clientId: process.env.ABLY_CLIENT_ID,
});

async function useChannels(
  channelName: string,
  channelCallBack: () => void,
  dependancy: React.DependencyList = []
) {
  const channel = realtime.channels.get(channelName);

  // const onMount = () => {
  //   channel.subscribe(eventName, (data) => channelCallBack(data));
  // };

  const onUnMount = () => {
    channel.unsubscribe();
  };

  const useEffectHook = () => {
    // onMount();
    channelCallBack();
    return () => onUnMount();
  };

  useEffect(useEffectHook, dependancy);

  return Promise.resolve(channel);
}

export default useChannels;
