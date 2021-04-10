import React, { MouseEventHandler, ReactElement } from 'react';
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

const ParticipantVote = styled.span`
  ${font('headline')};

  color: ${color.blue800};
  text-decoration: none;
`;

type ParticipantStatusProps = {
  canRemove: boolean;
  isActive: boolean;
  isConnected: boolean;
  handleRemove: MouseEventHandler;
  participantName: string;
  shouldDisplayVote: boolean;
  vote: string;
};

function ParticipantStatus({
  canRemove,
  isActive,
  isConnected,
  handleRemove,
  shouldDisplayVote,
  vote,
}: ParticipantStatusProps): ReactElement {
  const StatusIcon = () => (
    <>
      {!isConnected && (
        <SnoozeIcon
          description='This participant has temporarily disconnected'
          xlink='snooze'
        />
      )}
      {Boolean(vote) ? (
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
    </>
  );

  return shouldDisplayVote ? (
    <ParticipantVote>{vote}</ParticipantVote>
  ) : (
    <>
      {isActive && <StatusIcon />}
      {canRemove && (
        <RemoveButton onClick={handleRemove}>
          <RemoveIcon
            description='Click to remove this participant from the session'
            xlink='remove'
          />
        </RemoveButton>
      )}
    </>
  );
}

export default React.memo(ParticipantStatus);
