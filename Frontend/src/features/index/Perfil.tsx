import { useState } from 'react';
import { StyledPerfil } from './styles/StyledPerfil';

export const Perfil = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <StyledPerfil>
      <button onClick={() => setIsOpen(!isOpen)}>Perfil</button>

      {isOpen && (
        <div className="container">
          <div className="perfil-tab">
            <button className="perfil-close" onClick={() => setIsOpen(false)}>
              x
            </button>
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
      )}
    </StyledPerfil>
  );
};
