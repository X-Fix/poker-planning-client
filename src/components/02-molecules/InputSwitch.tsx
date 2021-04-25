import React, { InputHTMLAttributes, ReactElement } from 'react';
import styled from '@emotion/styled';

import { font, srOnly } from '../00-base/utils';
import { color, shadows } from '../00-base/variables';

const { blue700, blue800, neutral0, neutral300 } = color;
const { secondary } = shadows;

interface InputSwitchProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string;
  name: string;
}

const Field = styled.label`
  align-items: center;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const Label = styled.p`
  ${font('body')};

  height: 1.125rem;
  margin: 0;
`;

const Input = styled.input`
  ${srOnly()}
`;

const Switch = styled.span`
  /*
    Make the span element large enough to contain the pseudo-elements so the :focus outline
    surrounds everything. Center the children to make translating the pseudo-elements easier
  */
  align-items: center;
  display: flex;
  height: 24px;
  justify-content: center;
  position: relative;
  width: 48px;

  &::before {
    background-color: ${neutral300};
    border-radius: 6px;
    content: '';
    display: block;
    height: 12px;
    transition: all 0.15s cubic-bezier(0.4, 0, 0.6, 1);
    width: 40px;
  }

  &::after {
    background-color: ${neutral0};
    border-radius: 50%;
    box-shadow: ${secondary};
    content: '';
    height: 24px;
    position: absolute;
    transform: translateX(-12px);
    transition: all 0.15s cubic-bezier(0.4, 0, 0.6, 1);
    width: 24px;
  }

  ${Input}:focus + & {
    /*
      Copy default outline behavior to the custom switch
      https://ghinda.net/article/mimic-native-focus-css/
    */
    outline-color: Highlight;
    outline-color: -webkit-focus-ring-color;
    outline-style: auto;
    outline-width: 3px;
  }

  ${Input}:checked + & {
    &::before {
      background-color: ${blue700};
    }

    &::after {
      background-color: ${blue800};
      transform: translateX(12px);
    }
  }
`;

const InputSwitch = ({
  className,
  label,
  ...props
}: InputSwitchProps): ReactElement => (
  <Field className={className}>
    <Label>{label}</Label>
    <Input type='checkbox' {...props} />
    <Switch aria-hidden />
  </Field>
);

export default React.memo(InputSwitch);
