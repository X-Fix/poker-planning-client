import React from 'react';
import ReactDOM from 'react-dom';
import styled from '@emotion/styled';

import printMe from './print';

const Body: React.FC = () => {
  const Body = styled.div`
    color: red;
  `;
  return (
    <Body>
      Hello webpack
      <button onClick={printMe}>Click me and check the console</button>
    </Body>
  );
};

ReactDOM.render(<Body />, document.getElementById('root'));
