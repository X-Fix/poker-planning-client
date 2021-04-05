import React, { ReactElement } from 'react';
import styled from '@emotion/styled';

import { Icon } from '../01-atoms';
import { color, shadows } from '../00-base/variables';
import { font } from '../00-base/utils';

const SnoozeIcon = styled(Icon)`
  color: ${color.neutral200};
`;

const BusyIcon = styled(Icon)`
  color: ${color.neutral900};
`;

const DoneIcon = styled(Icon)`
  color: ${color.green700};
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

  ${SnoozeIcon}:not(:active):hover & {
    filter: drop-shadow(${shadows.buttonTertiary});
  }
`;

const ParticipantScore = styled.span`
  ${font('headline')};

  color: ${color.blue800};
`;

type ParticipantStatusProps = {
  isConnected: boolean;
  isOwner: boolean;
  handleKick: () => void;
  hasVoted: boolean;
  participantName: string;
  participantScore: string;
};

function ParticipantStatus({
  isConnected,
  isOwner,
  handleKick,
  hasVoted,
  participantScore,
}: ParticipantStatusProps): ReactElement {
  return participantScore ? (
    <ParticipantScore>{participantScore}</ParticipantScore>
  ) : (
    <>
      {!isConnected && (
        <SnoozeIcon
          description='This participant has temporarily disconnected'
          xlink='snooze'
        />
      )}
      {hasVoted ? (
        <DoneIcon
          description='This participant is finished voting'
          xlink='done'
        />
      ) : (
        <BusyIcon
          description='This participant us still busy voting'
          xlink='busy'
        />
      )}
      {!isOwner && (
        <RemoveButton onClick={handleKick}>
          <RemoveIcon
            description='Click to remove this participant from the session'
            xlink='kick'
          />
        </RemoveButton>
      )}
    </>
  );
}

export default React.memo(ParticipantStatus);
