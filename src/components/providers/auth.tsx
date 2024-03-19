import { ReactNode, createContext, useEffect, useState } from 'react';
import useDiscord from '../../hooks/useDiscord';
import { DiscordUser } from '../../types/discordUser';
import useLocalStorageState from 'use-local-storage-state';

interface Props {
  children: ReactNode;
}

export const userContext = createContext<DiscordUser>(null as never);

export default function AuthProvider(props: Props) {
  const { children } = props;
  const discord = useDiscord();
  const [user, setUser] = useLocalStorageState<DiscordUser | null>('user', { defaultValue: null });

  const run = async () => {
    console.log('logging in');
    await discord.ready();
    // Authorize with Discord Client
    const { code } = await discord.commands.authorize({
      client_id: import.meta.env.VITE_DISCORD_CLIENT_ID,
      response_type: 'code',
      state: '',
      prompt: 'none',
      // Scopes you want
      scope: ['identify', 'guilds'],
    });

    // Retrieve an access_token from your activity's server
    const response = await fetch('/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        code,
      }),
    });
    const { access_token } = await response.json();

    // Authenticate with Discord client (using the access_token)
    const auth = await discord.commands.authenticate({
      access_token,
    });

    setUser(auth);
  };

  useEffect(() => {
    run().catch((e) => console.error(e));
  }, []);

  if (!discord || !user)
    return <div className="bg-black h-screen w-screen items-center justify-center flex text-white">Please authenticate...</div>;
  return <userContext.Provider value={user}>{children}</userContext.Provider>;
}
