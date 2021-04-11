import io, { Socket } from 'socket.io-client';
import {
  EmitLeaveSessionPayload,
  EmitNewTopicPayload,
  EmitRemoveParticipantPayload,
  EmitSetParticipantIsActivePayload,
  EmitSetVotePayload,
  Participant,
  Session,
} from '../types';

type SubscribePayload = {
  // onConnect: () => void;     TODO
  // onDisconnect: () => void;  TODO
  // onServerError: () => void; TODO
  participantId: string;
  sessionId: string;
  onRemoved: () => void;
  onSyncSession: (session: Session) => void;
  onSyncParticipants: (participants: Participant[]) => void;
};

let socket: Socket;

export function connectSocket({
  // onConnect,
  // onDisconnect,
  // onServerError,
  participantId,
  sessionId,
  onRemoved,
  onSyncSession,
  onSyncParticipants,
}: SubscribePayload): void {
  if (!socket) {
    socket = io('http://192.168.2.159:3000', {
      autoConnect: false,
      query: {
        sessionId,
        participantId,
      },
    });
    socket.on('connect', () => {
      console.log('connected:', socket.id);
    });
    socket.on('removed', onRemoved);
    socket.on('syncSession', onSyncSession);
    socket.on('syncParticipants', onSyncParticipants);
  }

  socket.connect();
}

export function emitLeaveSession(payload: EmitLeaveSessionPayload): void {
  if (!socket) return;
  socket.emit('leaveSession', payload);
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
  console.log('disconnected');
  socket.disconnect();
}
