import { useTheme } from '../../utils/hooks/useTheme';
import { StyledTheme } from './styles/StyledTheme';

export const TabTheme = () => {
  const { setTheme } = useTheme();

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
