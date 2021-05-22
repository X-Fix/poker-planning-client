import io, { Socket } from 'socket.io-client';
import { SERVER_ORIGIN } from '../constants/env';
import {
  EmitNewTopicPayload,
  EmitRemoveParticipantPayload,
  EmitSetParticipantIsActivePayload,
  EmitSetVotePayload,
  Participant,
  Session,
} from '../types';

type SubscribePayload = {
  participantId: string;
  sessionId: string;
  onSessionEnd: (reason: string) => void;
  onSyncSession: (session: Session) => void;
  onSyncParticipants: (participants: Participant[]) => void;
};

let _socket: Socket;
let _socketSessionId: string;

export function connectSocket({
  participantId,
  sessionId,
  onSessionEnd,
  onSyncSession,
  onSyncParticipants,
}: SubscribePayload): void {
  // If connecting to a different session, close any existing socket connections
  if (sessionId !== _socketSessionId) {
    _socket?.disconnect();
  }

  /**
   * Keep a reference to any previous _socket connection so we can disconnect it once the new one
   * has been safely established
   */
  const staleSocket = _socket;

  _socket = io(SERVER_ORIGIN, {
    autoConnect: false,
    query: {
      sessionId,
      participantId,
    },
  });

  _socket.on('connect', () => {
    staleSocket?.disconnect();
  });
  _socket.on('syncSession', onSyncSession);
  _socket.on('syncParticipants', onSyncParticipants);
  _socket.on('removed', () => {
    onSessionEnd('You were removed from the session');
  });
  _socket.on('serverError', () => {
    onSessionEnd('Unknown server error');
  });
  _socket.on('sessionError', () => {
    onSessionEnd('Session connection error. Please try again');
  });

  _socket.connect();
  _socketSessionId = sessionId;
}

export function emitRemoveParticipant(
  payload: EmitRemoveParticipantPayload
): void {
  _socket?.emit('removeParticipant', payload);
}

export function emitSetParticipantIsActive(
  payload: EmitSetParticipantIsActivePayload
): void {
  _socket?.emit('setActive', payload);
}

export function emitNewTopic(payload: EmitNewTopicPayload): void {
  _socket?.emit('newTopic', payload);
}

export function emitSetVote(payload: EmitSetVotePayload): void {
  _socket?.emit('setVote', payload);
}

export function disconnectSocket() {
  _socket?.disconnect();
}
