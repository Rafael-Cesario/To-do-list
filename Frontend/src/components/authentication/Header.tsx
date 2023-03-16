import { StyledHeader } from "./styles/StyledHeader";

export const Header = () => {
  return (
    <StyledHeader>
      <button className="active">Login</button>
      <button>Criar uma conta</button>
    </StyledHeader>
  );
};
