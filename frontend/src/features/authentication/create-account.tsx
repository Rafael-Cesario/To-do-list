import { produce } from "immer";
import { useEffect, useState } from "react";
import { StyledForm } from "./styles/form-style";
import { TextField } from "./components/text-field";
import { PasswordField } from "./components/password-field";
import { validations } from "@/utils/validations";

interface IForm {
	setFormName: React.Dispatch<React.SetStateAction<"login" | "create">>;
}

const defaultValues = {
	email: "",
	name: "",
	password: "",
	passwordConfirmation: "",
};

export const CreateAccount = ({ setFormName }: IForm) => {
	const [values, setValues] = useState(defaultValues);
	const [errors, setErrors] = useState(defaultValues);

	const updateValue = (newValue: string, name: string) => {
		const fieldError = validations[name as keyof typeof validations](newValue);
		setErrors({ ...errors, [name]: fieldError });

		const newState = produce(values, (draft) => {
			draft[name as keyof typeof defaultValues] = newValue;
		});

		setValues(newState);
	};

	const validateFields = () => {
		const errors = defaultValues;

		errors.email = validations.email(values.email);
		errors.password = validations.password(values.password);
		// TODO
		// errors.name
		// errors.passwordConfirmation

		setErrors(errors);

		const hasErrors = !!Object.values(errors).filter((value) => value.length > 0).length;
		return hasErrors;
	};

	const submitForm = (e: React.FormEvent) => {
		e.preventDefault();

		console.log({ values });

		const hasErrors = validateFields();
		if (hasErrors) return;

		console.log("Hello");

		// TODO:
		// Send request to create account
		// catch response errors
		// send user to login page.
	};

	return (
		<StyledForm>
			<h1 className="title">Criar conta</h1>

			<form className="fields" onSubmit={(e) => submitForm(e)}>
				<TextField
					name={"email"}
					label="Email"
					placeholder="nome@exemplo.com"
					error={errors.email}
					customClass={errors.email ? "error" : values.email ? "success" : ""}
					updateValue={updateValue}
				/>

				<TextField
					name={"name"}
					label="Nome"
					placeholder="Nome"
					error={errors.name}
					customClass={errors.name ? "error" : values.name ? "success" : ""}
					updateValue={updateValue}
				/>

				<PasswordField
					error={errors.password}
					customClass={errors.password ? "error" : values.password ? "success" : ""}
					updateValue={updateValue}
					name={"password"}
					label="Senha"
					placeholder="Senha"
				/>

				<PasswordField
					error={errors.passwordConfirmation}
					customClass={errors.passwordConfirmation ? "error" : values.passwordConfirmation ? "success" : ""}
					updateValue={updateValue}
					name={"passwordConfirmation"}
					label="Digite novamente sua senha"
					placeholder="Senha"
				/>

				<button className="submit">Criar minha conta</button>

				<button type="button" className="change-form" onClick={() => setFormName("login")}>
					Já tem uma conta? Clique aqui para fazer login
				</button>
			</form>
		</StyledForm>
	);
};
