import { Participant, Session, TSessionContext } from '../types';

type Payload = {
  participantId: string;
  session?: Session;
  participants?: Participant[];
};

export function parseToSessionContext({
  participantId,
  session,
  participants,
}: Payload): TSessionContext {
  const self = (session?.participants || participants).find(
    ({ id }) => id === participantId
  );

  if (session) {
    const {
      id: sessionId,
      name: sessionName,
      phase: sessionPhase,
      ...rest
    } = session;

    return {
      self,
      sessionId,
      sessionName,
      sessionPhase,
      ...rest,
    };
  }

  if (participants) {
    return {
      self,
      participants,
    };
  }
}
