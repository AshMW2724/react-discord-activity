import { discordSdk } from '../discordSdk';
import { LoadingScreen } from '../components/loadingScreen';

import type { GuildsMembersRead, AuthenticateResponse, AuthenticatedContext } from '../types';
import { ReactNode, createContext, useContext, useEffect, useRef, useState } from 'react';
import { RPCCloseCodes } from '@discord/embedded-app-sdk';

const AuthenticatedContext = createContext<AuthenticatedContext>({
  user: {
    id: '',
    username: '',
    discriminator: '',
    avatar: null,
    public_flags: 0,
  },
  access_token: '',
  scopes: [],
  expires: '',
  application: {
    rpc_origins: undefined,
    id: '',
    name: '',
    icon: null,
    description: '',
  },
  guildMember: null,
});

export function AuthenticatedContextProvider({ children }: { children: ReactNode }) {
  const authenticatedContext = useAuthenticatedContextSetup();

  if (authenticatedContext == null) {
    return <LoadingScreen />;
  }

  return <AuthenticatedContext.Provider value={authenticatedContext}>{children}</AuthenticatedContext.Provider>;
}

export function useAuthenticatedContext() {
  return useContext(AuthenticatedContext);
}

function useAuthenticatedContextSetup() {
  const [auth, setAuth] = useState<AuthenticatedContext | null>(null);

  const settingUp = useRef(false);

  useEffect(() => {
    // This will auto-close the activity if a hard reload is detected.
    window.addEventListener('beforeunload', () =>
      discordSdk.close(
        RPCCloseCodes.CLOSE_ABNORMAL,
        'A hard reload was detected, activity closed to prevent issues and such. Also screw Discord!',
      ),
    );

    const setUpDiscordSdk = async () => {
      console.log('running');
      await discordSdk.ready();

      // Authorize with Discord Client
      const { code } = await discordSdk.commands.authorize({
        client_id: import.meta.env.VITE_CLIENT_ID,
        response_type: 'code',
        state: '',
        prompt: 'none',
        // More info on scopes here: https://discord.com/developers/docs/topics/oauth2#shared-resources-oauth2-scopes
        scope: [
          // "applications.builds.upload",
          // "applications.builds.read",
          // "applications.store.update",
          // "applications.entitlements",
          // "bot",
          'identify',
          // "connections",
          // "email",
          // "gdm.join",
          'guilds',
          // "guilds.join",
          'guilds.members.read',
          // "messages.read",
          // "relationships.read",
          // 'rpc.activities.write',
          // "rpc.notifications.read",
          // "rpc.voice.write",
          'rpc.voice.read',
          // "webhook.incoming",
        ],
      });

      /**
       * This is a call to YOUR api, you need to return the access token.
       * If you are confused learn how OAUTH2 works ding dong.
       */
      const response = await fetch('/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code,
        }),
      }).then((e) => e.json());

      const { access_token } = response;

      console.log(response);

      // Authenticate with Discord client (using the access_token)
      const newAuth: AuthenticateResponse = await discordSdk.commands.authenticate({
        access_token,
      });

      // Get guild specific nickname and avatar, and fallback to user name and avatar
      const guildMember: GuildsMembersRead | null = await fetch(`/discord/api/users/@me/guilds/${discordSdk.guildId}/member`, {
        method: 'get',
        headers: { Authorization: `Bearer ${access_token}` },
      })
        .then((j) => j.json())
        .catch(() => {
          return null;
        });

      // Finally, we construct our authenticatedContext object to be consumed throughout the app;
      setAuth({ ...newAuth, guildMember });
    };

    if (!settingUp.current) {
      settingUp.current = true;
      setUpDiscordSdk().catch((e) =>
        discordSdk.close(RPCCloseCodes.CLOSE_ABNORMAL, `An error occurred while attempting to authenticate.\n\n${e.message}`),
      );
    }
  }, []);

  return auth;
}
