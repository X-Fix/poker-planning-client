import React, { ReactElement, useContext } from 'react';
import styled from '@emotion/styled';
import { orderBy } from 'lodash';

import { SessionContext } from '../../context';
import { color } from '../00-base/variables';
import { ParticipantList, ParticipantListItem } from '../02-molecules';
import { CreateTopicForm, SessionLobby } from '.';

const Panel = styled.section<{ isHiddenOnSmallScreens: boolean }>`
  background-color: ${color.neutral0};
  min-width: 100%;
  position: absolute;
  right: 0;
  transition: transform 0.25s ease-in-out;

  ${({ isHiddenOnSmallScreens }) =>
    isHiddenOnSmallScreens && 'transform: translateX(101%)'};

  @media screen and (min-width: 48rem) {
    min-width: 19rem;
    position: static;
    transform: none;
  }

  @media screen and (min-width: 52.125rem) {
    min-width: 22.5rem;
  }
`;

function ParticipantPanel(): ReactElement {
  const {
    participants,
    self,
    sessionId,
    sessionName,
    sessionPhase,
  } = useContext(SessionContext);

  const isPanelHiddenOnSmallScreens =
    sessionPhase === 'voting' && // Hide the panel when voting...
    self.isActive && // if Self is participating in voting on this topic...
    !self.vote; // and Self is still voting

  return (
    <Panel isHiddenOnSmallScreens={isPanelHiddenOnSmallScreens}>
      {sessionPhase === 'lobby' && (
        <SessionLobby
          participants={participants}
          sessionId={sessionId}
          sessionName={sessionName}
        />
      )}
      {sessionPhase === 'newTopic' ? (
        <CreateTopicForm />
      ) : (
        <ParticipantList>
          {orderBy(participants, ['isActive', 'name'], ['desc', 'asc']).map(
            (participant) => (
              <ParticipantListItem
                key={participant.id}
                participant={participant}
              />
            )
          )}
        </ParticipantList>
      )}
    </Panel>
  );
}

export default ParticipantPanel;
