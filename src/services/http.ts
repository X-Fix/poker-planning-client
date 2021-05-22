import { SERVER_ORIGIN } from '../constants/env';

type JoinSessionPayload = {
  participantName?: string;
  sessionId: string;
};

type CreateSessionPayload = {
  participantName?: string;
  sessionName?: string;
  cardSequence: string[];
};

type SessionToken = {
  participantId: string;
  sessionId: string;
};

async function post(
  body: JoinSessionPayload | CreateSessionPayload,
  endpoint: string
): Promise<SessionToken> {
  const response = await fetch(`${SERVER_ORIGIN}/api/${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw response.status;
  }

  return await response.json();
}

export async function createSession(
  body: CreateSessionPayload
): Promise<SessionToken> {
  return await post(body, 'create-session');
}

export async function joinSession(
  body: JoinSessionPayload
): Promise<SessionToken> {
  return await post(body, 'join-session');
}
