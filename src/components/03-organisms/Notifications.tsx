import React, {
  memo,
  ReactElement,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import styled from '@emotion/styled';
import { color, shadows } from '../00-base/variables';
import { font } from '../00-base/utils';
import { Icon } from '../01-atoms';
import { NotificationMessage } from '../../types';
import { NotificationContext } from '../../context';

const Container = styled.aside<{ isShowing: boolean }>`
  align-items: center;
  background-color: ${color.neutral0};
  border-radius: 5px;
  box-shadow: ${shadows.notification};
  box-sizing: border-box;
  display: flex;
  height: 2.5rem;
  max-width: 288px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  right: -320px;
  top: 0.75rem;
  z-index: 2;

  @keyframes displayNotification {
    0%,
    100% {
      opacity: 1;
      right: -320px;
    }

    3%,
    90% {
      opacity: 1;
      right: 1rem;
    }

    98% {
      opacity: 0;
      right: 1rem;
    }

    99% {
      opacity: 0;
      right: -320px;
    }
  }

  ${({ isShowing }) =>
    isShowing &&
    `
    animation: displayNotification 9s 1 cubic-bezier(0.4, 0, 0.6, 1)
  `}
`;

const NotificationIconWrapper = styled.div<{ type: 'success' | 'info' }>`
  ${({ type }) => `
    ${type === 'success' && `background-color: ${color.green700}`};
    ${type === 'info' && `background-color: ${color.neutral700}`};
  `}

  color: ${color.iconWhite};
  height: 100%;
  margin-right: 1rem;
  width: 2.5rem;
`;

const NotificationIcon = styled(Icon)`
  height: 1.5rem;
  margin: 0.5rem;
  width: 1.5rem;
`;

const NotificationText = styled.span`
  ${font('body')};
`;

const DismissButton = styled.button`
  background-color: transparent;
  border: none;
  display: flex;
  margin-left: 0.5rem;
  padding: 0.5rem;
`;

const DismissIcon = styled(Icon)`
  color: ${color.neutral600};
  height: 1.5rem;
  width: 1.5rem;
`;

let _cachedTimeout: NodeJS.Timeout;

function Notifications(): ReactElement {
  const { notifications, dequeue } = useContext(NotificationContext);
  const [
    notification,
    setNotification,
  ] = useState<NotificationMessage | null>();
  const { message, type } = notification || {};

  useEffect(() => {
    if (!notifications.length) return;

    if (!_cachedTimeout) {
      const newMessage = dequeue();
      setNotification(newMessage);

      _cachedTimeout = setTimeout(() => {
        setNotification(null);
        _cachedTimeout = null;
      }, 10000);
    }
  }, [notifications, notification]);

  const hide = useCallback(() => {
    clearTimeout(_cachedTimeout);
    setNotification(null);
    _cachedTimeout = null;
  }, []);

  return (
    <Container isShowing={Boolean(message)} onClick={hide} aria-live='polite'>
      <NotificationIconWrapper type={type} aria-hidden>
        <NotificationIcon
          xlink={type === 'success' ? 'done' : 'info'}
          aria-hidden
        />
      </NotificationIconWrapper>
      <NotificationText>{message}</NotificationText>
      <DismissButton
        aria-label='Dismiss notification'
        title='Dismiss notification'
      >
        <DismissIcon xlink='close' aria-hidden />
      </DismissButton>
    </Container>
  );
}

export default memo(Notifications);
