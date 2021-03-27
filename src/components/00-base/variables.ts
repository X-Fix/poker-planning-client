/* Color (I know it's the wrong spelling but it's also the correct CSS property)
 * ------------------------------------------------------------------
 */
export const colorNeutral900 = '#000000';
export const colorNeutral700 = '#616161';
export const colorNeutral300 = '#90a4ae';
export const colorNeutral200 = '#b0bec5';
export const colorNeutral100 = '#f5f5f5';
export const colorNeutral50 = '#fafafa';
export const colorNeutral0 = '#ffffff';

export const colorBlue900 = '#17429f';
export const colorBlue800 = '#1d60be';
export const colorBlue700 = '#2591f1';
export const colorBlue50 = '#e3f1fd';
export const colorBlue25 = '#f1f8fe';

export const colorGreen700 = '#00914c';
export const colorGreen100 = '#e3f6ec';

export const colorIconBlack = colorNeutral900;
export const colorIconBlue = colorBlue800;
export const colorIconGreen = colorGreen700;
export const colorIconGrey = colorNeutral300;
export const colorIconWhite = colorNeutral0;

/* Shadows
 * ------------------------------------------------------------------
 */
const shadow = 'rgba(0, 0, 0, 0.25)';

export const shadowButtonPrimary = '2px 3px 1px rgba(0, 0, 0, 0.35)';
export const shadowButtonSecondary = `2px 3px 2px ${shadow}`;
export const shadowButtonTertiary = '2px 3px 1px rgba(0, 0, 0, 0.375)';

export const shadowPrimary = `2px 3px 2px ${shadow}`;
export const shadowSecondary = `0px 2px 8px ${shadow}`;
export const shadowTertiary = `inset 1px 1px 2px ${shadow}`;

export const shadowFooter = `0 -2px 4px ${shadow}`;
export const shadowHeader = `0 2px 4px ${shadow}`;
export const shadowForm = `0 2px 8px ${shadow}`;

/* There is overlap between the chat-bubble shadow and the triangle's 'shadow', causing a darker
 * shadow where they overlap. To avoid this we make an exception in this instance, and use a solid
 * colour for the box-shadow. The value below is the solid representation of rgba(0, 0, 0, 0.25)
 */
export const shadowChatBubble = '#bfbfbf';

/* Typography
 * ------------------------------------------------------------------
 */

export const fontFamily = '"Questrial", sans-serif';

export const fontSizeBody = '1.125rem';
export const fontSizeTitle = '1.5rem';
export const fontSizeHeadline = '2rem';
export const fontSizeCardSmall = '3rem';
export const fontSizeCardLarge = '4rem';
