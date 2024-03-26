import { discordSdk } from './discordSdk';

export type TAuthenticateResponse = Awaited<ReturnType<typeof discordSdk.commands.authenticate>>;

export type TAuthenticatedContext = TAuthenticateResponse & { guildMember: IGuildsMembersRead | null };

export interface IGuildsMembersRead {
  roles: string[];
  nick: string | null;
  avatar: string | null;
  premium_since: string | null;
  joined_at: string;
  is_pending: boolean;
  pending: boolean;
  communication_disabled_until: string | null;
  user: {
    id: string;
    username: string;
    avatar: string | null;
    discriminator: string;
    public_flags: number;
  };
  mute: boolean;
  deaf: boolean;
}
