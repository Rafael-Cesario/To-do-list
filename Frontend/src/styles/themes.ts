export type TypeThemeNames = 'white' | 'black';

export type TypeThemeProps = {
  backgroundColor: string;
  color: string;
};

export type ITheme = {
  [key in TypeThemeNames]: TypeThemeProps;
};

export const theme: ITheme = {
  white: {
    backgroundColor: '#ddd',
    color: '#111',
  },

  black: {
    backgroundColor: '#111',
    color: '#ddd',
  },
};

export const colors = {
  textRed: '#bb4040',
  textBlue: '#2060cc',
  backgroundBlue: '#005090',
  backgroundBlack: '#202020',
};
