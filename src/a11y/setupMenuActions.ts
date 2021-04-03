import { createRef, MutableRefObject } from 'react';

export type MenuItem = {
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

  return {
    menuRef,
    menuButtonRef,
    menuItems,
    menuItemRefs,
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

export default setupMenuActions;
