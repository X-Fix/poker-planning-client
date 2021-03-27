import React from 'react';
import styled from '@emotion/styled';

import { color, shadows } from '../00-base/variables';
import { font } from '../00-base/utils';

type ChatBubbleProps = {
  isSelf?: boolean;
  message: string;
  participant: string;
};

const { blue50, blue900, neutral100 } = color;
const { chatBubble } = shadows;

const ChatBubble: React.FC<ChatBubbleProps> = ({
  isSelf = false,
  message,
  participant,
}) => {
  const Container = styled.li`
    ${font('body')};

    background-color: ${neutral100};
    border-radius: 8px;
    box-shadow: 1px 1px 0 ${chatBubble};
    margin: 0 1.5rem 0.5rem 1rem;
    padding: 0.5rem;
    position: relative; /* Necessary to use position: absolute; in pseudo-elements */

    &::before {
      border-bottom: 8px solid ${neutral100};
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
      border-bottom: 1px solid ${chatBubble};
      border-left: 1px solid transparent;
      border-right: 1px solid transparent;
      bottom: -1px;
      content: '';
      height: 0;
      left: -8px;
      position: absolute;
      width: 16px;
    }

    ${isSelf &&
    `
      background-color: ${blue50}
      margin: 0 1rem 0.5rem 1.5rem;

      &::before {
        border-bottom: 8px solid ${blue50};
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
    color: ${blue900};
    display: block;
    margin-bottom: 0.25rem;
  `;

  return (
    <Container>
      <Participant>{participant}</Participant>
      {message}
    </Container>
  );
};

export default ChatBubble;
