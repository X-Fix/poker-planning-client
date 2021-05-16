import React, { ReactElement } from 'react';
import styled from '@emotion/styled';

const List = styled.ul`
  height: calc(100vh - 8rem);
  list-style: none;
  margin: 0;
  overflow-y: scroll;
  padding: 0;

  div + & {
    height: calc(100vh - 23rem);
  }
`;

type ParticipantListProps = {
  className?: string;
  children: ReactElement[];
};

const ParticipantList: React.FC<ParticipantListProps> = ({
  children,
  className,
}) => <List className={className}>{children}</List>;

export default ParticipantList;
