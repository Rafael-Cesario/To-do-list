export type TypeThemeNames = 'white' | 'black';

export type TypeThemeProps = {
  backgroundColor: string;
  color: string;
  faded: string;
  container: string;
  border: string;
  primary: string;
  textPrimary: string;
  textError: string;
  textSuccess: string;
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
    textError: '#bb4040',
    textSuccess: '#00aa50',
  },

  black: {
    backgroundColor: '#111',
    container: '#151515',
    border: '#222',
    color: '#ddd',
    faded: '#aaa',
    primary: '#0050aa',
    textPrimary: '#0070cc',
    textError: '#bb4040',
    textSuccess: '#00aa50',
  },
};
