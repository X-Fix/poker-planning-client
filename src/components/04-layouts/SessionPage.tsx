import React, { ReactElement, useContext, useEffect } from 'react';
import { useHistory } from 'react-router';
import { css, Global } from '@emotion/react';
import isEmpty from 'lodash/isEmpty';

import { NotificationContext, SessionContext } from '../../context';
import { useQueryParams } from '../../hooks';
import { connectSocket, disconnectSocket } from '../../services/socket';
import { parseToSessionContext } from '../../services/utils';
import { Participant, Session, SessionToken } from '../../types';
import { color } from '../00-base/variables';
import {
  Footer,
  Header,
  ParticipantPanel,
  Main,
  VoteForm,
} from '../03-organisms';

const TWO_MINUTES = 1000 * 60 * 2;
let _condemnTimeout: NodeJS.Timeout;

function fetchSessionToken(): SessionToken {
  let sessionToken: SessionToken;

  try {
    // TODO (check for cookie instead in the event of SSR)
    sessionToken = JSON.parse(window.sessionStorage.getItem('sessionToken'));
  } catch (error) {
    console.error(error);
  }

  return sessionToken || {};
}

function SessionPage(): ReactElement {
  const { setSessionContext, ...sessionContext } = useContext(SessionContext);
  const { sessionId, participantId } = fetchSessionToken();
  const { enqueue } = useContext(NotificationContext);
  const history = useHistory();
  const queryParams = useQueryParams();

  useEffect(() => {
    if (_condemnTimeout) {
      /**
       * Cancel any scheduled socket and cache clearing. Cache will be cleared when joining/creating
       * a new session, and an existing socket connections will be closed before the new one is
       * established
       */
      clearTimeout(_condemnTimeout);
      _condemnTimeout = null;
    }

    if (!sessionId || !participantId) {
      const sessionId = queryParams.get('id');
      history.push(`/join-session${sessionId ? `?id=${sessionId}` : ''}`);
    } else {
      connectSocket({
        participantId,
        sessionId,
        onSessionEnd: (reason: string) => {
          enqueue({
            message: reason,
            type: 'info',
          });
          window.sessionStorage.clear();
          setSessionContext({});
          history.push('/');
        },
        onSyncSession: (session: Session) => {
          setSessionContext(parseToSessionContext({ participantId, session }));
        },
        onSyncParticipants: (participants: Participant[]) => {
          setSessionContext(
            parseToSessionContext({ participantId, participants })
          );
        },
      });
    }

    return () => {
      /**
       * When navigating away from the SessionPage, give the client a small grace period in case of
       * accidental back navigation, then disconnect the socket and clear cached data.
       * This scheduled clean up should be canceled if the client rectifies the mistake (navigates
       * forward again/rejoins the session)
       */
      _condemnTimeout = setTimeout(() => {
        disconnectSocket();
        window.sessionStorage.clear();
        setSessionContext({});
      }, TWO_MINUTES);
    };
  }, []);

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

export default SessionPage;
