import { createRef, KeyboardEventHandler, MutableRefObject } from 'react';

type MenuItem = {
  isFirst: boolean;
  isLast: boolean;
  ref: MutableRefObject<HTMLButtonElement>;

  escapeMenu?: () => void;
  nextItem?: () => void;
  previousItem?: () => void;
};

function setupMenuActions(totalMenuItems: number) {
  const menuRef = createRef<HTMLDivElement>();
  const menuButtonRef = createRef<HTMLButtonElement>();
  const menuItems = generateMenuItems(totalMenuItems);
  const menuItemRefs = menuItems.map(({ ref }) => ref);
  attachNavigationHandlers(menuItems, menuButtonRef);
  const menuItemNavigationHandler = getMenuItemNavigationHandler(menuItems);
  const menuButtonNavigationHandler = getMenuButtonNavigationHandler(
    menuItemRefs
  );

  return {
    menuRef,
    menuButtonRef,
    menuItemRefs,
    menuItemNavigationHandler,
    menuButtonNavigationHandler,
  };
}

function generateMenuItems(totalMenuItems: number): MenuItem[] {
  const menuItems: MenuItem[] = [];

  for (let i = 0; i < totalMenuItems; i++) {
    const menuItemRef = createRef<HTMLButtonElement>();

    menuItems.push({
      isFirst: i === 0,
      isLast: i === totalMenuItems - 1,
      ref: menuItemRef,
    });
  }

  return menuItems;
}

function attachNavigationHandlers(
  menuItems: MenuItem[],
  menuButtonRef: MutableRefObject<HTMLButtonElement>
): void {
  const lastIndex = menuItems.length - 1;

  menuItems.forEach((menuItem, index) => {
    menuItem.escapeMenu = () => {
      menuButtonRef.current?.focus();
    };

    menuItem.nextItem = () => {
      const target = menuItem.isLast ? menuItems[0] : menuItems[index + 1];

      target?.ref.current?.focus();
    };

    menuItem.previousItem = () => {
      const target = menuItem.isFirst
        ? menuItems[lastIndex]
        : menuItems[index - 1];

      target?.ref.current?.focus();
    };
  });
}

function getMenuItemNavigationHandler(
  menuItems: MenuItem[]
): KeyboardEventHandler {
  return ({ key, currentTarget }): void => {
    const { nextItem, previousItem, escapeMenu } = menuItems.find(
      ({ ref }) => ref.current === currentTarget
    );

    if (key === 'ArrowDown') {
      return nextItem();
    }

    if (key === 'ArrowUp') {
      return previousItem();
    }

    if (key === 'Escape' || key === 'ArrowLeft') {
      return escapeMenu();
    }
  };
}

function getMenuButtonNavigationHandler(
  menuItemRefs: MutableRefObject<HTMLButtonElement>[]
): KeyboardEventHandler {
  return ({ key }): void => {
    if (key === 'ArrowDown' || key === ' ' || key === 'Enter') {
      return menuItemRefs[0]?.current?.focus();
    }

    if (key === 'ArrowUp') {
      return menuItemRefs[menuItemRefs.length - 1]?.current?.focus();
    }
  };
}

export default setupMenuActions;
