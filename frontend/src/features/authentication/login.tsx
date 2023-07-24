import { StyledLogin } from "./styles/login-style";
import { TextField } from "./components/text-field";
import { PasswordField } from "./components/password-field";

interface ILogin {
	setFormName: React.Dispatch<React.SetStateAction<"login" | "create">>;
}

export const Login = ({ setFormName }: ILogin) => {
	return (
		<StyledLogin>
			<h1 className="title">Login</h1>

			<form className="fields">
				<TextField name={"email"} label="Email" placeholder="nome@exemplo.com" />
				<PasswordField name={"password"} label="Senha" placeholder="Senha" />

				<button className="submit">Entrar</button>

				<button type="button" className="change-form">
					Não tem uma conta? Clique aqui para criar sua conta
				</button>
			</form>
		</StyledLogin>
	);
};
