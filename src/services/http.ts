import { TSessionContext } from '../types';
import { parseToSessionContext } from './utils';

type JoinSessionPayload = {
  participantName?: string;
  sessionId: string;
};

type CreateSessionPayload = {
  participantName?: string;
  sessionName?: string;
  cardSequence: string[];
};

type Result = {
  response: TSessionContext;
  token: {
    participantId: string;
    sessionId: string;
  };
};

async function post(
  body: JoinSessionPayload | CreateSessionPayload,
  endpoint: string
): Promise<TSessionContext> {
  const response = await fetch(`http://192.168.2.159:3000/api/${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    alert('Oops, something went horribly wrong');
    return;
  }

  const { participantId, session } = await response.json();
  return parseToSessionContext({ participantId, session });
}

function withToken(response: TSessionContext) {
  return {
    response,
    token: {
      participantId: response.self.id,
      sessionId: response.sessionId,
    },
  };
}

export async function createSession(
  body: CreateSessionPayload
): Promise<Result> {
  return withToken(await post(body, 'create-session'));
}

export async function joinSession(body: JoinSessionPayload): Promise<Result> {
  return withToken(await post(body, 'join-session'));
}
