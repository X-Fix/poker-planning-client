import React, {
  ReactElement,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import styled from '@emotion/styled';

import { setupMenuActions } from '../../a11y';
import { Button } from '../02-molecules';
import { Icon } from '../01-atoms';
import { color, shadows } from '../00-base/variables';
import { font, srOnly } from '../00-base/utils';
import { Menu } from '.';

const { blue800, neutral0 } = color;
const { header } = shadows;

const Container = styled.header`
  background-color: ${blue800};
  box-shadow: ${header};
  font-weight: 400;
  height: 64px;
  left: 0;
  position: fixed;
  text-align: center;
  top: 0;
  width: 100%;
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

  color: ${neutral0};
  flex: 1;
  font-weight: bold;
`;

const StyledButton = styled(Button)`
  @media screen and (max-width: 767px) {
    border-radius: 50%;
    padding: 0.5rem;
  }

  @media screen and (min-width: 768px) {
    height: 2.5rem;
  }
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

  const toggleMenu = useCallback(() => {
    setMenuOpen(!isMenuOpen);

    // If toggling from close -> open, also focus first MenuItem
    !isMenuOpen && menuItemRefs[0]?.current?.focus();
  }, [isMenuOpen]);

  const keyUpHandler = useCallback(
    ({ key }): void => {
      if (key === 'ArrowDown' || key === ' ' || key === 'Enter') {
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

  console.log({ isMenuOpen });

  const closeMenuOnBlur: EventHandlerNonNull = ({ target }) => {
    if (
      isMenuOpenRef &&
      !menuButtonRef.current?.contains(target as Element) &&
      !menuRef.current?.contains(target as Element)
    ) {
      setMenuOpen(false);
    }
  };

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
          <StyledButton
            onMouseUp={toggleMenu}
            onKeyUp={keyUpHandler}
            type='button'
            dark={isMenuOpen}
            ref={menuButtonRef}
            aria-expanded={isMenuOpen}
            aria-haspopup
          >
            <ButtonIcon xlink='menu' aria-hidden />
            <ButtonText>Menu</ButtonText>
          </StyledButton>
          <Menu
            isOpen={isMenuOpen}
            menuItems={menuItems}
            menuItemRefs={menuItemRefs}
            menuRef={menuRef}
            setMenuOpen={setMenuOpen}
          />
          <Heading>Poker Planning</Heading>
          <StyledButton type='button'>
            <ButtonIcon xlink='chat' aria-hidden />
            <ButtonText>Chat</ButtonText>
          </StyledButton>
        </Wrapper>
      </Container>
    </>
  );
};

export default React.memo(Header);
