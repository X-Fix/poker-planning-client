import React from 'react';
import styled from '@emotion/styled';
import { fontSize } from './variables';

type FontProps = {
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  size: 'body' | 'title' | 'headline' | 'cardSmall' | 'cardLarge';
};

const Font: React.FC<FontProps> = ({ children, tag = 'span', size }) => {
  const StyledTag = styled[tag]`
    font-size: ${fontSize[size]};
    line-height: ${fontSize[size]};
  `;

  return <StyledTag>{children}</StyledTag>;
};

export default Font;
