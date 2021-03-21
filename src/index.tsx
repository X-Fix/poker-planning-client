import React from 'react';
import ReactDOM from 'react-dom';
import styled from '@emotion/styled';

import printMe from './print';

const Body: React.FC = () => {
  const StyledBody = styled.div`
    color: red;
    margin-top: 4px;
  `;

  return (
    <StyledBody>
      Hello webpack
      <button onClick={printMe} type="button">
        Click me and check the console
      </button>
    </StyledBody>
  );
};

ReactDOM.render(<Body />, document.getElementById('root'));
