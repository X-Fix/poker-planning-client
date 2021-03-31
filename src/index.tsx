import React from 'react';
import { Global, css } from '@emotion/react';
import ReactDOM from 'react-dom';
import { Header, Menu } from './components/03-organisms';
import { fontFamily } from './components/00-base/variables';

const Body: React.FC = () => {
  return (
    <>
      <Global
        styles={css`
          body {
            font-family: ${fontFamily};
          }
        `}
      />
      <Header />
    </>
  );
};

ReactDOM.render(<Body />, document.getElementById('root'));
