import { Loader2 } from 'lucide-react';
import PictureInPicture from './pictureInPicture';

export function LoadingScreen() {
  return (
    <div className="flex h-screen w-screen items-center justify-center font-bold text-2xl bg-black">
      <PictureInPicture>Loading but smaller</PictureInPicture>
      <Loader2 className="animate-spin text-blue-500 size-12" />
    </div>
  );
}
