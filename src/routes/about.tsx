import { createFileRoute } from '@tanstack/react-router';
import { useAuthenticatedContext } from '@/hooks/useAuthenticatedContext';
import PictureInPicture from '@/components/pictureInPicture';

export const Route = createFileRoute('/about')({
  component: AboutComponent,
});

function AboutComponent() {
  const auth = useAuthenticatedContext();

  return (
    <div>
      <PictureInPicture>This is only shown when in Picture-In-Picture!</PictureInPicture>
      About?
    </div>
  );
}
