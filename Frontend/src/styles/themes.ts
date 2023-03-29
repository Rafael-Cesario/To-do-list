export type TypeThemeNames = 'white' | 'black';

export type TypeThemeProps = {
  backgroundColor: string;
  color: string;
  faded: string;
  container: string;
  border: string;
  primary: string;
  textPrimary: string;
};

export type ITheme = {
  [key in TypeThemeNames]: TypeThemeProps;
};

export const theme: ITheme = {
  white: {
    backgroundColor: '#ddd',
    color: '#111',
    faded: '#444',
    container: '#ccc',
    border: '#bbb',
    primary: '#0050aa',
    textPrimary: '#003060',
  },

  black: {
    backgroundColor: '#111',
    container: '#151515',
    border: '#222',
    color: '#ddd',
    faded: '#aaa',
    primary: '#0050aa',
    textPrimary: '#00aaff',
  },
};

export const colors = {
  textRed: '#bb4040',
  textBlue: '#2060cc',
  backgroundBlue: '#005090',
  backgroundBlack: '#202020',
};
