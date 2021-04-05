import React, { ReactElement } from 'react';
import styled from '@emotion/styled';

import { font } from '../00-base/utils';

const StyledName = styled.span`
  ${font('body')};

  flex: 1;
`;

type ParticipantNameProps = {
  name: string;
};

const ParticipantName = ({ name }: ParticipantNameProps): ReactElement => (
  <StyledName>{name}</StyledName>
);

export default React.memo(ParticipantName);
