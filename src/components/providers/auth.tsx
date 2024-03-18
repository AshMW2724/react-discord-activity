import { ReactNode, createContext, useEffect, useState } from 'react';
import { DiscordUser } from '../../types/discordUser';
import useDiscord from '../../hooks/useDiscord';

interface Props {
  children: ReactNode;
}

export const userContext = createContext<DiscordUser>(null as never);

export default function AuthProvider(props: Props) {
  const { children } = props;
  const discord = useDiscord();
  const [user, setUser] = useState<DiscordUser | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const run = async () => {
      await discord.ready();
      console.log('Discord SDK is ready');
      setReady(true);

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

    run();
  }, []);

  if (!discord || !user) return <>Loading... {ready && 'Ready! starting auth flow'}</>;
  return <userContext.Provider value={user}>{children}</userContext.Provider>;
}
