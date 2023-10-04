import { useState } from 'react';
import { Side } from './Side';
import { StyledPerfil } from './styles/StyledPerfil';
import { Tab } from './Tab';
import { TabTheme } from './TabTheme';
import { TabUser } from './TabUser';

export const Perfil = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [tab, setTab] = useState('theme');

  return (
    <StyledPerfil>
      <button className="perfil-button" onClick={() => setIsOpen(!isOpen)}>
        Perfil
      </button>

      {isOpen && (
        <div className="container">
          <Tab props={{ title: 'Perfil', setIsOpen }} />

          <div className="content">
            <Side props={{ tab, setTab }} />

            {tab === 'theme' && <TabTheme />}
            {tab === 'user' && <TabUser />}
          </div>
        </div>
      )}
    </StyledPerfil>
  );
};
