import { useDispatch } from 'react-redux';
import { TypeThemeNames } from '../../styles/themes';
import { localStorageKeys } from '../../utils/localStorageKeys';
import { sliceTheme } from '../../utils/slices/sliceTheme';
import { StyledTheme } from './styles/StyledTheme';

export const TabTheme = () => {
  const dispatch = useDispatch();

  const setTheme = (newTheme: TypeThemeNames) => {
    dispatch(sliceTheme.actions.changeTheme({ newTheme }));
    localStorage.setItem(localStorageKeys.theme, newTheme);
  };

  return (
    <StyledTheme>
      <h1>Tema</h1>
      <p className="faded">Deixe o site do seu gosto</p>

      <div className="themes">
        <button onClick={() => setTheme('white')}>Mudar para o tema claro</button>
        <button onClick={() => setTheme('black')}>Mudar para o tema escuro</button>
      </div>
    </StyledTheme>
  );
};
