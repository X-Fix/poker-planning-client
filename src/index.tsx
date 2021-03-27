import React from 'react';
import ReactDOM from 'react-dom';
import styled from '@emotion/styled';

import printMe from './print';
import { Icon } from './components/01-atoms';
import { fontFamily, fontSize } from './components/00-base/variables';
import Button from './components/02-molecules/Button';
import Font from './components/00-base/Font';
import InputText from './components/02-molecules/InputText';
import InputRadio from './components/02-molecules/InputRadio';
import InputSwitch from './components/02-molecules/InputSwitch';
import PokerCard from './components/02-molecules/PokerCard';

const StyledBody = styled.div`
  font-family: ${fontFamily};
  margin-top: 4px;
`;

const RadioGroup = styled.fieldset`
  margin: 2rem;
`;

const Legend = styled.legend`
  font-size: ${fontSize.title};
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

const Body: React.FC = () => {
  return (
    <StyledBody>
      <Font size='title' tag='h1'>
        Hello webpack
      </Font>
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
        <Font size='body'>Click me and check the console</Font>
      </StyledButton>
      <InputSwitch label='Check Me' name='checkMe' />

      <RadioGroup>
        <PokerCard value='?' name='poker-card' />
        <PokerCard value='100' name='poker-card' />
        <PokerCard value='☕' name='poker-card' />
      </RadioGroup>
    </StyledBody>
  );
};

ReactDOM.render(<Body />, document.getElementById('root'));
