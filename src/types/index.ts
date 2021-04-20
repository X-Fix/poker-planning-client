type Identifiable = {
  id: string;
  name: string;
};

export type Participant = {
  isActive: boolean;
  isConnected: boolean;
  vote?: string;
} & Identifiable;

export type SessionPhase = 'lobby' | 'newTopic' | 'voting' | 'result';

export type Session = {
  cardSequence: string[];
  ownerId: string;
  topic: string;
  phase: SessionPhase;
  participants: Participant[];
} & Identifiable;

export type SessionToken = {
  participantId?: string;
  sessionId?: string;
};

export type TSessionContext = {
  cardSequence?: string[];
  ownerId?: string;
  participants?: Participant[];
  self?: Participant;
  sessionId?: string;
  sessionName?: string;
  sessionPhase?: SessionPhase;
  topic?: string;
};

export type SessionContextProps = TSessionContext & {
  setSessionContext: (sessionContext: TSessionContext) => void;
};

export type NotificationMessage = {
  message: string;
  type: 'success' | 'info';
};

export type NotificationContextProps = {
  notifications: NotificationMessage[];
  enqueue: (notificationMessage: NotificationMessage) => void;
  dequeue: () => NotificationMessage;
};

export type EmitRemoveParticipantPayload = {
  participantId: string;
  sessionId: string;
};

export type EmitNewTopicPayload = {
  sessionId: string;
  topic: string;
};

export type EmitSetParticipantIsActivePayload = {
  isActive: boolean;
  participantId: string;
  sessionId: string;
};

export type EmitSetVotePayload = {
  sessionId: string;
  vote: string;
};
