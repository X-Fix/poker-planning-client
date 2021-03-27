import React from 'react';
import styled from '@emotion/styled';

type IconProps = {
  'aria-hidden'?: boolean;
  description?: string;
  xlink: string;
};

const StyledIcon = styled.svg`
  fill: currentColor;
  height: 2rem;
  width: 2rem;
`;

const Icon: React.FC<IconProps> = ({ description, xlink, ...props }) => {
  return (
    <StyledIcon {...props} aria-label={description}>
      {description && <title>{description}</title>}
      <use xlinkHref={`#${xlink}`} />
    </StyledIcon>
  );
};

export default Icon;
