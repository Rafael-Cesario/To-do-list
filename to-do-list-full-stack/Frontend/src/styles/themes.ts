export type TypeThemeProps = {
  backgroundColor: string;
  text: string;
  faded: string;

  container: string;
  textContainer: string;
  fadedContainer: string;
  gray: string;

  primary: string;
  textPrimary: string;
  fadedPrimary: string;

  textError: string;
  textSuccess: string;
};

export type Theme = { theme: TypeThemeProps };

export type TypeThemeNames = 'white' | 'black';

export type ITheme = {
  [key in TypeThemeNames]: TypeThemeProps;
};

export const theme: ITheme = {
  white: {
    backgroundColor: '#ddd',
    text: '#111',
    faded: '#444',

    container: '#222',
    textContainer: '#DDD',
    fadedContainer: '#AAA',
    gray: '#333',

    primary: '#0070cc',
    textPrimary: '#eee',
    fadedPrimary: '#ccc',

    textError: '#bb4040',
    textSuccess: '#00aa50',
  },

  black: {
    backgroundColor: '#111',
    text: '#ddd',
    faded: '#aaa',

    container: '#151515',
    textContainer: '#DDD',
    fadedContainer: '#777',
    gray: '#202020',

    primary: '#0050aa',
    textPrimary: '#eee',
    fadedPrimary: '#aaa',

    textError: '#bb4040',
    textSuccess: '#00aa50',
  },
};
