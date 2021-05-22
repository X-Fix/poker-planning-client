import React, {
  ReactElement,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { matchPath, useHistory, useLocation } from 'react-router-dom';
import styled from '@emotion/styled';

import { setupMenuActions } from '../../a11y';
import { Icon } from '../01-atoms';
import { color, shadows } from '../00-base/variables';
import { font, srOnly } from '../00-base/utils';
import { Button } from '../02-molecules';
import { Menu } from '.';

const Container = styled.header`
  background-color: ${color.blue800};
  box-shadow: ${shadows.header};
  font-weight: 400;
  height: 64px;
  left: 0;
  position: absolute;
  text-align: center;
  top: 0;
  width: 100%;
  z-index: 1;
`;

const Wrapper = styled.section`
  align-items: center;
  display: flex;
  height: 100%;
  margin: 0 auto;
  max-width: 1024px;
`;

const Heading = styled.h1`
  ${font('title')};

  color: ${color.neutral0};
  flex: 1;
  font-weight: bold;
`;

const sharedButtonStyles = `
  @media screen and (max-width: 767px) {
    border-radius: 50%;
    padding: 0.5rem;
  }

  @media screen and (min-width: 768px) {
    height: 2.5rem;
  }
`;

const BackButton = styled(Button)`
  position: absolute;
  ${sharedButtonStyles};
`;

const MenuButton = styled(Button)`
  ${sharedButtonStyles};
`;

const ChatButton = styled(Button)`
  ${sharedButtonStyles};
`;

const ButtonText = styled.span`
  ${font('body')};

  margin-left: 0.25rem;

  @media screen and (max-width: 767px) {
    ${srOnly()};
  }
`;

const ButtonIcon = styled(Icon)`
  @media screen and (min-width: 768px) {
    height: 1.5rem;
    width: 1.5rem;
  }
`;

const { menuRef, menuButtonRef, menuItems, menuItemRefs } = setupMenuActions(5);

const Header = (): ReactElement => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const isMenuOpenRef = useRef(isMenuOpen);

  const location = useLocation();
  const history = useHistory();
  const isInSession = Boolean(
    matchPath(location.pathname, { path: '/session' })
  );
  const isOnHomePage = location.pathname === '/';

  const toggleMenu = useCallback(() => {
    setMenuOpen(!isMenuOpen);

    // If toggling from close -> open, also focus first MenuItem
    !isMenuOpen && menuItemRefs[0]?.current?.focus();
  }, [isMenuOpen]);

  const keyDownHandler = useCallback(
    ({ key }): void => {
      if (key === 'ArrowDown') {
        setMenuOpen(true);
        return menuItemRefs[0]?.current?.focus();
      }

      if (key === 'ArrowUp') {
        setMenuOpen(true);
        return menuItemRefs[menuItemRefs.length - 1]?.current?.focus();
      }
    },
    [setMenuOpen, menuItemRefs]
  );

  const closeMenuOnBlur: EventHandlerNonNull = ({ target }) => {
    if (
      isMenuOpenRef &&
      !menuButtonRef.current?.contains(target as Element) &&
      !menuRef.current?.contains(target as Element)
    ) {
      setMenuOpen(false);
    }
  };

  const goToHome = useCallback(() => history.push('/'), []);

  useEffect(() => {
    window.addEventListener('click', closeMenuOnBlur);
    window.addEventListener('focusin', closeMenuOnBlur);
    return () => {
      window.removeEventListener('click', closeMenuOnBlur);
      window.removeEventListener('focusin', closeMenuOnBlur);
    };
  }, []);

  return (
    <>
      <Container>
        <Wrapper>
          {isInSession && (
            <>
              <MenuButton
                onClick={toggleMenu}
                onKeyDown={keyDownHandler}
                type='button'
                dark={isMenuOpen}
                ref={menuButtonRef}
                aria-expanded={isMenuOpen}
                aria-haspopup
              >
                <ButtonIcon xlink='menu' aria-hidden />
                <ButtonText>Menu</ButtonText>
              </MenuButton>
              <Menu
                isOpen={isMenuOpen}
                menuItems={menuItems}
                menuItemRefs={menuItemRefs}
                menuRef={menuRef}
                setMenuOpen={setMenuOpen}
              />
            </>
          )}
          {!isInSession && !isOnHomePage && (
            <BackButton
              type='button'
              title='Go back to home screen'
              onClick={goToHome}
            >
              <ButtonIcon xlink='back' aria-hidden />
              <ButtonText>Back</ButtonText>
            </BackButton>
          )}
          <Heading>Poker Planning</Heading>
          {isInSession && (
            <>
              <ChatButton type='button' title='Coming soon...'>
                <ButtonIcon xlink='chat' aria-hidden />
                <ButtonText>Chat</ButtonText>
              </ChatButton>
            </>
          )}
        </Wrapper>
      </Container>
    </>
  );
};

export default Header;
