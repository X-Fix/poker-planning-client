import React from 'react';
import ReactDOM from 'react-dom';
import styled from '@emotion/styled';

import printMe from './print';
import { Icon } from './components/01-atoms';
import { fontFamily } from './components/00-base/variables';
import { font } from './components/00-base/utils';
import Button from './components/02-molecules/Button';
import InputText from './components/02-molecules/InputText';
import InputRadio from './components/02-molecules/InputRadio';
import InputSwitch from './components/02-molecules/InputSwitch';
import PokerCard from './components/02-molecules/PokerCard';
import Header from './components/03-organisms/Header';
import ChooseForm from './components/03-organisms/ChooseForm';

const StyledBody = styled.div`
  font-family: ${fontFamily};
`;

const Heading = styled.h1`
  ${font('title')};
`;

const RadioGroup = styled.fieldset`
  margin: 2rem;
`;

const Legend = styled.legend`
  ${font('title')};
`;

const StyledInputText = styled(InputText)`
  margin-bottom: 0.5rem;
`;

const StyledButton = styled(Button)`
  margin-left: 0.5rem;
`;

const IconSnooze = styled(Icon)`
  margin-right: 1rem;
`;

const ButtonText = styled.span`
  ${font('body')};
`;

const Body: React.FC = () => {
  return (
    <StyledBody>
      <Header />
      <Heading>Hello webpack</Heading>
      <RadioGroup>
        <Legend>An example radio selection</Legend>
        <InputRadio name='example' label='Option A' />
        <InputRadio name='example' label='Option B' />
        <InputRadio name='example' label='Option Last' />
      </RadioGroup>
      <StyledInputText label='example' placeholder='Whatever you like' />
      <StyledButton onClick={printMe} type='button'>
        <IconSnooze
          aria-hidden
          description='This participant has temprarily disconnected'
          xlink='snooze'
        />
        <ButtonText>Click me and check the console</ButtonText>
      </StyledButton>
      <InputSwitch label='Check Me' name='checkMe' />

      <RadioGroup>
        <PokerCard value='?' name='poker-card' />
        <PokerCard value='100' name='poker-card' />
        <PokerCard value='☕' name='poker-card' />
      </RadioGroup>

      <ChooseForm />
    </StyledBody>
  );
};

ReactDOM.render(<Body />, document.getElementById('root'));
