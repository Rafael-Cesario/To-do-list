import { StyledPerfil } from './styles/StyledPerfil';

export const Perfil = () => {
  return (
    <StyledPerfil>
      <button> Perfil</button>

      <div className="container">
        <div className="perfil-tab">
          <button className="perfil-close">x</button>
        </div>

        <h1 className="title">UserName</h1>

        <span>Nome</span>
        <input type="text" />

        <span>Email</span>
        <input type="text" />

        <span>Senha</span>
        <input type="text" />

        <div className="actions">
          <button>Salvar</button>
          <button>Sair</button>
        </div>
      </div>
    </StyledPerfil>
  );
};
