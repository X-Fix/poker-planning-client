import React, { ReactElement } from 'react';
import styled from '@emotion/styled';

import { font } from '../00-base/utils';

const StyledName = styled.span<{ isOwner?: boolean }>`
  ${font('body')};

  flex: 1;

  ${({ isOwner }) =>
    isOwner &&
    `
    text-decoration: underline;
  `}
`;

type ParticipantNameProps = {
  name: string;
  isOwner?: boolean;
};

const ParticipantName = ({
  isOwner,
  name,
}: ParticipantNameProps): ReactElement => (
  <StyledName isOwner={isOwner}>{name}</StyledName>
);

export default React.memo(ParticipantName);
