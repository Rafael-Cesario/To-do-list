import { StyledLogin } from "./styles/login-style";
import { TextField } from "./components/text-field";
import { PasswordField } from "./components/password-field";
import { useState, useEffect } from "react";
import { validations } from "@/utils/validations";

interface ILogin {
	setFormName: React.Dispatch<React.SetStateAction<"login" | "create">>;
}

const defaultValues = {
	email: "",
	password: "",
};

export const Login = ({ setFormName }: ILogin) => {
	const [values, setValues] = useState(defaultValues);
	const [errors, setErrors] = useState(defaultValues);

	return (
		<StyledLogin>
			<h1 className="title">Login</h1>

			<form className="fields">
				<TextField props={{ values, setValues, errors }} name={"email"} label="Email" placeholder="nome@exemplo.com" />
				<PasswordField name={"password"} label="Senha" placeholder="Senha" />

				<button className="submit">Entrar</button>
				<button type="button" className="change-form">
					Não tem uma conta? Clique aqui para criar sua conta
				</button>
			</form>
		</StyledLogin>
	);
};
