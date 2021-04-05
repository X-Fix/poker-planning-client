import React, { ReactElement } from 'react';
import styled from '@emotion/styled';
import { color } from '../00-base/variables';

const Wrapper = styled.li<ParticipantProps>`
  align-items: center;
  border-bottom: 0.0625rem solid ${color.neutral200};
  box-sizing: border-box;
  display: flex;
  height: 4.5rem;
  justify-content: space-between;
  padding: 0 1rem;

  ${({ isMe }) =>
    isMe &&
    `
    border-left: 0.5rem solid ${color.blue800};
    padding-left: 0.5rem;
  `}

  ${({ isOutlier }) =>
    isOutlier &&
    `
    border-right: 0.5rem solid ${color.neutral200};
    padding-right: 0.5rem;
  `}

  ${({ isOwner }) =>
    isOwner &&
    `
    text-decoration: underline;
  `}

  ${({ isActive }) =>
    !isActive &&
    `
    color: ${color.neutral700};
  `}
`;

type ParticipantProps = {
  children: ReactElement;
  isActive?: boolean;
  isMe?: boolean;
  isOutlier?: boolean;
  isOwner?: boolean;
};

const ParticipantWrapper: React.FC<ParticipantProps> = ({
  children,
  ...props
}): ReactElement => <Wrapper {...props}>{children}</Wrapper>;

export default React.memo(ParticipantWrapper);
