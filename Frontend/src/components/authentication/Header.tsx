import { useState } from 'react';
import { Login } from './Login';
import { StyledHeader } from './styles/StyledHeader';

export const Header = () => {
  const [activeForm, setActiveForm] = useState('login');

  return (
    <StyledHeader>
      <div className="buttons">
        <button className={activeForm === 'login' ? 'active' : ''} onClick={() => setActiveForm(activeForm === 'login' ? '' : 'login')}>
          Login
        </button>
        <button
          className={activeForm === 'createAccount' ? 'active' : ''}
          onClick={() => setActiveForm(activeForm === 'createAccount' ? '' : 'createAccount')}>
          Criar uma conta
        </button>
      </div>

      <div className="forms">
        <Login />
      </div>
    </StyledHeader>
  );
};
