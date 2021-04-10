import React, {
  ChangeEvent,
  FormEvent,
  ReactElement,
  useCallback,
  useContext,
  useState,
} from 'react';
import styled from '@emotion/styled';

import { font } from '../00-base/utils';
import { color, shadows } from '../00-base/variables';
import { Button, InputText } from '../02-molecules';
import { Icon } from '../01-atoms';
import { joinSession } from '../../services/http';
import { useHistory } from 'react-router';
import { SessionContext } from '../../context';

const { neutral0 } = color;
const { form } = shadows;

const Form = styled.form`
  box-sizing: border-box;
  height: 360px;
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
  margin: 0.5rem 0 2rem;
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
  const [participantName, setParticipantName] = useState('');
  const [sessionId, setSessionId] = useState('');
  const { setSessionContext } = useContext(SessionContext);

  const submitHandler = useCallback(
    async (event: FormEvent) => {
      event.preventDefault();
      const result = await joinSession({
        participantName,
        sessionId,
      });

      if (!result) return;

      const { response, token } = result;
      console.log({ response });
      setSessionContext(response);

      window.sessionStorage.setItem('sessionToken', JSON.stringify(token));

      history.push(`/session?id=${sessionId}`);
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
      setSessionId(value);
    },
    []
  );

  const isValidSessionId = sessionId.length === 6;

  return (
    <Form onSubmit={submitHandler} aria-labelledby='heading'>
      <Heading id='heading'>Join Session</Heading>
      <StyledInputText
        label='Your Name'
        placeholder='Eg. "John Johnson"'
        onChange={participantNameChangeHandler}
        value={participantName}
      />
      <StyledInputText
        label='Session ID'
        placeholder='Eg. "27y2k"'
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
