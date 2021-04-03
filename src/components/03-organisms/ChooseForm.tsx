import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';

import { color, shadows } from '../00-base/variables';
import { font } from '../00-base/utils';
import { Icon } from '../01-atoms';

const { blue800, neutral0, neutral50, neutral100, neutral700 } = color;
const { buttonPrimary, primary } = shadows;

const Navigation = styled.nav`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  width: 100%;

  @media screen and (orientation: landscape) {
    flex-direction: row;
  }
`;

const StyledLink = styled(Link)`
  background-color: ${blue800};
  border-radius: 16px;
  box-shadow: ${primary};
  box-sizing: border-box;
  color: ${neutral0};
  cursor: pointer;
  height: 160px;
  margin: 40px;
  padding: 1rem;
  text-align: center;
  text-decoration: none;
  width: 160px;

  &:disabled {
    background-color: ${neutral100};
    color: ${neutral700};
    cursor: default;
  }

  &:not(:disabled) {
    &:hover {
      background-image: linear-gradient(
        0deg,
        rgba(255, 255, 255, 0.05),
        rgba(255, 255, 255, 0.05)
      );
    }

    &:active {
      background-image: linear-gradient(
        0deg,
        rgba(0, 0, 0, 0.05),
        rgba(0, 0, 0, 0.05)
      );
    }

    & > svg {
      filter: drop-shadow(${buttonPrimary});
    }

    & > span {
      text-shadow: ${buttonPrimary};
    }
  }
`;

const HugeIcon = styled(Icon)`
  height: 6.125rem;
  width: 6.125rem;
`;

const ButtonText = styled.span`
  ${font('body')};

  display: block;
  margin: 0.25rem auto 0;
`;

const ChooseForm = (): ReactElement => (
  <Navigation>
    <StyledLink to='/create-session'>
      <HugeIcon xlink='create' aria-hidden />
      <ButtonText>Create Session</ButtonText>
    </StyledLink>
    <StyledLink to='/join-session'>
      <HugeIcon xlink='join' aria-hidden />
      <ButtonText>Join Session</ButtonText>
    </StyledLink>
  </Navigation>
);

export default React.memo(ChooseForm);
