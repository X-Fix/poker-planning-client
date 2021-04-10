import React, { ReactElement, useContext, useEffect } from 'react';
import { useHistory } from 'react-router';
import { css, Global } from '@emotion/react';
import isEmpty from 'lodash/isEmpty';

import { SessionContext } from '../../context';
import { SessionToken, TSessionContext } from '../../types';
import { disconnectSocket, emitSubscribe } from '../../services/socket';
import { color } from '../00-base/variables';
import {
  Footer,
  Header,
  ParticipantPanel,
  Main,
  VoteForm,
} from '../03-organisms';

function fetchSessionToken({ self, sessionId }: TSessionContext): SessionToken {
  let sessionToken: SessionToken;

  if (sessionId && self?.id) {
    return {
      participantId: self.id,
      sessionId,
    };
  }

  try {
    // TODO (check for cookie instead in the event of SSR)
    sessionToken = JSON.parse(window.sessionStorage.getItem('sessionToken'));
    console.log('getting sessionToken', { sessionToken });
  } catch (error) {
    console.error(error);
  }

  return sessionToken || {};
}

function SessionPage(): ReactElement {
  const { setSessionContext, ...sessionContext } = useContext(SessionContext);
  const { sessionId, participantId } = fetchSessionToken(sessionContext);
  const history = useHistory();

  useEffect(() => {
    if (!sessionId || !participantId) {
      history.push('/');
    } else {
      emitSubscribe({
        participantId,
        sessionId,
        setSessionContext,
        isSyncNeeded: isEmpty(sessionContext),
      });
    }

    return disconnectSocket;
  }, [participantId, sessionId]);

  if (isEmpty(sessionContext)) {
    return null;
  }

  return (
    <>
      <Global
        styles={css`
          body {
            background-color: ${color.blue25};
          }
        `}
      />
      <Header />
      <Main>
        <VoteForm />
        <ParticipantPanel />
      </Main>
      <Footer />
    </>
  );
}

export default React.memo(SessionPage);
