import React from 'react';
import ReactDOM from 'react-dom';
import styled from '@emotion/styled';

import printMe from './print';
import { Icon } from './components/01-atoms';
import { fontFamily } from './components/00-base/variables';
import Button from './components/02-molecules/Button';
import Font from './components/00-base/Font';

const IconSnooze = styled(Icon)`
  margin-right: 1rem;
`;

const Body: React.FC = () => {
  const StyledBody = styled.div`
    font-family: ${fontFamily};
    margin-top: 4px;
  `;

  const StyledButton = styled(Button)`
    margin-left: 0.5rem;
  `;

  return (
    <StyledBody>
      <Font size='title' tag='h1'>
        Hello webpack
      </Font>
      <StyledButton onClick={printMe} type='button'>
        <IconSnooze
          aria-hidden
          description='This participant has temprarily disconnected'
          xlink='snooze'
        />
        <Font size='body'>Click me and check the console</Font>
      </StyledButton>
    </StyledBody>
  );
};

ReactDOM.render(<Body />, document.getElementById('root'));
