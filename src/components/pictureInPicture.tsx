import cn from '@/utils/cn';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
}

export default function PictureInPicture(props: Props) {
  const { className, children } = props;

  return (
    <div style={{ zIndex: 999999 }} className={cn('fixed top-0 left-0 right-0 bottom-0 bg-[#242628] pip:hidden', className)}>
      {children}
    </div>
  );
}
