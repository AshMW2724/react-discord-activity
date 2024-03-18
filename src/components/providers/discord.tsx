import type { DiscordSDK } from '@discord/embedded-app-sdk';
import { ReactNode, createContext } from 'react';

interface Props {
  sdk: DiscordSDK;
  children: ReactNode;
}

export const discordContext = createContext<DiscordSDK>(null as never);

export default function DiscordProvider(props: Props) {
  const { sdk, children } = props;

  if (!sdk || !(sdk && sdk.channelId)) return <>Loading...</>;
  return <discordContext.Provider value={sdk}>{children}</discordContext.Provider>;
}
