import { ScreenContext } from '@/components/screenProvider';
import { useContext } from 'react';

export default function useScreen() {
  return useContext(ScreenContext);
}
