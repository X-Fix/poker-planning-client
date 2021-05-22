import React, { InputHTMLAttributes, ReactElement } from 'react';
import styled from '@emotion/styled';

import { color, shadows } from '../00-base/variables';
import { font } from '../00-base/utils';

interface InputTextProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'placeholder' | 'type'> {
  label: string;
  placeholder: string; // Manually including here to ensure it is required
}

const Field = styled.label`
  display: block;
`;

const Label = styled.p`
  ${font('title')};

  margin: 0 0 0.5rem;
`;

const Input = styled.input`
  ${font('title')};

  background-color: ${color.neutral0};
  border: 1px solid ${color.neutral200};
  border-radius: 2px;
  box-shadow: ${shadows.tertiary};
  box-sizing: border-box;
  color: ${color.neutral900};
  height: 3rem;

  /* Placeholder text won't vertically align middle on Firefox so have to go with this weird top/bottom padding */
  padding: 0.75rem 1rem;
  text-align: left;
  width: 324px;

  @media screen and (max-width: 359px) {
    width: 288px;
  }

  &:hover,
  &:focus {
    border-color: ${color.blue800};
  }

  &::placeholder {
    ${font('title')};

    color: ${color.neutral200};
    margin: 0;
  }
`;

const InputText = ({
  className,
  label,
  ...props
}: InputTextProps): ReactElement => (
  <Field className={className}>
    <Label>{label}</Label>
    <Input type='text' {...props} />
  </Field>
);

export default InputText;
