import { produce } from "immer";
import { useState } from "react";
import { StyledForm } from "./styles/form-style";
import { TextField } from "./components/text-field";
import { PasswordField } from "./components/password-field";
import { validations } from "@/utils/validations";
import { useMutation } from "@apollo/client";
import { userQueries } from "@/services/queries/user";
import { ICreateUser, RCreateUser } from "@/services/interfaces/user";
import { ButtonLoading } from "@/components/button-loading";
import { useDispatch } from "react-redux";
import { setNotification } from "@/context/slice-notification";
import { errorsMap } from "@/services/errors-map";

interface IForm {
	setFormName: React.Dispatch<React.SetStateAction<"login" | "create">>;
}

export const CreateAccount = ({ setFormName }: IForm) => {
	const defaultValues = { email: "", name: "", password: "", passwordConfirmation: "" };
	const [values, setValues] = useState(defaultValues);
	const [errors, setErrors] = useState(defaultValues);
	const [loading, setLoading] = useState(false);

	const dispatch = useDispatch();
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
		const newErrors = produce(errors, (draft) => {
			draft.email = validations.email(values.email);
			draft.password = validations.password(values.password);
			draft.name = validations.name(values.name);
			draft.passwordConfirmation = validations.passwordConfirmation(values.password, values.passwordConfirmation);
		});

		return newErrors;
	};

	const submitForm = async (e: React.FormEvent) => {
		e.preventDefault();

		const errors = validateFields();
		const hasErrors = !!Object.values(errors).filter((value) => value.length > 0).length;
		if (hasErrors) return setErrors(errors);

		setLoading(true);

		try {
			const { email, name, password } = values;
			const newUser = { email, name, password };
			await createUserMutation({ variables: { newUser } });
			dispatch(setNotification({ isOpen: true, type: "success", title: "Novo usuário criado", message: "Boas vindas, você já pode fazer login." }));
			// send user to login page.
		} catch (e: any) {
			const [errorCode] = e.message.split(": ");
			const error = errorsMap.user[errorCode as keyof typeof errorsMap.user] ?? "Um erro inesperado ocorreu. Por favor tente recarregar a página";
			dispatch(setNotification({ isOpen: true, type: "error", title: "Ops, algo deu errado", message: error }));
		}

		setLoading(false);
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

				{loading || <button className="submit">Criar minha conta</button>}
				{loading && <ButtonLoading />}

				<button type="button" className="change-form" onClick={() => setFormName("login")}>
					Já tem uma conta? Clique aqui para fazer login
				</button>
			</form>
		</StyledForm>
	);
};
