import React, { InputHTMLAttributes, ReactElement } from 'react';
import styled from '@emotion/styled';

import { font, srOnly } from '../00-base/utils';
import { color, shadows } from '../00-base/variables';

interface PokerCardProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  value: string;
}

const Container = styled.label`
  cursor: pointer;
  display: block;
`;

const Input = styled.input`
  ${srOnly()}
`;

const Card = styled.p`
  background-color: ${color.neutral0};
  border-radius: 8px;
  box-shadow: ${shadows.form};
  box-sizing: border-box;
  display: block;
  height: 148px;
  margin: 0;
  padding: 0.5rem;
  width: 104px;

  ${Input}:focus + & {
    /*
      Copy default outline behavior to the card
      https://ghinda.net/article/mimic-native-focus-css/
    */
    outline-color: Highlight;
    outline-color: -webkit-focus-ring-color;
    outline-style: auto;
    outline-width: 3px;
  }

  &:hover {
    background-color: ${color.green100};
    transition: all 0.15s cubic-bezier(0.4, 0, 0.6, 1);
  }

  input[type='radio']:checked + & {
    background-color: ${color.green700};
  }

  @media screen and (min-width: 768px) {
    height: 186px;
    padding: 10px;
    width: 128px;
  }
`;

const Content = styled.span`
  background-color: transparent;
  border: 1px solid ${color.blue800};
  box-sizing: border-box;
  display: flex;
  height: 100%;
  position: relative;

  @media screen and (min-width: 768px) {
    border-width: 2px;
  }

  input[type='radio']:checked + p & {
    border-color: ${color.green100};
  }
`;

const Top = styled.span`
  ${font('body')};

  /* Ensure siblings take up full width of parent */
  flex: 1;
  margin: 0.25rem;

  @media screen and (min-width: 768px) {
    ${font('title')};
  }

  input[type='radio']:checked + p & {
    color: ${color.neutral0};
  }
`;

const Center = styled.span`
  align-self: center;
  font-size: 3rem;
  margin: 0 auto;
  position: absolute;
  text-align: center;
  transform: translateX(-9px);
  width: 104px;

  @media screen and (min-width: 768px) {
    transform: translateX(-12px);
    width: 128px;
  }

  input[type='radio']:checked + p & {
    color: ${color.neutral0};
  }
`;

const Bottom = styled(Top)`
  align-self: flex-end;
  transform: rotate(180deg);
`;

const PokerCard = ({
  className,
  value,
  ...props
}: PokerCardProps): ReactElement => (
  <Container className={className}>
    <Input type='radio' value={value} {...props} />
    <Card>
      <Content>
        <Top aria-hidden>{value}</Top>
        <Center>{value}</Center>
        <Bottom aria-hidden>{value}</Bottom>
      </Content>
    </Card>
  </Container>
);

export default PokerCard;
