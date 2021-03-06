import React, {
  ChangeEvent,
  FormEvent,
  ReactElement,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import styled from '@emotion/styled';
import { useHistory } from 'react-router';

import { createSession } from '../../services/http';
import { NotificationContext } from '../../context';
import { color, shadows } from '../00-base/variables';
import { font } from '../00-base/utils';
import { Icon } from '../01-atoms';
import { Button, InputRadio, InputText } from '../02-molecules';

const Form = styled.form`
  box-sizing: border-box;
  height: 560px;
  margin: 0 auto;
  padding: 1rem;
  width: 356px;

  @media screen and (min-width: 758px) {
    background-color: ${color.neutral0};
    box-shadow: ${shadows.form};
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
  const { enqueue } = useContext(NotificationContext);
  const [participantName, setParticipantName] = useState('');
  const [sessionName, setSessionName] = useState('');
  const [cardSequence, setCardSequence] = useState(cardSequenceOptions[0]);
  const formRef = useRef<HTMLFormElement>();

  useEffect(() => {
    try {
      const initialCardSequence =
        cardSequenceOptions[
          Number(window.localStorage.getItem('cardSequenceIndex')) || 0
        ];
      setCardSequence(initialCardSequence);
      setParticipantName(window.localStorage.getItem('participantName') ?? '');
      setSessionName(window.localStorage.getItem('sessionName') ?? '');
    } catch (error) {
      window?.localStorage.clear();
    }

    formRef?.current.focus();
  }, []);

  const submitHandler = useCallback(
    async (event: FormEvent) => {
      event.preventDefault();

      let sessionToken;
      try {
        sessionToken = await createSession({
          cardSequence,
          participantName,
          sessionName,
        });
      } catch (error) {
        enqueue({
          message: 'Unknown server error',
          type: 'info',
        });
        return;
      }

      const cardSequenceIndex = cardSequenceOptions
        .findIndex((option) => option === cardSequence)
        .toString();

      window.localStorage.setItem('cardSequenceIndex', cardSequenceIndex);
      window.localStorage.setItem('participantName', participantName);
      window.localStorage.setItem('sessionName', sessionName);

      window.sessionStorage.setItem(
        'sessionToken',
        JSON.stringify(sessionToken)
      );

      history.push(`/session?id=${sessionToken.sessionId}`);
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
    <Form
      onSubmit={submitHandler}
      aria-labelledby='heading'
      autoComplete='on'
      tabIndex={0}
      ref={formRef}
    >
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

export default CreateSessionForm;
