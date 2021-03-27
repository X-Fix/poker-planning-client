import React, { InputHTMLAttributes } from 'react';
import styled from '@emotion/styled';

import { color, fontSize, shadows } from '../00-base/variables';

const { blue800, neutral0, neutral200, neutral900 } = color;
const { title } = fontSize;
const { tertiary } = shadows;

interface InputTextProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'placeholder' | 'type'> {
  label: string;
  placeholder: string; // Manually including here to ensure it is required
}

const InputText: React.FC<InputTextProps> = ({ label, ...props }) => {
  const Field = styled.label`
    display: block;
  `;

  const Label = styled.p`
    font-size: ${title};
    line-height: ${title};
    margin: 0 0 0.5rem;
  `;

  const Input = styled.input`
    background-color: ${neutral0};
    border: 1px solid ${neutral200};
    border-radius: 2px;
    box-shadow: ${tertiary};
    box-sizing: border-box;
    color: ${neutral900};
    font-size: ${title};
    height: 3rem;
    line-height: ${title};

    /* Placeholder text won't vertically align middle on Firefox so have to go with this weird top/bottom padding */
    padding: 0.75rem 1rem;
    text-align: left;
    width: 324px;

    &:hover,
    &:focus {
      border-color: ${blue800};
    }

    &::placeholder {
      color: ${neutral200};
      font-size: ${title};
      line-height: ${title};
      margin: 0;
    }
  `;

  return (
    <Field>
      <Label>{label}</Label>
      <Input type='text' {...props} />
    </Field>
  );
};

export default InputText;