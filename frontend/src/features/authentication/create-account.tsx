import { produce } from "immer";
import { useEffect, useState } from "react";
import { StyledForm } from "./styles/form-style";
import { TextField } from "./components/text-field";
import { PasswordField } from "./components/password-field";
import { validations } from "@/utils/validations";
import { useMutation } from "@apollo/client";
import { userQueries } from "@/services/queries/user";
import { ICreateUser, RCreateUser } from "@/services/interfaces/user";

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

	const [createUserMutation] = useMutation<RCreateUser, ICreateUser>(userQueries.CREATE_USER);

	const updateValue = (newValue: string, name: string) => {
		const fieldError = validations[name as keyof typeof validations](newValue, values.password);
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
		errors.name = validations.name(values.name);
		errors.passwordConfirmation = validations.passwordConfirmation(values.password, values.passwordConfirmation);

		setErrors(errors);

		const hasErrors = !!Object.values(errors).filter((value) => value.length > 0).length;
		return hasErrors;
	};

	const submitForm = async (e: React.FormEvent) => {
		e.preventDefault();

		const hasErrors = validateFields();
		if (hasErrors) return;

		// TODO
		try {
			const { email, name, password } = values;
			const newUser = { email, name, password };
			const { data } = await createUserMutation({ variables: { newUser } });
			const message = data?.createUser.message;
			console.log({ message });

			// send notification
			// send user to login page.
		} catch (e: any) {
			const error = e.message;
			console.log(error);

			// send a notification
		}
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
