type Identifiable = {
  id: string;
  name: string;
};

export type Participant = {
  isActive: boolean;
  socketId?: string; // presence or absence indicates isConnected status
} & Identifiable;

export type Session = {
  cardSequence: string[];
  ownerId: string;
  participants: Participant[];
} & Identifiable;

export type SessionData = {
  participantId: string;
  session: Session;
};
