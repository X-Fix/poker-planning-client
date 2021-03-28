import React, { ReactElement } from 'react';
import styled from '@emotion/styled';

import { color, shadows } from '../00-base/variables';
import { Icon } from '../01-atoms';
import { Button, InputRadio, InputText } from '../02-molecules';
import { font } from '../00-base/utils';

const { neutral0 } = color;
const { form } = shadows;

const Form = styled.form`
  box-sizing: border-box;
  height: 580px;
  padding: 1rem;
  width: 360px;

  @media screen and (min-width: 758px) {
    background-color: ${neutral0};
    box-shadow: ${form};
  }

  & > label:nth-child(2),
  & > label:nth-child(3) {
    margin: 0 0 1rem;
  }
`;

const Heading = styled.h2`
  ${font('headline')};

  font-weight: normal;
  margin: 0.5rem 0 2rem;
`;

const Legend = styled.legend`
  ${font('title')};
`;

const Fieldset = styled.fieldset`
  border: none;
  margin: 2rem 0;
  padding: 0;

  & > label {
    margin: 0.5rem 0 0 0.5rem;
    padding: 0.25rem;
  }
`;

const WideButton = styled(Button)`
  width: 322px;
`;

const ButtonText = styled.span`
  ${font('title')};

  margin-left: 0.25rem;
`;

const CreateSessionForm = (): ReactElement => (
  <Form onSubmit={() => false}>
    <Heading>Create New Session</Heading>
    <InputText label='Your Name' placeholder='Eg. "John Johnson"' />
    <InputText
      label='Session Name (optional)'
      placeholder='Eg. "Fuzzy Wumpus"'
    />
    <Fieldset>
      <Legend>Card Sequence</Legend>
      <InputRadio
        label='½, 1, 2, 3, 5, 8, 13, 20, 40, 100'
        name='card-sequence'
      />
      <InputRadio label='1, 2, 5, 10, 20, 50, 100' name='card-sequence' />
      <InputRadio label='1, 2, 4, 8, 12, 16, 24, 40, 80' name='card-sequence' />
      <InputRadio label='XXS, XS, S, M, L, XL, XXL' name='card-sequence' />
    </Fieldset>
    <WideButton>
      <Icon xlink='create' aria-hidden />
      <ButtonText>Create New Session</ButtonText>
    </WideButton>
  </Form>
);

export default React.memo(CreateSessionForm);
