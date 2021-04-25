import React, { ReactElement, useContext } from 'react';
import styled from '@emotion/styled';

import { Participant } from '../../types';
import { SessionContext } from '../../context';
import { emitRemoveParticipant } from '../../services/socket';
import { color, shadows } from '../00-base/variables';
import { font } from '../00-base/utils';
import { Icon } from '../01-atoms';
import { ParticipantStatus, ParticipantWrapper } from '.';

function getVoteNumericValue(vote: string): number {
  if (vote === '☕') {
    return 0;
  }

  if (vote === '?') {
    return 999;
  }

  return Number(vote);
}

function isOutlierVote(
  participantId: string,
  participantVote: string,
  participants: Participant[]
): boolean {
  let isHighest = true;
  let isLowest = true;
  let isCommon = false;
  const comparableVote = getVoteNumericValue(participantVote);

  participants.forEach(({ id, vote, name }) => {
    if (participantId === id) return;

    const comparedVote = getVoteNumericValue(vote);

    if (comparableVote < comparedVote) {
      isHighest = false;
    }

    if (comparableVote > comparedVote) {
      isLowest = false;
    }

    if (comparableVote === comparedVote) {
      console.log('common with', name);
      isCommon = true;
    }
  });

  console.log({ isCommon, isHighest, isLowest });

  return !isCommon && (isHighest || isLowest);
}

const ParticipantName = styled.span<{ isOwner?: boolean }>`
  ${font('body')};

  flex: 1;

  ${({ isOwner }) =>
    isOwner &&
    `
    text-decoration: underline;
  `}
`;

const ParticipantVote = styled.span`
  ${font('headline')};

  color: ${color.blue800};
  text-decoration: none;
`;

const RemoveButton = styled.button`
  background-color: transparent;
  border: none;
  color: ${color.blue800};
  cursor: pointer;
  line-height: 1;
  padding: 0;
`;

const RemoveIcon = styled(Icon)`
  filter: drop-shadow(${shadows.buttonPrimary});

  ${RemoveButton}:hover & {
    filter: drop-shadow(${shadows.buttonTertiary});
  }
`;

type ParticipantListItemProps = {
  participant: Participant;
};

const ParticipantListItem: React.FC<ParticipantListItemProps> = ({
  participant,
}): ReactElement => {
  const { participants, self, sessionId, sessionPhase, ownerId } = useContext(
    SessionContext
  );
  const { id, isActive, isConnected, name, vote } = participant;
  const isOutlier =
    sessionPhase === 'result' &&
    isOutlierVote(
      id,
      vote,
      participants.filter(({ isActive }) => isActive)
    );
  const isOwner = id === ownerId;
  const isSelf = id === self.id;
  const isSelfOwner = self.id === ownerId;

  const handleRemove = (participantId: string) => {
    emitRemoveParticipant({
      participantId,
      sessionId,
    });
  };

  return (
    <ParticipantWrapper
      isActive={isActive}
      isSelf={isSelf}
      isOutlier={isOutlier}
    >
      <ParticipantName isOwner={isOwner}>{name}</ParticipantName>
      {sessionPhase === 'voting' && (
        <ParticipantStatus
          hasVoted={Boolean(vote)}
          isDisconnected={!isConnected}
        />
      )}
      {sessionPhase === 'result' && <ParticipantVote>{vote}</ParticipantVote>}
      {sessionPhase !== 'result' && isSelfOwner && !isSelf && (
        <RemoveButton onClick={() => handleRemove(id)}>
          <RemoveIcon
            description='Click to remove this participant from the session'
            xlink='remove'
          />
        </RemoveButton>
      )}
    </ParticipantWrapper>
  );
};

export default ParticipantListItem;
