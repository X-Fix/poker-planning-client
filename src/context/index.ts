import { createContext } from 'react';
import { NotificationContextProps, SessionContextProps } from '../types';

export const SessionContext = createContext<SessionContextProps>({
  setSessionContext: () => {},
});

export const NotificationContext = createContext<NotificationContextProps>({
  notifications: [],
  enqueue: () => {},
  dequeue: () => null,
});
