export type TypeThemeNames = 'white' | 'black';

export type TypeThemeProps = {
  backgroundColor: string;
  color: string;
  faded: string;
  container: string;
  gray: string;
  primary: string;
  textPrimary: string;
  textError: string;
  textSuccess: string;
};

export type Theme = { theme: TypeThemeProps };

export type ITheme = {
  [key in TypeThemeNames]: TypeThemeProps;
};

export const theme: ITheme = {
  white: {
    backgroundColor: '#ddd',
    color: '#111',
    faded: '#444',
    container: '#ccc',
    gray: '#bbb',
    primary: '#0050aa',
    textPrimary: '#003060',
    textError: '#bb4040',
    textSuccess: '#00aa50',
  },

  black: {
    backgroundColor: '#111',
    container: '#151515',
    gray: '#202020',
    color: '#ddd',
    faded: '#aaa',
    primary: '#0050aa',
    textPrimary: '#0070cc',
    textError: '#bb4040',
    textSuccess: '#00aa50',
  },
};

export const colors = {
  textRed: '#bb4040',
  textBlue: '#2060cc',
  backgroundBlue: '#005090',
  backgroundBlack: '#202020',
};
