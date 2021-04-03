import React, { ReactElement } from 'react';
import styled from '@emotion/styled';

import { ChooseForm, Main, Header } from '../03-organisms';

const StyledMain = styled(Main)`
  padding-bottom: 0;
`;

const HomePage = (): ReactElement => (
  <>
    <Header />
    <StyledMain>
      <ChooseForm />
    </StyledMain>
  </>
);

export default React.memo(HomePage);
