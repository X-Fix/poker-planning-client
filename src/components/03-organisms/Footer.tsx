import React, { ReactElement } from 'react';
import styled from '@emotion/styled';
import { color, shadows } from '../00-base/variables';

const StyledFooter = styled.footer`
  align-items: center;
  background-color: ${color.neutral0};
  bottom: 0;
  box-shadow: ${shadows.footer};
  box-sizing: border-box;
  display: flex;
  height: 4rem;
  justify-content: center;
  padding: 0 1rem;
  position: fixed;

  /* Ensure this fixed element remains centered on screens wider than its max-width */
  left: 50%; /* stylelint-disable-line order/properties-alphabetical-order */
  transform: translateX(-50%);

  /* Span the screen width until a certain point */
  width: 100%;
  max-width: 64rem; /* stylelint-disable-line order/properties-alphabetical-order */
`;

const Footer = (): ReactElement => <StyledFooter />;

export default React.memo(Footer);
