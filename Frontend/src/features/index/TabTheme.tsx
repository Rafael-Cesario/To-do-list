import { StyledTheme } from './styles/StyledTheme';

export const TabTheme = () => {
  return (
    <StyledTheme>
      <h1>Tema</h1>
      <p className="faded">Deixe o site do seu gosto</p>

      <div className="themes">
        <button>Mudar para o tema claro</button>
        <button>Mudar para o tema escuro</button>
      </div>
    </StyledTheme>
  );
};
