import React, { Reducer, useReducer, useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Global, css } from '@emotion/react';
import isEmpty from 'lodash/isEmpty';

import { NotificationMessage, TSessionContext } from './types';
import { NotificationContext, SessionContext } from './context';
import { color, fontFamily } from './components/00-base/variables';
import {
  CreateSessionPage,
  HomePage,
  JoinSessionPage,
  SessionPage,
} from './components/04-layouts';
import { Notifications } from './components/03-organisms';
import { useQueue } from './hooks';

function sessionContextReducer(
  state: TSessionContext,
  payload: TSessionContext
) {
  return isEmpty(payload) ? {} : { ...state, ...payload };
}

const App: React.FC = () => {
  const [sessionContext, setSessionContext] = useReducer<
    Reducer<TSessionContext, TSessionContext>
  >(sessionContextReducer, {});
  const {
    queue: notifications,
    enqueue,
    dequeue,
  } = useQueue<NotificationMessage>([]);

  return (
    <SessionContext.Provider value={{ ...sessionContext, setSessionContext }}>
      <Global
        styles={css`
          body {
            background-color: ${color.neutral50};
            font-family: ${fontFamily};
          }
        `}
      />
      <NotificationContext.Provider
        value={{
          notifications,
          enqueue,
          dequeue,
        }}
      >
        <Notifications />
        <Router>
          <Switch>
            <Route exact path='/' component={HomePage} />
            <Route path='/create-session' component={CreateSessionPage} />
            <Route path='/join-session' component={JoinSessionPage} />
            <Route path='/session' component={SessionPage} />
          </Switch>
        </Router>
      </NotificationContext.Provider>
    </SessionContext.Provider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
