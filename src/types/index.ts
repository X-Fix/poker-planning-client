type Identifiable = {
  id: string;
  name: string;
};

export type Participant = {
  isActive: boolean;
  socketId?: string; // presence or absence indicates isConnected status
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

export type EmitLeaveSessionPayload = {
  sessionId: string;
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
