import { createFileRoute } from '@tanstack/react-router';
import useDiscord from '../hooks/useDiscord';

export const Route = createFileRoute('/')({
  component: HomeComponent,
});

function HomeComponent() {
  const discord = useDiscord();

  return (
    <div className="p-2">
      <h3>{discord?.channelId}</h3>
    </div>
  );
}
