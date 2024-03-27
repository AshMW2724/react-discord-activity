import useScreen from '@/hooks/useScreen';
import cn from '@/utils/cn';
import { ReactNode } from 'react';
import { ScreenLayout } from './screenProvider';

interface Props {
  children: ReactNode;
  className?: string;
}

export default function PictureInPicture(props: Props) {
  const { className, children } = props;
  const { layout } = useScreen();

  if (layout !== ScreenLayout.PIP) return `${layout}`;
  return (
    <div style={{ zIndex: 999999 }} className={cn('fixed top-0 left-0 right-0 bottom-0 bg-[#242628]', className)}>
      {children}
    </div>
  );
}
