// https://inclusive-components.design/toggle-button/
import React, {
  ButtonHTMLAttributes,
  forwardRef,
  MutableRefObject,
  ReactElement,
  useState,
} from 'react';
import styled from '@emotion/styled';

import { color, shadows } from '../00-base/variables';
import { font } from '../00-base/utils';

interface ButtonToggleProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> {
  className?: string;
  initialState?: boolean;
  label: string;
  onChange: ({ state, value }: { state: boolean; value: string }) => void;
  ref: MutableRefObject<HTMLButtonElement>;
  role?: 'button' | 'menuitem';
  value: string;
}

const Button = styled.button`
  align-items: center;
  background-color: ${color.neutral0};
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  padding: 0;
  position: relative; /* Allow 'position: absolute' children to scroll with this element */
  width: 100%;
`;

const Label = styled.span`
  ${font('body')};

  height: 1.125rem;
  margin: 0;
`;

const Switch = styled.span`
  align-items: center;
  display: flex;
  height: 1.5rem;
  justify-content: center;
  width: 3rem;

  &::before {
    background-color: ${color.neutral300};
    border-radius: 0.375rem;
    content: '';
    display: block;
    height: 0.75rem;
    transition: all 0.15s cubic-bezier(0.4, 0, 0.6, 1);
    width: 2.5rem;

    ${Button}[aria-pressed="true"] & {
      background-color: ${color.blue700};
    }
  }

  &::after {
    background-color: ${color.neutral0};
    border-radius: 50%;
    box-shadow: ${shadows.secondary};
    content: '';
    height: 1.5rem;
    position: absolute;
    transform: translateX(-0.75rem);
    transition: all 0.15s cubic-bezier(0.4, 0, 0.6, 1);
    width: 1.5rem;

    ${Button}[aria-pressed="true"] & {
      background-color: ${color.blue800};
      transform: translateX(0.75rem);
    }
  }
`;

const ButtonToggle = forwardRef(
  (
    {
      initialState = false,
      label,
      onChange,
      role = 'button',
      value,
      ...props
    }: ButtonToggleProps,
    ref: MutableRefObject<HTMLButtonElement>
  ): ReactElement => {
    const [state, setState] = useState(initialState);
    const toggleState = () => {
      setState(!state);
      typeof onChange === 'function' && onChange({ state: !state, value });
    };

    return (
      <Button
        aria-pressed={state}
        onClick={toggleState}
        role={role}
        type='button'
        value={value}
        ref={ref}
        {...props}
      >
        <Label>{label}</Label>
        <Switch aria-hidden />
      </Button>
    );
  }
);

export default ButtonToggle;
