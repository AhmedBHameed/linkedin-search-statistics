/**
 * The number 50 is the scale of the color according to Figma
 * @see https://www.figma.com/file/WCipxn54SiYJSVpZ3uTUW5/BiomeDx-Styleguide-und-Report-%234?node-id=13%3A140
 */

const highlightText = '#ffc069';

const lightTheme = {
  red: 'red',
  blue5: '#e7f2fe',
  blue50: '#047CB3',
  blue90: '#011e2f',
  highlightText,
};

const darkTheme = {
  red: '#ff7777',
  blue5: '#e7f2fe',
  blue50: '#047CB3',
  blue90: '#011e2f',
  highlightText,
};

export type ThemeProps = typeof darkTheme;
export {lightTheme, darkTheme};
