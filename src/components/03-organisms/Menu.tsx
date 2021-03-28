import React, { ReactElement, useCallback, useState } from 'react';
import styled from '@emotion/styled';

import { color, shadows } from '../00-base/variables';
import { font } from '../00-base/utils';
import { Icon } from '../01-atoms';
import { ButtonToggle } from '../02-molecules';

type MenuProps = {
  isOpen?: boolean;
};

const Container = styled.div<MenuProps>`
  background-color: ${color.neutral0};
  box-sizing: border-box;
  height: 0;
  overflow: hidden;
  padding-left: 1rem;
  padding-right: 1rem;
  position: absolute;
  top: 4rem;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.6, 1);
  width: 100%;

  @media screen and (min-width: 35.5rem) {
    width: 22.5rem;
  }

  ${({ isOpen }) =>
    isOpen &&
    `
    border-bottom: 0.125rem solid ${color.blue800};
    height: 16.5rem;
    padding-bottom: 0.5rem;
    padding-top: 0.5rem;
  `}
`;

const Heading = styled.h2`
  ${font('title')};

  margin: 1rem 0 0.5rem;
`;

const StyledButtonToggle = styled(ButtonToggle)`
  margin-bottom: 0.25rem;
  padding: 0.125rem;
`;

const MenuAction = styled.button`
  background-color: transparent;
  border: none;
  color: ${color.blue800};
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.25rem;
  padding: 0;
  width: 100%;
`;

const ActionText = styled.span`
  ${font('body')};

  text-shadow: ${shadows.buttonSecondary};
`;

const ActionIcon = styled(Icon)`
  filter: drop-shadow(${shadows.buttonSecondary});
  height: 1.5rem;
  width: 1.5rem;
`;

const appSettings = [
  {
    initialState: true,
    label: 'Display notifications',
    value: 'displayNotifications',
  },
  {
    initialState: true,
    label: 'Play notification sounds',
    value: 'playNotificationSounds',
  },
  {
    initialState: false,
    label: 'Use one-touch vote',
    value: 'oneTouchVote',
  },
];

const initialSettings: { [key: string]: boolean } = {};
appSettings.forEach(({ initialState, value }) => {
  initialSettings[value] = initialState;
});

const Menu = ({ isOpen = false }: MenuProps): ReactElement => {
  const [settings, setSettings] = useState(initialSettings);
  const toggleSetting = useCallback(
    ({ state, value }) => {
      setSettings({
        ...settings,
        [value]: state,
      });
    },
    [setSettings]
  );

  return (
    <Container role='menu' isOpen={isOpen}>
      <Heading>Settings</Heading>
      {appSettings.map((props) => (
        <StyledButtonToggle
          key={props.value}
          onChange={toggleSetting}
          role='menuitem'
          {...props}
        />
      ))}
      <Heading>Actions</Heading>
      <MenuAction type='button'>
        <ActionText>Copy session link</ActionText>
        <ActionIcon xlink='copy' aria-hidden />
      </MenuAction>
      <MenuAction type='button'>
        <ActionText>Leave session</ActionText>
        <ActionIcon xlink='leave' aria-hidden />
      </MenuAction>
    </Container>
  );
};

export default React.memo(Menu);
