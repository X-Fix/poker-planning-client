import React from 'react';
import ReactDOM from 'react-dom';
import styled from '@emotion/styled';

import printMe from './print';
import Icon from './components/01-atoms/Icon';
import { colorIconGrey } from './components/00-base/variables';

const IconSnooze = styled(Icon)`
  color: ${colorIconGrey};
  margin-right: 1rem;
`;

const Body: React.FC = () => {
  const StyledBody = styled.div`
    color: red;
    margin-top: 4px;
  `;

  return (
    <StyledBody>
      Hello webpack
      <button onClick={printMe} type='button'>
        <IconSnooze
          aria-hidden
          description='This participant has temprarily disconnected'
          xlink='snooze'
        />
        Click me and check the console
      </button>
    </StyledBody>
  );
};

ReactDOM.render(<Body />, document.getElementById('root'));
