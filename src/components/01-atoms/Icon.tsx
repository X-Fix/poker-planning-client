import React, { ReactElement } from 'react';
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

const Icon = ({ description, xlink, ...props }: IconProps): ReactElement => (
  <StyledIcon {...props} aria-label={description} height='16px' width='16px'>
    {description && <title>{description}</title>}
    <use xlinkHref={`#${xlink}`} />
  </StyledIcon>
);

export default React.memo(Icon);
