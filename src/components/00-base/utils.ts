import { fontSize } from './variables';

export const srOnly = () =>
  // Copied from https://gist.github.com/ffoodd/000b59f431e3e64e4ce1a24d5bb36034

  /*
  Improved screen reader only CSS class
  @author Gaël Poupard
    @note Based on Yahoo!'s technique
    @author Thierry Koblentz
    @see https://developer.yahoo.com/blogs/ydn/clip-hidden-content-better-accessibility-53456.html
  * 1.
    @note `clip` is deprecated but works everywhere
    @see https://developer.mozilla.org/en-US/docs/Web/CSS/clip
  * 2.
    @note `clip-path` is the future-proof version, but not very well supported yet
    @see https://developer.mozilla.org/en-US/docs/Web/CSS/clip-path
    @see http://caniuse.com/#search=clip-path
    @author Yvain Liechti
    @see https://twitter.com/ryuran78/status/778943389819604992
  * 3.
    @note preventing text to be condensed
    author J. Renée Beach
    @see https://medium.com/@jessebeach/beware-smushed-off-screen-accessible-text-5952a4c2cbfe
    @note Drupal 8 goes with word-wrap: normal instead
    @see https://www.drupal.org/node/2045151
    @see http://cgit.drupalcode.org/drupal/commit/?id=5b847ea
  * 4.
    @note !important is important
    @note Obviously you wanna hide something
    @author Harry Roberts
    @see https://csswizardry.com/2016/05/the-importance-of-important/
*/
  `
  border: 0 !important;
  clip: rect(1px, 1px, 1px, 1px) !important; /* 1 */
  -webkit-clip-path: inset(50%) !important;
    clip-path: inset(50%) !important;        /* 2 */
  height: 1px !important;
  margin: -1px !important;
  overflow: hidden !important;
  padding: 0 !important;
  position: absolute !important;
  width: 1px !important;
  white-space: nowrap !important;            /* 3 */
`;

export const font = (
  size: 'body' | 'title' | 'headline' | 'cardSmall' | 'cardLarge'
): string => `
  font-size: ${fontSize[size]};
  line-height: ${fontSize[size]};
`;

export const fixedInFooter = (position: 'left' | 'center' | 'right') => `
  bottom: 0;
  position: fixed;
  z-index: 1;

  ${
    position === 'center'
      ? `
    left: 50%;
    transform: translateX(-50%);
  `
      : ''
  }

  ${
    position === 'left'
      ? `
    left: 0;

    @media screen and (min-width: 64rem) {
      left: calc((100vw - 64rem) / 2);
    }
  `
      : ''
  }

  ${
    position === 'right'
      ? `
    right: 0;

    @media screen and (min-width: 64rem) {
      right: calc((100vw - 64rem) / 2);
    }
  `
      : ''
  }
`;
