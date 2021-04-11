import React, {
  ChangeEvent,
  FormEvent,
  ReactElement,
  useCallback,
  useContext,
  useState,
} from 'react';
import styled from '@emotion/styled';

import { color, shadows } from '../00-base/variables';
import { Icon } from '../01-atoms';
import { Button, InputRadio, InputText } from '../02-molecules';
import { font } from '../00-base/utils';
import { createSession } from '../../services/http';
import { useHistory } from 'react-router';
import { SessionContext } from '../../context';

const { neutral0 } = color;
const { form } = shadows;

const Form = styled.form`
  box-sizing: border-box;
  height: 580px;
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

const Legend = styled.legend`
  ${font('title')};
`;

const Fieldset = styled.fieldset`
  border: none;
  margin: 2rem 0;
  padding: 0;
`;

const StyledInputRadio = styled(InputRadio)`
  margin: 0.5rem 0 0 0.5rem;
  padding: 0.25rem;
`;

const CreateSessionButtonText = styled.span`
  ${font('title')};

  margin-left: 0.25rem;
`;

const cardSequenceOptions = [
  ['½', '1', '2', '3', '5', '8', '13', '20', '40', '100'],
  ['1', '2', '5', '10', '20', '50', '100'],
  ['1', '2', '4', '8', '12', '16', '24', '40', '80'],
  ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL'],
];

const CreateSessionForm = (): ReactElement => {
  const history = useHistory();
  const [participantName, setParticipantName] = useState('');
  const [sessionName, setSessionName] = useState('');
  const [cardSequence, setCardSequence] = useState(cardSequenceOptions[0]);
  const { setSessionContext } = useContext(SessionContext);

  const submitHandler = useCallback(
    async (event: FormEvent) => {
      event.preventDefault();
      const result = await createSession({
        cardSequence,
        participantName,
        sessionName,
      });

      if (!result) return;

      const { response, token } = result;
      window.sessionStorage.setItem('sessionToken', JSON.stringify(token));

      setSessionContext(response);
      history.push(`/session?id=${response.sessionId}`);
    },
    [participantName, sessionName, cardSequence]
  );

  const participantNameChangeHandler = useCallback(
    ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
      setParticipantName(value);
    },
    []
  );

  const sessionNameChangeHandler = useCallback(
    ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
      setSessionName(value);
    },
    []
  );

  const radioOnChangeHandler = useCallback(
    ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
      setCardSequence(cardSequenceOptions[Number(value)]);
    },
    []
  );

  return (
    <Form onSubmit={submitHandler} aria-labelledby='heading' autoComplete='on'>
      <Heading id='heading'>Create New Session</Heading>
      <StyledInputText
        label='Your Name'
        id='participant-name'
        name='participant-name'
        placeholder='Eg. "John Johnson"'
        onChange={participantNameChangeHandler}
        value={participantName}
      />
      <StyledInputText
        label='Session Name (optional)'
        id='session-name'
        name='session-name'
        placeholder='Eg. "Fuzzy Wumpus"'
        onChange={sessionNameChangeHandler}
        value={sessionName}
      />
      <Fieldset>
        <Legend>Card Sequence</Legend>
        {cardSequenceOptions.map((cardSequenceOption: string[], index) => (
          <StyledInputRadio
            key={cardSequenceOption.join('')}
            label={cardSequenceOption.join(', ')}
            name='card-sequence'
            value={index}
            onChange={radioOnChangeHandler}
            checked={cardSequenceOption === cardSequence}
          />
        ))}
      </Fieldset>
      <Button wide>
        <Icon xlink='create' aria-hidden />
        <CreateSessionButtonText>Create New Session</CreateSessionButtonText>
      </Button>
    </Form>
  );
};

export default React.memo(CreateSessionForm);
