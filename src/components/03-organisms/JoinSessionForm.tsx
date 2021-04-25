import React, {
  ChangeEvent,
  FormEvent,
  ReactElement,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import styled from '@emotion/styled';
import { useHistory } from 'react-router';

import { font } from '../00-base/utils';
import { color, shadows } from '../00-base/variables';
import { Button, InputText } from '../02-molecules';
import { Icon } from '../01-atoms';
import { joinSession } from '../../services/http';
import { NotificationContext } from '../../context';
import { useQueryParams } from '../../hooks';

const { neutral0 } = color;
const { form } = shadows;

const Form = styled.form`
  box-sizing: border-box;
  height: 344px;
  margin: 0 auto;
  padding: 1rem;
  width: 360px;

  @media screen and (min-width: 758px) {
    background-color: ${neutral0};
    box-shadow: ${form};
  }
`;

const Heading = styled.h2`
  ${font('headline')};

  font-weight: normal;
  margin: 0.5rem 0 1rem;
`;

const StyledInputText = styled(InputText)`
  margin: 0 0 1rem;
`;

const JoinSessionButton = styled(Button)`
  margin-top: 1rem;
`;

const JoinSessionButtonText = styled.span`
  ${font('title')};

  margin-left: 0.25rem;
`;

const JoinSessionForm = (): ReactElement => {
  const history = useHistory();
  const { enqueue } = useContext(NotificationContext);
  const [participantName, setParticipantName] = useState('');
  const [sessionId, setSessionId] = useState('');
  const queryParams = useQueryParams();

  useEffect(() => {
    setSessionId(queryParams.get('id') ?? '');
    setParticipantName(window.localStorage.getItem('participantName') ?? '');
  }, []);

  const submitHandler = useCallback(
    async (event: FormEvent) => {
      event.preventDefault();

      let sessionToken;
      try {
        sessionToken = await joinSession({
          participantName,
          sessionId,
        });
      } catch (error) {
        const message =
          error === 404 ? 'No matching session found' : 'Unknown server error';
        enqueue({
          message,
          type: 'info',
        });
        return;
      }

      window.localStorage.setItem('participantName', participantName);
      window.sessionStorage.setItem(
        'sessionToken',
        JSON.stringify(sessionToken)
      );

      history.push(`/session?id=${sessionToken.sessionId}`);
    },
    [participantName, sessionId]
  );

  const participantNameChangeHandler = useCallback(
    ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
      setParticipantName(value);
    },
    []
  );

  const sessionIdChangeHandler = useCallback(
    ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
      setSessionId(value.toLowerCase());
    },
    []
  );

  const isValidSessionId = sessionId.length === 5;

  return (
    <Form onSubmit={submitHandler} aria-labelledby='heading' autoComplete='on'>
      <Heading id='heading'>Join Session</Heading>
      <StyledInputText
        label='Your Name'
        id='participant-name'
        name='participant-name'
        placeholder='Eg. "John Johnson"'
        onChange={participantNameChangeHandler}
        value={participantName}
      />
      <StyledInputText
        label='Session ID'
        id='session-id'
        name='session-id'
        placeholder='Eg. "27y2k"'
        spellCheck='false'
        onChange={sessionIdChangeHandler}
        value={sessionId}
      />
      <JoinSessionButton type='submit' disabled={!isValidSessionId} wide>
        <Icon xlink='join' aria-hidden />
        <JoinSessionButtonText>Join Session</JoinSessionButtonText>
      </JoinSessionButton>
    </Form>
  );
};

export default React.memo(JoinSessionForm);
