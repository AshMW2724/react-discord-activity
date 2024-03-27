import { discordSdk } from '@/discordSdk';
import { Platform } from '@discord/embedded-app-sdk';
import { ReactNode, createContext, useEffect, useState } from 'react';

export const ScreenLayout = {
  UNHANDLED: -1,
  FOCUSED: 0,
  PIP: 1,
  GRID: 2,
} as const;
export const ScreenOrientation = {
  UNHANDLED: -1,
  PORTRAIT: 0,
  LANDSCAPE: 1,
} as const;

type valueof<T> = T[keyof T];

interface ScreenContext {
  layout: valueof<typeof ScreenLayout>;
  orientation: valueof<typeof ScreenOrientation>;
  platform: Platform;
}

export const ScreenContext = createContext<ScreenContext>({ layout: 0, orientation: -1, platform: Platform.DESKTOP });

interface Props {
  children: ReactNode;
}

export default function ScreenProvider(props: Props) {
  const { children } = props;
  const [layout, setLayout] = useState<ScreenContext['layout']>(-1);
  const [orientation, setOrientation] = useState<ScreenContext['orientation']>(-1);

  useEffect(() => {
    discordSdk.subscribe('ORIENTATION_UPDATE', (e) => setOrientation(e.screen_orientation));
    discordSdk.subscribe('ACTIVITY_LAYOUT_MODE_UPDATE', (e) => setLayout(e.layout_mode));

    // TODO: Add cleanup function
    // return () = {}
  }, []);

  return <ScreenContext.Provider value={{ layout, orientation, platform: discordSdk.platform }}>{children}</ScreenContext.Provider>;
}
