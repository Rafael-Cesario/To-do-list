import { useDispatch } from 'react-redux';
import { TypeThemeNames } from '../../styles/themes';
import { localStorageKeys } from '../localStorageKeys';
import { sliceTheme } from '../slices/sliceTheme';

export const useTheme = () => {
  const dispatch = useDispatch();

  const setTheme = (newTheme: TypeThemeNames) => {
    dispatch(sliceTheme.actions.changeTheme({ newTheme }));
    localStorage.setItem(localStorageKeys.theme, newTheme);
  };

  const loadTheme = () => {
    const themeName = localStorage.getItem(localStorageKeys.theme) as TypeThemeNames;
    dispatch(sliceTheme.actions.changeTheme({ newTheme: themeName || 'black' }));
  };

  return { setTheme, loadTheme };
};
