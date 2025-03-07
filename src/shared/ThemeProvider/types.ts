export type IThemes = 'light' | 'dark';

export interface IThemeContext {
  theme: IThemes;
  toggleTheme: () => void;
}
