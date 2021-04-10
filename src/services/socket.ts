import io from 'socket.io-client';
import {
  EmitLeaveSessionPayload,
  EmitNewTopicPayload,
  EmitRemoveParticipantPayload,
  EmitSetParticipantIsActivePayload,
  EmitSetVotePayload,
  Participant,
  Session,
  TSessionContext,
} from '../types';
import { parseToSessionContext } from './utils';

type SubscribePayload = {
  // onConnect: () => void;     TODO
  // onDisconnect: () => void;  TODO
  // onServerError: () => void; TODO
  isSyncNeeded: boolean;
  participantId: string;
  sessionId: string;
  setSessionContext: (sessionContext: TSessionContext) => void;
};

const socket = io('http://192.168.2.159:3000', { autoConnect: false });

export function emitSubscribe({
  // onConnect,
  // onDisconnect,
  // onServerError,
  isSyncNeeded,
  participantId,
  sessionId,
  setSessionContext,
}: SubscribePayload): void {
  if (!socket.connected) {
    socket.connect();
    socket.on('syncSession', (session: Session) => {
      setSessionContext(parseToSessionContext({ participantId, session }));
    });
    socket.on('syncParticipants', (participants: Participant[]) => {
      setSessionContext(parseToSessionContext({ participantId, participants }));
    });
    socket.on('removed', () => {
      window.sessionStorage.removeItem('sessionToken');
      setSessionContext({});
    });
  }

  socket.emit(
    'subscribe',
    { participantId, sessionId },
    isSyncNeeded
      ? (session: Session) =>
          setSessionContext(parseToSessionContext({ participantId, session }))
      : undefined
  );

  // socket.on('connection', onConnect);

  // socket.io.on('reconnect_attempt', () => {
  //   // TODO
  //   console.log('attempting reconnect...');
  // });

  // socket.io.on('reconnect', () => {
  //   // TODO
  //   console.log('reconnect successful!');
  // });
}

export function emitLeaveSession(payload: EmitLeaveSessionPayload): void {
  socket.emit('leaveSession', payload);
}

export function emitRemoveParticipant(
  payload: EmitRemoveParticipantPayload
): void {
  socket.emit('removeParticipant', payload);
}

export function emitSetParticipantIsActive(
  payload: EmitSetParticipantIsActivePayload
): void {
  socket.emit('setActive', payload);
}

export function emitNewTopic(payload: EmitNewTopicPayload): void {
  socket.emit('newTopic', payload);
}

export function emitSetVote(payload: EmitSetVotePayload): void {
  socket.emit('setVote', payload);
}

export function disconnectSocket() {
  console.log('disconnected');
  socket.disconnect();
}

// socket.on('connection', ({ id }: Socket) => {
//   console.log(id);
// });

// socket.on('pong', () => {
//   console.log('pong!');
// });
