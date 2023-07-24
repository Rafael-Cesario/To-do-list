import Image from "next/image";
import { StyledLogin } from "./styles/login-style";

interface ILogin {
	setFormName: React.Dispatch<React.SetStateAction<"login" | "create">>;
}

export const Login = ({ setFormName }: ILogin) => {
	return (
		<StyledLogin>
			<h1>Login</h1>

			<form className="fields">
				<div className="email">
					<label htmlFor="email">Email</label>
					<input type="text" id="email" autoComplete="false" placeholder="nomeUsuario@dominio.com" />
				</div>

				<div className="password">
					<label htmlFor="password">Senha</label>

					<div className="input">
						<input type="password" id="password" placeholder="Use letras maiúsculas, minúsculas, números e símbolos" />
						<Image alt="input-icon" src={"/icons/eye-closed.png"} width={20} height={20} />
					</div>
				</div>

				<button className="submit">Entrar</button>
				<button type="button" className="change-form">
					Não tem uma conta? Clique aqui para criar sua conta
				</button>
			</form>
		</StyledLogin>
	);
};
