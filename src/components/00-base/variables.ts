/* Color (I know it's the wrong spelling but it's also the correct CSS property)
 * ------------------------------------------------------------------
 */
export const color = {
  blue900: '#17429f',
  blue800: '#1d60be',
  blue700: '#2591f1',
  blue50: '#e3f1fd',
  blue25: '#f1f8fe',

  iconBlack: '#000000',
  iconBlue: '#1d60be',
  iconGreen: '#00914c',
  iconGrey: '#90a4ae',
  iconWhite: '#ffffff',

  neutral900: '#000000',
  neutral700: '#616161',
  neutral600: '#767676',
  neutral300: '#90a4ae',
  neutral200: '#b0bec5',
  neutral100: '#f5f5f5',
  neutral50: '#fafafa',
  neutral0: '#ffffff',

  green700: '#00914c',
  green100: '#e3f6ec',
};

/* Shadows
 * ------------------------------------------------------------------
 */
const shadowLight = 'rgba(0, 0, 0, 0.25)';
const shadowMedium = 'rgba(0, 0, 0, 0.35)';
const shadowDark = 'rgba(0, 0, 0, 0.4)';

export const shadows = {
  buttonPrimary: `2px 3px 1px ${shadowMedium}`,
  buttonSecondary: `2px 3px 2px ${shadowLight}`,
  buttonTertiary: `2px 3px 1px ${shadowDark}`,

  primary: `2px 3px 2px ${shadowLight}`,
  secondary: `0px 2px 8px ${shadowLight}`,
  tertiary: `inset 1px 1px 2px ${shadowLight}`,

  footer: `0 -2px 4px ${shadowLight}`,
  header: `0 2px 4px ${shadowLight}`,
  form: `0 2px 8px ${shadowLight}`,
  notification: `0 0 10px ${shadowDark}`,

  /* There is overlap between the chat-bubble shadow and the triangle's 'shadow', causing a darker
   * shadow where they overlap. To avoid this we make an exception in this instance, and use a solid
   * colour for the box-shadow. The value below is the solid representation of rgba(0, 0, 0, 0.25)
   */
  chatBubble: '#bfbfbf',
};

/* Typography
 * ------------------------------------------------------------------
 */

export const fontFamily = '"Questrial", sans-serif';

export const fontSize = {
  body: '1.125rem',
  title: '1.5rem',
  headline: '2rem',
  cardSmall: '3rem',
  cardLarge: '4rem',
};
