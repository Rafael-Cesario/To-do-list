import { StyledForm } from './styles/StyledForm';

export const CreateAccount = () => {
  return (
    <StyledForm>
      <h1 className="title">Criar conta</h1>

      <div className="inputs">
        <div className="email">
          <label htmlFor="email">Email</label>
          <input id="email" type="text" />
        </div>

        <div className="name">
          <label htmlFor="name">Nome</label>
          <input id="name" type="text" />
        </div>

        <div className="password">
          <label htmlFor="password">Senha</label>
          <input id="password" type="password" />
        </div>

        <div className="confirm-password">
          <label htmlFor="confirm-password">Confirme sua senha</label>
          <input id="confirm-password" type="password" />
        </div>
      </div>

      <button className="submit">Entrar</button>
    </StyledForm>
  );
};
