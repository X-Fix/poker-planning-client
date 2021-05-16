import React, { ReactElement } from 'react';
import styled from '@emotion/styled';

import { Header, JoinSessionForm, Main } from '../03-organisms';

const StyledMain = styled(Main)`
  align-items: center;
`;

const JoinSessionPage = (): ReactElement => (
  <>
    <Header />
    <StyledMain>
      <JoinSessionForm />
    </StyledMain>
  </>
);

export default JoinSessionPage;
