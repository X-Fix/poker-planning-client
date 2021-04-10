import React, {
  ChangeEvent,
  ReactElement,
  useCallback,
  useContext,
  useReducer,
  useState,
} from 'react';
import styled from '@emotion/styled';
import sortBy from 'lodash/sortBy';

import { Participant } from '../../types';
import { SessionContext } from '../../context';
import {
  emitSetParticipantIsActive,
  emitNewTopic,
} from '../../services/socket';
import { color } from '../00-base/variables';
import { fixedInFooter, font } from '../00-base/utils';
import { Icon } from '../01-atoms';
import {
  Button,
  InputSwitch,
  InputText,
  ParticipantList,
  ParticipantWrapper,
} from '../02-molecules';

const TextSection = styled.div`
  border-bottom: 0.0625rem solid ${color.neutral200};
  padding: 1rem;
`;

const Heading = styled.h2`
  ${font('headline')};

  font-weight: normal;
  margin: 0.5rem 0 1.5rem;
`;

const StyledInputText = styled(InputText)`
  & input {
    @media screen and (min-width: 768px) {
      width: 272px;
    }
    @media screen and (min-width: 834px) {
      width: 324px;
    }
  }
`;

const Description = styled.p`
  ${font('title')};

  /* This is much is used just to have the CreateTopicForm.TextSection and SessionLobby components naturally take up the same height */
  margin: 3.25rem 0 0;
`;

const StyledParticipantList = styled(ParticipantList)`
  height: calc(100vh - 15rem - 8rem);
`;

const StyledInputSwitch = styled(InputSwitch)<{ isOwner: boolean }>`
  ${({ isOwner }) => isOwner && 'text-decoration: underline'};
`;

const StartVotingButton = styled(Button)`
  ${fixedInFooter('center')};

  margin-bottom: 0.5rem;
`;

const StartVotingText = styled.span`
  ${font('title')};
`;

const StartVotingIcon = styled(Icon)`
  margin-right: 0.25rem;
`;

type ToggleReducerState = {
  [key: string]: boolean;
};

const getInitialToggleState = (
  participants: Participant[]
): ToggleReducerState => {
  const initialToggleState: ToggleReducerState = {};
  participants.forEach(({ id, isActive }) => {
    initialToggleState[id] = isActive;
  });

  return initialToggleState;
};

const toggleReducer = (
  state: ToggleReducerState,
  action: { value: string; checked: boolean }
) => {
  return {
    ...state,
    [action.value]: action.checked,
  };
};

function CreateTopicForm(): ReactElement {
  const {
    ownerId,
    participants,
    self,
    sessionId,
    setSessionContext,
  } = useContext(SessionContext);

  const [toggleState, setToggleState] = useReducer(
    toggleReducer,
    getInitialToggleState(participants)
  );
  const [topic, setTopic] = useState('');

  const handleChange = useCallback(
    ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
      setTopic(value);
    },
    []
  );

  const handleToggle = useCallback(
    ({ target }: ChangeEvent<HTMLInputElement>) => {
      setToggleState(target);

      emitSetParticipantIsActive({
        isActive: target.checked,
        participantId: target.value,
        sessionId,
      });
    },
    []
  );

  const handleClick = useCallback(
    (event) => {
      event.preventDefault();
      if (!topic) return;

      emitNewTopic({
        sessionId,
        topic,
      });

      // Pre-empt the update locally so response seems more immediate
      setSessionContext({ sessionPhase: 'voting', topic });
    },
    [topic]
  );

  return (
    <form>
      <TextSection>
        <Heading>New Topic</Heading>
        <StyledInputText
          label='User story / task name'
          placeholder='Eg. `TSK-1209`'
          onChange={handleChange}
          value={topic}
        />
        <Description>Who is voting...</Description>
      </TextSection>
      <StyledParticipantList>
        {sortBy(participants, ['name']).map(({ id, name }) => (
          <ParticipantWrapper
            key={id}
            isMe={id === self.id}
            isActive={toggleState[id]}
          >
            <StyledInputSwitch
              label={name}
              name='participants'
              isOwner={id === ownerId}
              checked={toggleState[id]}
              onChange={handleToggle}
              value={id}
            />
          </ParticipantWrapper>
        ))}
      </StyledParticipantList>
      <StartVotingButton
        onClick={handleClick}
        disabled={!Boolean(topic.length)}
        wide
      >
        <StartVotingIcon xlink='start' aria-hidden />
        <StartVotingText>Start Voting</StartVotingText>
      </StartVotingButton>
    </form>
  );
}

export default React.memo(CreateTopicForm);
