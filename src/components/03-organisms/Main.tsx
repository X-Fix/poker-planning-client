import React, { ReactElement } from 'react';
import styled from '@emotion/styled';

type MainProps = {
  children: ReactElement | ReactElement[];
  className?: string;
};

const StyledMain = styled.main`
  box-sizing: border-box;
  display: flex;
  height: 100vh;
  margin: 0 auto;
  max-width: 64rem;
  overflow: hidden;
  padding: 4rem 0;
  position: relative;
  width: 100%;
`;

const Main: React.FC<MainProps> = ({ children, className }) => (
  <StyledMain className={className}>{children}</StyledMain>
);

export default React.memo(Main);
