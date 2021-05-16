import React, { ReactElement } from 'react';
import styled from '@emotion/styled';

import { color } from '../00-base/variables';

type WrapperProps = {
  isActive: boolean;
  isSelf: boolean;
  isOutlier?: boolean;
};

const Wrapper = styled.li<WrapperProps>`
  align-items: center;
  border-bottom: 0.0625rem solid ${color.neutral200};
  box-sizing: border-box;
  display: flex;
  height: 4.5rem;
  justify-content: space-between;
  padding: 0 1rem;

  ${({ isSelf }) =>
    isSelf &&
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

  ${({ isActive }) =>
    !isActive &&
    `
    color: ${color.neutral600};
    font-style: italic;
  `}
`;

type ParticipantWrapperProps = WrapperProps & {
  children: ReactElement | ReactElement[];
};

const ParticipantWrapper: React.FC<ParticipantWrapperProps> = ({
  children,
  ...props
}): ReactElement => <Wrapper {...props}>{children}</Wrapper>;

export default ParticipantWrapper;
