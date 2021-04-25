import io, { Socket } from 'socket.io-client';
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

let socket: Socket;
let socketSessionId: string;

export function connectSocket({
  participantId,
  sessionId,
  onSessionEnd,
  onSyncSession,
  onSyncParticipants,
}: SubscribePayload): void {
  // If connecting to a different session, close any existing socket connections
  if (sessionId !== socketSessionId) {
    socket?.disconnect();
  }

  /**
   * Keep a reference to any previous socket connection so we can disconnect it once the new one
   * has been safely established
   */
  const staleSocket = socket;

  socket = io('http://192.168.2.159:3000', {
    autoConnect: false,
    query: {
      sessionId,
      participantId,
    },
  });

  socket.on('connect', () => {
    console.log('connected:', socket.id);
    staleSocket?.disconnect();
  });
  socket.on('syncSession', onSyncSession);
  socket.on('syncParticipants', onSyncParticipants);
  socket.on('removed', () => {
    onSessionEnd('You were removed from the session');
  });
  socket.on('serverError', () => {
    onSessionEnd('Unknown server error');
  });
  socket.on('sessionError', () => {
    onSessionEnd('Session connection error. Please try again');
  });

  socket.connect();
  socketSessionId = sessionId;
}

export function emitRemoveParticipant(
  payload: EmitRemoveParticipantPayload
): void {
  if (!socket) return;
  socket.emit('removeParticipant', payload);
}

export function emitSetParticipantIsActive(
  payload: EmitSetParticipantIsActivePayload
): void {
  if (!socket) return;
  socket.emit('setActive', payload);
}

export function emitNewTopic(payload: EmitNewTopicPayload): void {
  if (!socket) return;
  socket.emit('newTopic', payload);
}

export function emitSetVote(payload: EmitSetVotePayload): void {
  if (!socket) return;
  socket.emit('setVote', payload);
}

export function disconnectSocket() {
  if (!socket || socket.disconnected) return;
  socket.disconnect();
}
