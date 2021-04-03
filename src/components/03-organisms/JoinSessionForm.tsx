import React, { ReactElement } from 'react';
import styled from '@emotion/styled';

import { font } from '../00-base/utils';
import { color, shadows } from '../00-base/variables';
import { Button, InputText } from '../02-molecules';
import { Icon } from '../01-atoms';

const { neutral0 } = color;
const { form } = shadows;

const Form = styled.form`
  box-sizing: border-box;
  height: 360px;
  margin: 0 auto;
  padding: 1rem;
  width: 360px;

  @media screen and (min-width: 758px) {
    background-color: ${neutral0};
    box-shadow: ${form};
  }
`;

const Heading = styled.h2`
  ${font('headline')};

  font-weight: normal;
  margin: 0.5rem 0 2rem;
`;

const StyledInputText = styled(InputText)`
  margin: 0 0 1rem;
`;

const WideButton = styled(Button)`
  margin-top: 1rem;
  width: 322px;

  @media screen and (max-width: 359px) {
    width: 288px;
  }
`;

const ButtonText = styled.span`
  ${font('title')};

  margin-left: 0.25rem;
`;

const JoinSessionForm = (): ReactElement => (
  <Form onSubmit={() => false}>
    <Heading>Join Session</Heading>
    <StyledInputText label='Your Name' placeholder='Eg. "John Johnson"' />
    <StyledInputText label='Session ID' placeholder='Eg. "27y2k"' />
    <WideButton>
      <Icon xlink='join' aria-hidden />
      <ButtonText>Join Session</ButtonText>
    </WideButton>
  </Form>
);

export default React.memo(JoinSessionForm);
