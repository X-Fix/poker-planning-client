import React, { ReactElement } from 'react';
import styled from '@emotion/styled';

import { CreateSessionForm, Header, Main } from '../03-organisms';

const StyledMain = styled(Main)`
  align-items: center;
  overflow-y: scroll;
  padding-bottom: 0;
`;

const CreateSessionPage = (): ReactElement => (
  <>
    <Header />
    <StyledMain>
      <CreateSessionForm />
    </StyledMain>
  </>
);

export default CreateSessionPage;
