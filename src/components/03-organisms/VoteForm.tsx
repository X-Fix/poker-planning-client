import React, {
  ChangeEvent,
  ChangeEventHandler,
  ReactElement,
  useCallback,
  useState,
} from 'react';
import styled from '@emotion/styled';

import { fixedInFooter, font, srOnly } from '../00-base/utils';
import { Icon } from '../01-atoms';
import { Button, PokerCard } from '../02-molecules';

const Form = styled.form<{ isActive: boolean }>`
  height: calc(100vh - 8rem);
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

const Heading = styled.h2`
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

const WideButton = styled(Button)<{ hasSelectedOption: boolean }>`
  ${({ hasSelectedOption }) => !hasSelectedOption && srOnly()};
  ${fixedInFooter('center')};

  width: 322px;

  @media screen and (max-width: 359px) {
    width: 288px;
  }
`;

const ButtonText = styled.span`
  ${font('title')};

  margin-left: 0.25rem;
`;

type VoteFormProps = {
  cardSequence: string[];
  heading?: string;
  isActive: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
};

function VoteForm({
  cardSequence,
  heading,
  isActive,
  onChange,
}: VoteFormProps): ReactElement {
  const cardValues = ['☕', ...cardSequence, '?'];

  const [vote, setVote] = useState('');
  const changeHandler = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setVote(event.target.value);
      onChange(event);
    },
    [vote]
  );
  const hasSelectedOption = Boolean(vote);

  return (
    <Form
      aria-hidden={!isActive}
      isActive={isActive}
      tabIndex={!isActive && -1}
    >
      {heading && <Heading>{heading}</Heading>}
      <CardsContainer role='group' aria-label='Vote'>
        {cardValues.map((cardValue) => (
          <StyledPokerCard
            value={cardValue}
            onChange={changeHandler}
            checked={vote === cardValue}
            disabled={!isActive}
          />
        ))}
      </CardsContainer>
      <WideButton
        disabled={!hasSelectedOption || !isActive}
        aria-disabled={!hasSelectedOption || !isActive}
        type='submit'
        hasSelectedOption={hasSelectedOption}
      >
        <Icon xlink='confirm' aria-hidden />
        <ButtonText>Confirm Vote</ButtonText>
      </WideButton>
    </Form>
  );
}

export default React.memo(VoteForm);
