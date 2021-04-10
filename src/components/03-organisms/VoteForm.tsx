import React, {
  ChangeEvent,
  ReactElement,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import styled from '@emotion/styled';

import { fixedInFooter, font, srOnly } from '../00-base/utils';
import { Icon } from '../01-atoms';
import { Button, PokerCard } from '../02-molecules';
import { SessionContext } from '../../context';
import { emitSetVote } from '../../services/socket';
import { SessionPhase } from '../../types';

const Form = styled.form<{ isActive: boolean }>`
  height: calc(100vh - 8rem);
  outline: none;
  overflow-y: scroll;

  ${({ isActive }) =>
    !isActive &&
    `
    filter: blur(0.1875rem);
    pointer-events: none;
    /* Prevent the blur from spilling into neighbour elements */
    z-index: -1;
  `}
`;

const Topic = styled.h2<{ sessionPhase: SessionPhase }>`
  ${({ sessionPhase }) =>
    fixedInFooter(sessionPhase === 'result' ? 'left' : 'center')};
  ${font('title')};

  box-sizing: border-box;
  font-weight: normal;
  margin-bottom: 1.25rem;
  overflow-x: hidden;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: calc(100vw - 2rem);
`;

const CardsContainer = styled.div`
  align-content: flex-start;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0.5rem 0.125rem;

  @media screen and (min-width: 360px) {
    padding: 1rem 0.5rem 1rem 1rem;
  }

  @media screen and (min-width: 768px) {
    padding: 1.5rem 0.5rem 1.5rem 1.5rem;
  }

  @media screen and (min-width: 57rem) {
    padding: 1.5rem 2.5rem 1.5rem 2rem;
  }
`;

const StyledPokerCard = styled(PokerCard)`
  margin: 0 0 0.25rem;

  @media screen and (min-width: 360px) {
    margin: 0 0.5rem 0.5rem 0;
  }

  @media screen and (min-width: 768px) {
    margin: 0 1rem 1rem 0;
  }
`;

const ConfirmVoteButton = styled(Button)<{ hasSelectedVote: boolean }>`
  ${({ hasSelectedVote }) => !hasSelectedVote && srOnly()};
  ${fixedInFooter('center')};

  margin-bottom: 0.5rem;
`;

const ConfirmVoteButtonText = styled.span`
  ${font('title')};

  margin-left: 0.25rem;
`;

function VoteForm(): ReactElement {
  const { cardSequence, self, sessionId, sessionPhase, topic } = useContext(
    SessionContext
  );
  const cardValues = ['☕', ...cardSequence, '?'];
  const [vote, setVote] = useState('');
  const formRef = useRef<HTMLFormElement>();

  const hasSelectedVote = Boolean(vote);
  const hasConfirmedVote = Boolean(self.vote);
  const shouldShowTopic =
    sessionPhase === 'voting' && self.isActive && !hasSelectedVote;
  const isFormActive =
    sessionPhase === 'voting' && self.isActive && !hasConfirmedVote;

  useEffect(() => {
    if (isFormActive && formRef) {
      console.log('resetting');
      setVote('');
      formRef?.current?.focus();
    }
  }, [isFormActive]);

  const changeVote = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setVote(event.target.value);

      // TODO: If one-touch vote, emitConfirm too
    },
    [vote]
  );

  const confirmVote = useCallback(
    (event) => {
      event.preventDefault();

      emitSetVote({
        sessionId,
        vote,
      });
    },
    [vote]
  );

  return (
    <Form
      onSubmit={confirmVote}
      ref={formRef}
      aria-hidden={!isFormActive}
      aria-describedby='topic'
      isActive={isFormActive}
      tabIndex={isFormActive ? -1 : undefined}
    >
      {shouldShowTopic && (
        <Topic sessionPhase={sessionPhase} title={topic} id='topic'>
          {topic}
        </Topic>
      )}
      <CardsContainer role='group' aria-label='Vote'>
        {cardValues.map((cardValue) => (
          <StyledPokerCard
            key={cardValue}
            value={cardValue}
            onChange={changeVote}
            checked={vote === cardValue}
            disabled={!isFormActive}
          />
        ))}
      </CardsContainer>
      {!hasConfirmedVote && (
        <ConfirmVoteButton
          disabled={!hasSelectedVote || !isFormActive}
          aria-disabled={!hasSelectedVote || !isFormActive}
          hasSelectedVote={hasSelectedVote}
          type='submit'
          wide
        >
          <Icon xlink='confirm' aria-hidden />
          <ConfirmVoteButtonText>Confirm Vote</ConfirmVoteButtonText>
        </ConfirmVoteButton>
      )}
    </Form>
  );
}

export default React.memo(VoteForm);
