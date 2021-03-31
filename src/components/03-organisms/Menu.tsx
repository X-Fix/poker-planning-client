import React, {
  FocusEventHandler,
  KeyboardEventHandler,
  MutableRefObject,
  ReactElement,
  useCallback,
  useState,
} from 'react';
import styled from '@emotion/styled';

import { color, shadows } from '../00-base/variables';
import { font } from '../00-base/utils';
import { Icon } from '../01-atoms';
import { ButtonToggle } from '../02-molecules';

type ContainerProps = {
  isOpen?: boolean;
  onFocus: FocusEventHandler;
  onBlur: FocusEventHandler;
};

type MenuProps = {
  menuRef: MutableRefObject<HTMLDivElement>;
  menuItemRefs: MutableRefObject<HTMLButtonElement>[];
  navigationHandler: KeyboardEventHandler;
} & ContainerProps;

const Container = styled.div<ContainerProps>`
  background-color: ${color.neutral0};
  box-sizing: border-box;
  height: 0;
  overflow: hidden;
  padding-left: 1rem;
  padding-right: 1rem;
  position: absolute;
  top: 4rem;
  transition: height 0.25s cubic-bezier(0.4, 0, 0.6, 1);
  width: 100%;

  @media screen and (min-width: 35.5rem) {
    width: 22.5rem;
  }

  ${({ isOpen }) =>
    isOpen &&
    `
    border-bottom: 0.125rem solid ${color.blue800};
    box-shadow: ${shadows.header};
    height: 17rem;
    padding-bottom: 0.5rem;
    padding-top: 0.5rem;
  `}
`;

const Heading = styled.h2`
  ${font('title')};

  margin: 1rem 0 0.5rem;
`;

const StyledButtonToggle = styled(ButtonToggle)`
  margin-bottom: 0.375rem;
  padding: 0.125rem;
`;

const MenuAction = styled.button`
  align-items: center;
  background-color: transparent;
  border: none;
  color: ${color.blue800};
  cursor: pointer;
  display: flex;
  margin-bottom: 0.5rem;
  padding: 0.125rem;
  width: 100%;
`;

const ActionText = styled.span`
  ${font('body')};

  text-shadow: ${shadows.buttonSecondary};
`;

const ActionIcon = styled(Icon)`
  filter: drop-shadow(${shadows.buttonSecondary});
  height: 1.5rem;
  margin-right: 0.5rem;
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

const Menu = ({
  isOpen = false,
  menuRef,
  menuItemRefs,
  navigationHandler,
  onFocus,
  onBlur,
}: MenuProps): ReactElement => {
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
    <Container
      role='menu'
      isOpen={isOpen}
      aria-hidden={isOpen}
      ref={menuRef}
      onFocus={onFocus}
      onBlur={onBlur}
    >
      <Heading>Settings</Heading>
      {appSettings.map((props, index) => (
        <StyledButtonToggle
          key={props.value}
          onChange={toggleSetting}
          onKeyDown={navigationHandler}
          role='menuitem'
          tabIndex={-1}
          ref={menuItemRefs[index]}
          {...props}
        />
      ))}
      <Heading>Actions</Heading>
      <MenuAction
        onKeyDown={navigationHandler}
        role='menuitem'
        type='button'
        tabIndex={-1}
        ref={menuItemRefs[3]}
      >
        <ActionIcon xlink='copy' aria-hidden />
        <ActionText>Copy session link</ActionText>
      </MenuAction>
      <MenuAction
        onKeyDown={navigationHandler}
        role='menuitem'
        type='button'
        tabIndex={-1}
        ref={menuItemRefs[4]}
      >
        <ActionIcon xlink='leave' aria-hidden />
        <ActionText>Leave session</ActionText>
      </MenuAction>
    </Container>
  );
};

export default React.memo(Menu);
