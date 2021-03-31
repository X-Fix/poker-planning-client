import React, {
  ButtonHTMLAttributes,
  forwardRef,
  MutableRefObject,
} from 'react';
import styled from '@emotion/styled';
import { color, shadows } from '../00-base/variables';

const { blue800, blue900, neutral0, neutral100, neutral700 } = color;
const { buttonPrimary, buttonSecondary } = shadows;

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  dark?: boolean;
  secondary?: boolean;
  ref?: MutableRefObject<HTMLButtonElement>;
}

const StyledButton = styled.button<ButtonProps>`
  align-items: center;
  background-color: ${({ secondary }) => (secondary ? neutral0 : blue800)};
  border: none;
  border-radius: 2px;
  color: ${({ secondary }) => (secondary ? blue800 : neutral0)};
  cursor: pointer;
  display: inline-flex;
  height: 3rem;
  justify-content: center;
  padding: 0 1rem;

  ${({ dark }) => dark && `background-color: ${blue900};`}

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
      filter: drop-shadow(
        ${({ secondary }) => (secondary ? buttonSecondary : buttonPrimary)}
      );
    }

    & > span {
      text-shadow: ${({ secondary }) =>
        secondary ? buttonSecondary : buttonPrimary};
    }
  }
`;

const Button = forwardRef(
  (
    { children, dark = false, secondary = false, ...props }: ButtonProps,
    ref: MutableRefObject<HTMLButtonElement>
  ) => (
    <StyledButton dark={dark} secondary={secondary} ref={ref} {...props}>
      {children}
    </StyledButton>
  )
);

export default React.memo(Button);
