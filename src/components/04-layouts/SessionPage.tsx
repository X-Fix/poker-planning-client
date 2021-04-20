import React, { ReactElement, useContext, useEffect } from 'react';
import { useHistory } from 'react-router';
import { css, Global } from '@emotion/react';
import isEmpty from 'lodash/isEmpty';

import { SessionContext } from '../../context';
import {
  Participant,
  Session,
  SessionToken,
  TSessionContext,
} from '../../types';
import { disconnectSocket, connectSocket } from '../../services/socket';
import { parseToSessionContext } from '../../services/utils';
import { color } from '../00-base/variables';
import {
  Footer,
  Header,
  ParticipantPanel,
  Main,
  VoteForm,
} from '../03-organisms';
import { useQueryParams } from '../../hooks';

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
  } catch (error) {
    console.error(error);
  }

  return sessionToken || {};
}

function SessionPage(): ReactElement {
  const { setSessionContext, ...sessionContext } = useContext(SessionContext);
  const { sessionId, participantId } = fetchSessionToken(sessionContext);
  const history = useHistory();
  const queryParams = useQueryParams();

  useEffect(() => {
    if (!sessionId || !participantId) {
      const sessionId = queryParams.get('id');
      history.push(`/join-session${sessionId ? `?id=${sessionId}` : ''}`);
    } else {
      connectSocket({
        participantId,
        sessionId,
        onRemoved: () => {
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

    return disconnectSocket;
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

export default React.memo(SessionPage);
