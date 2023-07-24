import { StyledLogin } from "./styles/login-style";
import { TextField } from "./components/text-field";
import { PasswordField } from "./components/password-field";
import { useState } from "react";
import { produce } from "immer";

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

	const updateValue = (newValue: string, name: string) => {
		const newState = produce(values, (draft) => {
			draft[name as keyof typeof defaultValues] = newValue;
		});

		setValues(newState);
	};

	const submitForm = (e: React.FormEvent) => {
		e.preventDefault();
		console.log({ values, errors });
	};

	return (
		<StyledLogin>
			<h1 className="title">Login</h1>

			<form className="fields" onSubmit={(e) => submitForm(e)}>
				<TextField
					name={"email"}
					label="Email"
					placeholder="nome@exemplo.com"
					error={errors.email}
					customClass={errors.email ? "error" : values.email ? "success" : ""}
					updateValue={updateValue}
				/>

				<PasswordField name={"password"} label="Senha" placeholder="Senha" />

				<button className="submit">Entrar</button>

				<button type="button" className="change-form">
					Não tem uma conta? Clique aqui para criar sua conta
				</button>
			</form>
		</StyledLogin>
	);
};
