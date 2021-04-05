import React, {
  ChangeEvent,
  ReactElement,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { useHistory } from 'react-router';
import { css, Global } from '@emotion/react';

import { SessionData } from '../../types';
import { color } from '../00-base/variables';
import { Footer, Header, LobbyPanel, Main, VoteForm } from '../03-organisms';

type SessionState = 'lobby' | 'newVote' | 'voting' | 'result';

let storedSessionData: SessionData;
function fetchSessionData(): SessionData {
  console.log('fetched!');
  if (!storedSessionData) {
    try {
      // TODO (check for cookie instead in the event of SSR)
      storedSessionData = JSON.parse(
        window.sessionStorage.getItem('sessionData')
      );
    } catch (error) {
      console.error(error);
    }
  }

  return storedSessionData;
}

function SessionPage(): ReactElement {
  const [sessionData] = useState<SessionData>(fetchSessionData());
  const [sessionState, setSessionState] = useState<SessionState>('lobby');
  const [vote, setVote] = useState<string | undefined>();

  useEffect(() => {
    console.log('mounted');
    if (!sessionData) {
      useHistory().push('/');
    }
  }, []);

  const changeHandler = useCallback(
    ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
      setVote(value);
    },
    []
  );

  const {
    participantId,
    session: {
      cardSequence,
      id: sessionId,
      name: sessionName,
      ownerId,
      participants,
    },
  } = sessionData;

  return (
    cardSequence.length && (
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
          <VoteForm
            cardSequence={cardSequence}
            isActive={sessionState === 'voting'}
            onChange={changeHandler}
          />
          {sessionState === 'lobby' && (
            <LobbyPanel
              ownerId={ownerId}
              participantId={participantId}
              participants={participants}
              sessionId={sessionId}
              sessionName={sessionName}
              transitionState={() => setSessionState('newVote')}
            />
          )}
        </Main>
        <Footer />
      </>
    )
  );
}

export default React.memo(SessionPage);
