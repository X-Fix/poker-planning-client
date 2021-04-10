import { createContext } from 'react';
import { SessionContextProps } from '../types';

export const SessionContext = createContext<SessionContextProps>({
  setSessionContext: () => {},
});
