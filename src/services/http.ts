import { Session } from '../types';

type payload = {
  cardSequence: string[];
  participantName?: string;
  sessionName?: string;
};

type result = {
  participantId: string;
  session: Session;
};

export async function createSession(body: payload): Promise<result> {
  const response = await fetch('http://localhost:3000/api/create-session', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    alert('Oops, something went horribly wrong');
  }

  const { participant, session } = await response.json();

  return {
    participantId: participant.id,
    session,
  };
}
