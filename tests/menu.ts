import { Selector } from 'testcafe';
import { screen } from '@testing-library/testcafe';

fixture`Menu`.page`http://localhost:8080`;

const getMenuButton = () =>
  Selector('button.eapafip2.css-l3nfd8-StyledButton-StyledButton.e1awcw0n0');
const getFirstMenuItem = () =>
  Selector('button[role="menuitem"]:first-of-type');
const getLastMenuItem = () => Selector('button[role="menuitem"]:last-of-type');

const assertMenuOpen = (t) =>
  t.expect(screen.queryByRole('menu').exists).eql(true);
const assertMenuClosed = (t) =>
  t.expect(screen.queryByRole('menu').exists).eql(false);

test('Opening and closing the menu with mouse', async (t) => {
  // Check default state
  await assertMenuClosed(t);

  // Open by clicking menu button
  await t.click(getMenuButton());
  await assertMenuOpen(t);
  await t
    .expect(screen.getByRole('menu').getAttribute('aria-hidden'))
    .eql('false');
  await t.expect(getFirstMenuItem().focused).eql(true);

  // Close by clicking menu button
  await t.click(getMenuButton());
  await assertMenuClosed(t);

  // Open by clicking menu button (again)
  await t.click(getMenuButton());
  await assertMenuOpen(t);

  // No change after clicking around inside menu
  await t.click(getFirstMenuItem());
  await assertMenuOpen(t);
  await t.click(screen.getByText('Settings'));
  await assertMenuOpen(t);

  // Close menu by clicking outside
  await t.click(screen.getByText('Poker Planning'));
  await assertMenuClosed(t);
});

test('Opening and closing the menu with keyboard', async (t) => {
  // Check default state
  await assertMenuClosed(t);

  // Move focus to menu button
  await t.pressKey('tab');
  await t.expect(getMenuButton().focused).eql(true);

  // Open with 'Space' key
  await t.pressKey('space');
  await assertMenuOpen(t);
  await t.expect(getFirstMenuItem().focused).eql(true);

  // Close with 'Esc' key
  await t.pressKey('esc');
  await assertMenuClosed(t);
  await t.expect(getMenuButton().focused).eql(true);

  // Open with 'Enter' key
  await t.pressKey('enter');
  await assertMenuOpen(t);
  await t.expect(getFirstMenuItem().focused).eql(true);

  // Close with 'Left' key
  await t.pressKey('left');
  await assertMenuClosed(t);
  await t.expect(getMenuButton().focused).eql(true);

  // Open with 'Down' key
  await t.pressKey('down');
  await assertMenuOpen(t);
  await t.expect(getFirstMenuItem().focused).eql(true);

  // Close (just resetting for next test)
  await t.pressKey('esc');

  // Open with 'Up' key
  await t.pressKey('up');
  await assertMenuOpen(t);
  await t.expect(getLastMenuItem().focused).eql(true);
});

test('navigating the menu with a keyboard', async (t) => {
  // Check default state
  await assertMenuClosed(t);

  // Open by clicking menu button
  await t.click(getMenuButton());
  await assertMenuOpen(t);

  const menuItems = Selector('button[role="menuitem"]');

  // Start at the first item
  await t.expect(menuItems.nth(0).focused).eql(true);

  // Move down to the last
  await t.pressKey('down');
  await t.expect(menuItems.nth(1).focused).eql(true);
  await t.pressKey('down');
  await t.expect(menuItems.nth(2).focused).eql(true);
  await t.pressKey('down');
  await t.expect(menuItems.nth(3).focused).eql(true);
  await t.pressKey('down');
  await t.expect(menuItems.nth(4).focused).eql(true);

  // Cycle from last to first with the 'Down' key
  await t.pressKey('down');
  await t.expect(menuItems.nth(0).focused).eql(true);

  // Cycle back from first to last with the 'Up' key
  await t.pressKey('up');
  await t.expect(menuItems.nth(4).focused).eql(true);

  // Move back up to the first item
  await t.pressKey('up');
  await t.expect(menuItems.nth(3).focused).eql(true);
  await t.pressKey('up');
  await t.expect(menuItems.nth(2).focused).eql(true);
  await t.pressKey('up');
  await t.expect(menuItems.nth(1).focused).eql(true);
  await t.pressKey('up');
  await t.expect(menuItems.nth(0).focused).eql(true);
});

test('interacting with menuitems', async (t) => {
  // Check default state
  await assertMenuClosed(t);

  // Open by clicking menu button
  await t.click(getMenuButton());
  await assertMenuOpen(t);
  await t.wait(500);

  const menuItems = Selector('button[role="menuitem"]');

  // Start at the first item
  await t.expect(menuItems.nth(0).focused).eql(true);
  await t.expect(menuItems.nth(0).getAttribute('aria-pressed')).eql('true');

  // Toggle with 'Enter' key (space works as well but testcafe doesn't support the behaviour)
  await t.pressKey('enter');
  await t.expect(menuItems.nth(0).getAttribute('aria-pressed')).eql('false');
  await t.pressKey('enter');
  await t.expect(menuItems.nth(0).getAttribute('aria-pressed')).eql('true');

  // Toggle with mouse click
  await t.click(menuItems.nth(0));
  await t.expect(menuItems.nth(0).getAttribute('aria-pressed')).eql('false');
  await t.click(menuItems.nth(0));
  await t.expect(menuItems.nth(0).getAttribute('aria-pressed')).eql('true');

  // Move to next menuitem and repeat (x2)
  await t.pressKey('down');
  await t.expect(menuItems.nth(1).focused).eql(true);
  await t.expect(menuItems.nth(1).getAttribute('aria-pressed')).eql('true');
  await t.pressKey('enter');
  await t.expect(menuItems.nth(1).getAttribute('aria-pressed')).eql('false');
  await t.pressKey('enter');
  await t.expect(menuItems.nth(1).getAttribute('aria-pressed')).eql('true');

  await t.click(menuItems.nth(1));
  await t.expect(menuItems.nth(1).getAttribute('aria-pressed')).eql('false');
  await t.click(menuItems.nth(1));
  await t.expect(menuItems.nth(1).getAttribute('aria-pressed')).eql('true');

  await t.pressKey('down');
  await t.expect(menuItems.nth(2).focused).eql(true);
  await t.expect(menuItems.nth(2).getAttribute('aria-pressed')).eql('false');
  await t.pressKey('enter');
  await t.expect(menuItems.nth(2).getAttribute('aria-pressed')).eql('true');
  await t.pressKey('enter');
  await t.expect(menuItems.nth(2).getAttribute('aria-pressed')).eql('false');

  await t.click(menuItems.nth(2));
  await t.expect(menuItems.nth(2).getAttribute('aria-pressed')).eql('true');
  await t.click(menuItems.nth(2));
  await t.expect(menuItems.nth(2).getAttribute('aria-pressed')).eql('false');
});
