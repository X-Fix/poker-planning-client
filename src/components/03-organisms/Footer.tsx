import React, { ReactElement, useContext } from 'react';
import styled from '@emotion/styled';

import { SessionContext } from '../../context';
import { fixedInFooter, font, srOnly } from '../00-base/utils';
import { color, shadows } from '../00-base/variables';
import { Icon } from '../01-atoms';
import { Button } from '../02-molecules';
import { NextTopicActions } from '.';

const StyledFooter = styled.footer`
  align-items: center;
  background-color: ${color.neutral0};
  bottom: 0;
  box-shadow: ${shadows.footer};
  box-sizing: border-box;
  display: flex;
  height: 4rem;
  justify-content: center;
  padding: 0 1rem;
  position: fixed;

  /* Ensure this fixed element remains centered on screens wider than its max-width */
  left: 50%; /* stylelint-disable-line order/properties-alphabetical-order */
  transform: translateX(-50%);

  /* Span the screen width until a certain point */
  max-width: 64rem; /* stylelint-disable-line order/properties-alphabetical-order */
  width: 100%;
`;

const Topic = styled.h2<{ hasOwnerActions: boolean; isOwner: boolean }>`
  ${fixedInFooter('center')};
  ${font('title')};
  ${({ isOwner, hasOwnerActions }) =>
    isOwner && hasOwnerActions
      ? `
      left: 0;
      margin-left: 1rem;
      text-align: left;
      transform: none;
      width: calc(50vw - 2rem);
    `
      : `
      text-align: center;
      width: calc(100vw - 2rem);
    `}

  box-sizing: border-box;
  font-weight: normal;
  margin-bottom: 1.25rem;
  overflow-x: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media screen and (max-width: 767px) {
    ${({ isOwner }) => isOwner && srOnly()};
  }
`;

const NewTopicButton = styled(Button)`
  bottom: 0;
  left: 50%;
  margin: 0 0.5rem 0.5rem 0;
  position: fixed;
  transform: translateX(-50%);

  @media screen and (min-width: 48rem) {
    left: unset;
    right: 0;
    transform: none;
  }
`;

const NewTopicText = styled.span`
  ${font('title')};
`;

const NewTopicIcon = styled(Icon)`
  margin-right: 0.25rem;
`;

const Footer = (): ReactElement => {
  const { ownerId, self, sessionPhase, topic, setSessionContext } = useContext(
    SessionContext
  );
  const topicText = topic || 'Waiting for topic...';

  /**
   * isOwner refers to this client in particular
   */
  const isOwner = ownerId === self.id;

  /**
   * This isn't every case when the session owner has Actions (New Topic button, Redo/New Vote
   * button group, etc) available to them, just the times the Topic needs to share space in the
   * footer with the Actions
   */
  const hasOwnerActions = sessionPhase === 'lobby' || sessionPhase === 'result';

  /**
   * These are basically all the times the Topic should be displayed, but isn't being displayed as
   * the VoteForm heading (cos the VoteForm is inactive, or whatever reason)
   */
  const shouldShowTopic =
    sessionPhase === 'lobby' ||
    sessionPhase === 'result' ||
    (sessionPhase === 'voting' && (!self.isActive || Boolean(self.vote)));

  return (
    <StyledFooter>
      {shouldShowTopic && (
        <Topic
          hasOwnerActions={hasOwnerActions}
          isOwner={isOwner}
          title={topicText}
        >
          {topicText}
        </Topic>
      )}
      {isOwner && sessionPhase === 'lobby' && (
        <NewTopicButton
          wide
          onClick={() => setSessionContext({ sessionPhase: 'newTopic' })}
        >
          <NewTopicIcon xlink='create' aria-hidden />
          <NewTopicText>New Topic</NewTopicText>
        </NewTopicButton>
      )}
      {sessionPhase === 'result' && self.id === ownerId && <NextTopicActions />}
    </StyledFooter>
  );
};

export default React.memo(Footer);
