import { createFileRoute } from '@tanstack/react-router';
import useDiscord from '../hooks/useDiscord';
import useUser from '../hooks/useUser';

export const Route = createFileRoute('/')({
  component: HomeComponent,
});

function HomeComponent() {
  const discord = useDiscord();
  const { user } = useUser();

  return (
    <div className="p-2">
      <h3>
        {user.avatar} {discord.channelId}{' '}
        <button
          onClick={async () => {
            const url = await discord.commands.initiateImageUpload();
            console.log(url);
          }}
        >
          run bs
        </button>
      </h3>
    </div>
  );
}
