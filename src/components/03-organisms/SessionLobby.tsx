import React, { ReactElement, useContext } from 'react';
import styled from '@emotion/styled';

import { color, shadows } from '../00-base/variables';
import { fixedInFooter, font } from '../00-base/utils';
import { Icon } from '../01-atoms';
import { Button } from '../02-molecules';
import { Participant } from '../../types';
import { SessionContext } from '../../context';

const Lobby = styled.div`
  border-bottom: 0.0625rem solid ${color.neutral200};
  padding: 1rem;
`;

const Heading = styled.h2`
  ${font('headline')};

  font-weight: normal;
  margin: 0.5rem 0;
`;

const Description = styled.p`
  margin: 0 0 1rem;
`;

const LobbyId = styled.dl`
  ${font('title')};

  display: flex;
  margin: 0;

  & > dd {
    color: ${color.blue800};
  }
`;

const CopyButton = styled.button`
  align-items: center;
  background-color: transparent;
  border: none;
  color: ${color.blue800};
  cursor: pointer;
  display: flex;
  margin-bottom: 1.5rem;
  margin-top: 0.25rem;
  padding: 0.25rem;
  width: 100%;
`;

const CopyButtonText = styled.span`
  ${font('title')};

  text-shadow: ${shadows.buttonSecondary};
`;

const CopyButtonIcon = styled(Icon)`
  filter: drop-shadow(${shadows.buttonSecondary});
  margin-right: 0.5rem;
`;

const ParticipantCount = styled.p`
  ${font('title')};

  margin: 0 0 0.25rem;
`;

const NewTopicButton = styled(Button)`
  ${fixedInFooter('center')};

  margin: 0 0.5rem 0.5rem 0;

  @media screen and (min-width: 768px) {
    ${fixedInFooter('right')};
  }
`;

const NewTopicText = styled.span`
  ${font('title')};
`;

const NewTopicIcon = styled(Icon)`
  margin-right: 0.25rem;
`;

type LobbyProps = {
  participants: Participant[];
  sessionId: string;
  sessionName: string;
  newTopic: () => void;
};

const SessionLobby = ({
  participants,
  sessionId,
  sessionName,
  newTopic,
}: LobbyProps): ReactElement => {
  const { self, ownerId } = useContext(SessionContext);

  return (
    <Lobby>
      <Heading title={sessionName}>{sessionName}</Heading>
      <Description>
        {
          'Share the Session ID below with participants you want in this session'
        }
      </Description>
      <LobbyId>
        <dt>Session ID:</dt>
        <dd>{sessionId}</dd>
      </LobbyId>
      <CopyButton>
        <CopyButtonIcon xlink='copy' aria-hidden />
        <CopyButtonText>Copy Session Link</CopyButtonText>
      </CopyButton>
      <ParticipantCount>{`Participants (${participants.length})`}</ParticipantCount>
      {self.id === ownerId && (
        <NewTopicButton wide onClick={newTopic}>
          <NewTopicIcon xlink='create' aria-hidden />
          <NewTopicText>New Topic</NewTopicText>
        </NewTopicButton>
      )}
    </Lobby>
  );
};

export default React.memo(SessionLobby);
