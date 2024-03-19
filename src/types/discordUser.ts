import { DiscordSDK } from '@discord/embedded-app-sdk';

export type DiscordUser = Awaited<ReturnType<DiscordSDK['commands']['authenticate']>>;
