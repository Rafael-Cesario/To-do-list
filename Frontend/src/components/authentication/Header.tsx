import { useState } from 'react';
import { CreateAccount } from './CreateAccount';
import { Login } from './Login';
import { StyledHeader } from './styles/StyledHeader';

export const Header = () => {
  const [activeForm, setActiveForm] = useState('');

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
        {activeForm === 'login' && <Login />}
        {activeForm === 'createAccount' && <CreateAccount />}
      </div>
    </StyledHeader>
  );
};
