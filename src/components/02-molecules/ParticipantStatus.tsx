import React, { ReactElement } from 'react';
import styled from '@emotion/styled';

import { Icon } from '../01-atoms';
import { color } from '../00-base/variables';

const SnoozeIcon = styled(Icon)`
  color: ${color.neutral200};
`;

const BusyIcon = styled(Icon)`
  color: ${color.neutral900};
`;

const DoneIcon = styled(Icon)`
  color: ${color.green700};
`;

type ParticipantStatusProps = {
  hasVoted: boolean;
  isDisconnected: boolean;
};

const ParticipantStatus = ({
  isDisconnected,
  hasVoted,
}: ParticipantStatusProps): ReactElement => (
  <>
    {isDisconnected && (
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
        description='This participant is still busy voting'
        xlink='busy'
      />
    )}
  </>
);

export default ParticipantStatus;
