import { useState } from 'react';
import { StyledHeader } from './styles/StyledHeader';

export const Header = () => {
  const [activeForm, setActiveForm] = useState('login');

  return (
    <StyledHeader>
      <button className={activeForm === 'login' ? 'active' : ''} onClick={() => setActiveForm(activeForm === 'login' ? '' : 'login')}>
        Login
      </button>

      <button
        className={activeForm === 'createAccount' ? 'active' : ''}
        onClick={() => setActiveForm(activeForm === 'createAccount' ? '' : 'createAccount')}>
        Criar uma conta
      </button>
    </StyledHeader>
  );
};
