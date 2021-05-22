import React, {
  ButtonHTMLAttributes,
  forwardRef,
  MutableRefObject,
} from 'react';
import styled from '@emotion/styled';
import { color, shadows } from '../00-base/variables';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  dark?: boolean;
  secondary?: boolean;
  wide?: boolean;
  ref?: MutableRefObject<HTMLButtonElement>;
}

const StyledButton = styled.button<ButtonProps>`
  align-items: center;
  background-color: ${({ secondary }) =>
    secondary ? color.neutral0 : color.blue800};
  border: none;
  border-radius: 2px;
  color: ${({ secondary }) => (secondary ? color.blue800 : color.neutral0)};
  cursor: pointer;
  display: inline-flex;
  height: 3rem;
  justify-content: center;
  padding: 0 1rem;

  ${({ dark }) => dark && `background-color: ${color.blue900};`}
  ${({ wide }) =>
    wide &&
    `
    width: 322px;

    @media screen and (max-width: 359px) {
      width: 288px;
    }
  `}

  &:disabled {
    background-color: ${color.neutral100};
    color: ${color.neutral700};
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
        ${({ secondary }) =>
          secondary ? shadows.buttonSecondary : shadows.buttonPrimary}
      );
    }

    & > span {
      text-shadow: ${({ secondary }) =>
        secondary ? shadows.buttonSecondary : shadows.buttonPrimary};
    }
  }
`;

const Button = forwardRef(
  (
    {
      children,
      dark = false,
      secondary = false,
      wide = false,
      ...props
    }: ButtonProps,
    ref: MutableRefObject<HTMLButtonElement>
  ) => (
    <StyledButton
      dark={dark}
      secondary={secondary}
      wide={wide}
      ref={ref}
      {...props}
    >
      {children}
    </StyledButton>
  )
);

export default Button;
