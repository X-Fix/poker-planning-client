import React, { ReactElement, useCallback, useContext } from 'react';
import styled from '@emotion/styled';

import { SessionContext } from '../../context';
import { emitNewTopic } from '../../services/socket';
import { font } from '../00-base/utils';
import { Icon } from '../01-atoms';
import { Button } from '../02-molecules';

const Actions = styled.div`
  box-sizing: border-box;
  display: flex;
  height: 4rem;
  padding: 0.5rem 0.5rem 0.5rem 0;
  position: fixed;
  right: 0;

  @media screen and (max-width: 767px) {
    background-color: #fff;
    justify-content: space-evenly;
    width: 100vw;
  }
`;

const ButtonText = styled.span`
  ${font('title')};

  margin-left: 0.25rem;

  /**
   * Weird breakpoint here is to allow a little more room for the button texts to breathe before
   * increasing the spacing to the default button settings
   */
  @media screen and (max-width: 366px) {
    ${font('body')};
  }
`;

const ReversedIcon = styled(Icon)`
  transform: scaleX(-1);
`;

function NextTopicActions(): ReactElement {
  const { sessionId, topic, setSessionContext } = useContext(SessionContext);

  const onRedoVote = useCallback(() => {
    emitNewTopic({
      sessionId,
      topic,
    });

    setSessionContext({ sessionPhase: 'voting' });
  }, []);

  const onNewTopic = useCallback(() => {
    setSessionContext({ sessionPhase: 'newTopic' });
  }, []);

  return (
    <Actions>
      <Button secondary onClick={onRedoVote}>
        <ReversedIcon xlink='redo' aria-hidden />
        <ButtonText>Redo Vote</ButtonText>
      </Button>
      <Button onClick={onNewTopic}>
        <Icon xlink='create' />
        <ButtonText>New Topic</ButtonText>
      </Button>
    </Actions>
  );
}

export default NextTopicActions;
