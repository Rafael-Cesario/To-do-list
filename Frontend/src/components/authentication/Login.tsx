import { StyledLogin } from './styles/StyledLogin';

export const Login = () => {
  return (
    <StyledLogin>
      <h1 className="title">Login</h1>

      <div className="inputs">
        <div className="email">
          <label htmlFor="email">Email</label>
          <input type="text" />
        </div>

        <div className="password">
          <label htmlFor="password">Senha</label>
          <input type="password" />
        </div>
      </div>

      <button className="submit">Entrar</button>
    </StyledLogin>
  );
};
