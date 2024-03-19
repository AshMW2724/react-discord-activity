import { useContext } from 'react';
import { userContext } from '../components/providers/auth';

export default function useUser() {
  return useContext(userContext);
}
