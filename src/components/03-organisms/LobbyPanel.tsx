import React, { ReactElement } from 'react';
import styled from '@emotion/styled';

import { Participant, Session } from '../../types';
import { color, shadows } from '../00-base/variables';
import { Icon } from '../01-atoms';
import {
  Button,
  ParticipantList,
  ParticipantName,
  ParticipantWrapper,
} from '../02-molecules';
import { fixedInFooter, font } from '../00-base/utils';

const Panel = styled.section`
  background-color: ${color.neutral0};
  min-width: 100%;
  position: absolute;
  right: 0;

  /* transform: translateX(101%); */

  transform: none;
  transition: transform 0.25s ease-in-out;

  @media screen and (min-width: 768px) {
    min-width: 19rem;
    position: static;
    transform: none;
  }

  @media screen and (min-width: 52.125rem) {
    min-width: 22.5rem;
  }
`;

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

const NewVoteButton = styled(Button)`
  ${fixedInFooter('center')}

  bottom: 0.5rem;
  width: 322px;

  @media screen and (max-width: 359px) {
    width: 288px;
  }
`;

const NewVoteText = styled.span`
  ${font('title')};
`;

const NewVoteIcon = styled(Icon)`
  margin-right: 0.25rem;
`;

type LobbyPanelProps = {
  ownerId: string;
  participantId: string;
  participants: Participant[];
  sessionId: string;
  sessionName: string;
  transitionState: () => void;
};

function LobbyPanel({
  ownerId,
  participantId,
  participants,
  sessionId,
  sessionName,
  transitionState,
}: LobbyPanelProps): ReactElement {
  return (
    <Panel>
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
      </Lobby>
      <ParticipantList>
        {participants.map(({ id, name, socketId }) => (
          <ParticipantWrapper
            key={id}
            isMe={id === participantId}
            isOwner={id === ownerId}
            isActive={Boolean(socketId)}
          >
            <ParticipantName name={name} />
          </ParticipantWrapper>
        ))}
      </ParticipantList>
      <NewVoteButton onClick={transitionState}>
        <NewVoteIcon xlink='create' aria-hidden />
        <NewVoteText>New Vote</NewVoteText>
      </NewVoteButton>
    </Panel>
  );
}

export default React.memo(LobbyPanel);
