import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { localStorageKeys } from '../../utils/localStorageKeys';
import { StyledPerfil } from './styles/StyledPerfil';

export const Perfil = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const logout = () => {
    localStorage.removeItem(localStorageKeys.user);
    navigate('/');
  };

  return (
    <StyledPerfil>
      <button onClick={() => setIsOpen(!isOpen)}>Perfil</button>

      {isOpen && (
        <div className="container">
          <div className="perfil-tab">
            <h1 className="title">Perfil</h1>
            <button className="perfil-close" onClick={() => setIsOpen(false)}>
              x
            </button>
          </div>

          <h1 className="title">UserName</h1>

          <span>Nome</span>
          <input className="input-text" type="text" />

          <span>Email</span>
          <input className="input-text" type="text" />

          <div className="password">
            <span>Senha atual</span>
            <div>
              <input type={showPassword ? 'text' : 'password'} />

              {showPassword && <img onClick={() => setShowPassword(!showPassword)} src="/icons/eye.png" alt="eye icon" width={15} height={15} />}
              {showPassword || <img onClick={() => setShowPassword(!showPassword)} src="/icons/hidden.png" alt="eye icon" width={15} height={15} />}
            </div>
          </div>

          <div className="password">
            <span>Nova senha</span>
            <div>
              <input type={showPassword ? 'text' : 'password'} />
              {showPassword && <img onClick={() => setShowPassword(!showPassword)} src="/icons/eye.png" alt="eye icon" width={15} height={15} />}
              {showPassword || <img onClick={() => setShowPassword(!showPassword)} src="/icons/hidden.png" alt="eye icon" width={15} height={15} />}
            </div>
          </div>

          <div className="actions">
            <button>Salvar</button>
            <button onClick={() => logout()}>Logout</button>
          </div>
        </div>
      )}
    </StyledPerfil>
  );
};
