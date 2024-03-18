import { useContext } from 'react';
import { discordContext } from '../components/providers/discord';

export default function useDiscord() {
  return useContext(discordContext);
}
