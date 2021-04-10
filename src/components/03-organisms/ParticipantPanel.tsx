import React, { ReactElement, useCallback, useContext } from 'react';
import styled from '@emotion/styled';
import orderBy from 'lodash/orderBy';

import { SessionContext } from '../../context';
import { emitRemoveParticipant } from '../../services/socket';
import { color } from '../00-base/variables';
import {
  ParticipantList,
  ParticipantName,
  ParticipantStatus,
  ParticipantWrapper,
} from '../02-molecules';
import { CreateTopicForm, NextTopicActions, SessionLobby } from '.';

const Panel = styled.section<{ isHidden: boolean }>`
  background-color: ${color.neutral0};
  min-width: 100%;
  position: absolute;
  right: 0;
  transition: transform 0.25s ease-in-out;

  ${({ isHidden }) => isHidden && 'transform: translateX(101%)'};

  @media screen and (min-width: 768px) {
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
    ownerId,
    participants,
    self,
    sessionId,
    sessionName,
    sessionPhase,
    setSessionContext,
  } = useContext(SessionContext);

  const handleRemove = useCallback(
    (targetParticipantId: string) => {
      emitRemoveParticipant({
        participantId: targetParticipantId,
        sessionId,
      });
    },
    [participants]
  );

  const shouldHidePanel =
    sessionPhase === 'voting' && // Hide the panel so voting form is visible
    self.isActive && // Self is participating in voting on this topic
    !self.vote; // Self has not confirmed their vote (is still voting)

  return (
    <Panel isHidden={shouldHidePanel}>
      {sessionPhase === 'lobby' && (
        <SessionLobby
          participants={participants}
          sessionId={sessionId}
          sessionName={sessionName}
          newTopic={() => setSessionContext({ sessionPhase: 'newTopic' })}
        />
      )}
      {sessionPhase === 'newTopic' ? (
        <CreateTopicForm />
      ) : (
        <ParticipantList>
          {orderBy(participants, ['isActive', 'name'], ['desc', 'asc']).map(
            ({ id, name, isActive, isConnected, vote }) => (
              <ParticipantWrapper
                key={id}
                isMe={id === self.id}
                isActive={isActive}
              >
                <ParticipantName isOwner={id === ownerId} name={name} />
                {(sessionPhase === 'voting' || sessionPhase === 'result') && (
                  <ParticipantStatus
                    canRemove={self.id === ownerId && self.id !== id}
                    isActive={isActive}
                    isConnected={isConnected}
                    key={id}
                    participantName={name}
                    shouldDisplayVote={sessionPhase === 'result'}
                    vote={vote}
                    handleRemove={() => handleRemove(id)}
                  />
                )}
              </ParticipantWrapper>
            )
          )}
        </ParticipantList>
      )}
      {sessionPhase === 'result' && self.id === ownerId && <NextTopicActions />}
    </Panel>
  );
}

export default React.memo(ParticipantPanel);
