import React, { ButtonHTMLAttributes } from 'react';
import styled from '@emotion/styled';
import { color, shadows } from '../00-base/variables';

const { blue800, blue900, neutral0, neutral100, neutral700 } = color;
const { buttonPrimary, buttonSecondary } = shadows;

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isDark?: boolean;
  buttonStyle?: 'header' | 'primary' | 'secondary' | 'square' | 'wide';
}

const Button: React.FC<ButtonProps> = ({
  children,
  isDark = false,
  buttonStyle = 'primary',
  ...props
}) => {
  const StyledButton = styled.button`
    align-items: center;
    background-color: ${buttonStyle === 'secondary' ? neutral0 : blue800};
    border: none;
    border-radius: 2px;
    color: ${buttonStyle === 'secondary' ? blue800 : neutral0};
    cursor: pointer;
    display: inline-flex;
    height: 3rem;
    justify-content: center;
    padding: 0 1rem;

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
          ${buttonStyle === 'secondary' ? buttonSecondary : buttonPrimary}
        );
      }

      & > span {
        text-shadow: ${buttonStyle === 'secondary'
          ? buttonSecondary
          : buttonPrimary};
      }
    }

    ${isDark &&
    `
      background-color: ${blue900};
    `}

    ${buttonStyle === 'wide' &&
    `
      width: 322px;
    `}

    ${buttonStyle === 'header' &&
    `
      @media screen and (max-width: 767px) {
        border-radius: 50%;
        padding: 0.5rem;
      }

      @media screen and (min-width: 768px) {
        height: 2.5rem;
      }
    `}

    ${buttonStyle === 'square' &&
    `
      border-radius: 16px;
      display: inline;
      height: 160px;
      padding: 1rem;
      width: 160px;

      @media screen and (min-width: 768px) {
        height: 2.5rem;
      }
    `}
  `;

  return <StyledButton {...props}>{children}</StyledButton>;
};

export default React.memo(Button);
