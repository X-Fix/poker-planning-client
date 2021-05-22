import React, { ReactElement } from 'react';
import styled from '@emotion/styled';

import { color, shadows } from '../00-base/variables';
import { font } from '../00-base/utils';

type ContainerProps = {
  self?: boolean;
};

type ChatBubbleProps = {
  message: string;
  participant: string;
} & ContainerProps;

const Container = styled.li<ContainerProps>`
  ${font('body')};

  background-color: ${color.neutral100};
  border-radius: 8px;
  box-shadow: 1px 1px 0 ${shadows.chatBubble};
  margin: 0 1.5rem 0.5rem 1rem;
  padding: 0.5rem;
  position: relative; /* Necessary to use position: absolute; in pseudo-elements */

  &::before {
    border-bottom: 8px solid ${color.neutral100};
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-style: solid;
    border-top: 0 solid transparent;
    bottom: 0;
    content: '';
    height: 0;
    left: -8px;
    position: absolute;
    width: 0;
    z-index: 1;
  }

  &::after {
    border-bottom: 1px solid ${shadows.chatBubble};
    border-left: 1px solid transparent;
    border-right: 1px solid transparent;
    bottom: -1px;
    content: '';
    height: 0;
    left: -8px;
    position: absolute;
    width: 16px;
  }

  ${({ self }) =>
    self &&
    `
    background-color: ${color.blue50}
    margin: 0 1rem 0.5rem 1.5rem;

    &::before {
      border-bottom: 8px solid ${color.blue50};
      left: auto;
      right: -8px;
    }

    &::after {
      left: auto;
      right: -9px;
    }
  `}
`;

const Participant = styled.span`
  color: ${color.blue900};
  display: block;
  margin-bottom: 0.25rem;
`;

const ChatBubble = ({
  self = false,
  message,
  participant,
}: ChatBubbleProps): ReactElement => (
  <Container self={self}>
    <Participant>{participant}</Participant>
    {message}
  </Container>
);

export default ChatBubble;
