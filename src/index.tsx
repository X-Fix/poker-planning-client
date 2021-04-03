import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Global, css } from '@emotion/react';

import { color, fontFamily } from './components/00-base/variables';
import {
  CreateSessionPage,
  HomePage,
  JoinSessionPage,
} from './components/04-layouts';

const App: React.FC = () => {
  return (
    <>
      <Global
        styles={css`
          body {
            background-color: ${color.neutral50};
            font-family: ${fontFamily};
          }
        `}
      />
      <Router>
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/create-session' component={CreateSessionPage} />
          <Route path='/join-session' component={JoinSessionPage} />
        </Switch>
      </Router>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
