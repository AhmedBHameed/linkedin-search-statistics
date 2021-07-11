export const THEME_TYPE_KEY = 'themeType';

export const getThemeType = () => window.localStorage.getItem(THEME_TYPE_KEY);

export const setThemeType = (theme: 'light' | 'dark') =>
  window.localStorage.setItem(THEME_TYPE_KEY, theme);
