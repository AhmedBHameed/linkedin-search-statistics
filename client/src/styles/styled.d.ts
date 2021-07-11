import 'styled-components';

/**
 * For more information whey we need this file @see https://styled-components.com/docs/api#create-a-declarations-file
 */
declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      blue5: string;
      blue50: string;
      blue90: string;
      red: string;
      highlightText: string;
    };
  }
}
