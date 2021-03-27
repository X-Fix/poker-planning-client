import React, { HtmlHTMLAttributes } from 'react';
import styled from '@emotion/styled';

import { srOnly } from '../00-base/utils';
import { color, fontSize, shadows } from '../00-base/variables';

const { blue800, neutral0 } = color;
const { body } = fontSize;
const { primary, tertiary } = shadows;

interface InputRadioProps
  extends Omit<HtmlHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string;
  name: string;
}

const Field = styled.label`
  align-items: center;
  cursor: pointer;
  display: flex;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  ${srOnly()}
`;

const Radio = styled.span`
  /*
    Make the span element large enough to contain the pseudo-elements so the :focus outline
    surrounds everything. Center the children to make translating the pseudo-elements easier
  */
  align-items: center;
  display: flex;
  height: 24px;
  justify-content: center;
  margin-right: 0.5rem;
  width: 24px;

  &::before {
    background: ${neutral0};
    border: 1px solid ${blue800};
    border-radius: 50%;
    box-shadow: ${tertiary};
    box-sizing: border-box;
    content: '';
    display: block;
    height: 24px;
    width: 24px;
  }

  &::after {
    background: ${neutral0};
    border-radius: 50%;
    content: '';
    display: block;
    filter: drop-shadow(${primary});
    height: 12px;
    opacity: 0;
    position: absolute;
    width: 12px;
  }

  input[type='radio']:focus + & {
    /*
      Copy default outline behavior to the custom radio
      https://ghinda.net/article/mimic-native-focus-css/
    */
    outline-color: Highlight;
    outline-color: -webkit-focus-ring-color;
    outline-style: auto;
    outline-width: 3px;
  }

  input[type='radio']:checked + & {
    &::before {
      background: ${blue800};
      border: none;

      /* Only animate on the way in */
      transition: all 0.15s cubic-bezier(0.4, 0, 0.6, 1);
    }

    &::after {
      opacity: 1;

      /* Only animate on the way in */
      transition: all 0.15s cubic-bezier(0.4, 0, 0.6, 1);
    }
  }
`;

const Label = styled.p`
  font-size: ${body};
  height: ${body};
  line-height: ${body};
  margin: 0;
`;

const InputRadio: React.FC<InputRadioProps> = ({ label, name, ...props }) => {
  return (
    <Field>
      <Input type='radio' name={name} {...props} />
      <Radio aria-hidden />
      <Label>{label}</Label>
    </Field>
  );
};

export default InputRadio;
