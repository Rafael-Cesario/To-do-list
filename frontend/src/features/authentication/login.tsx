import { StyledForm } from "./styles/form-style";
import { TextField } from "./components/text-field";
import { PasswordField } from "./components/password-field";
import { useState } from "react";
import { produce } from "immer";
import { showError } from "@/utils/show-error";
import { useDispatch } from "react-redux";
import { cookies } from "@/services/cookies";
import { useRouter } from "next/navigation";
import { useMutationsUser } from "@/utils/hooks/use-mutations-user";
import { ButtonLoading } from "@/components/button-loading";
import { IUserCookies } from "@/services/interfaces/cookies";

interface IForm {
	setFormName: React.Dispatch<React.SetStateAction<"login" | "create">>;
}

const defaultValues = {
	email: "",
	password: "",
};

export const Login = ({ setFormName }: IForm) => {
	const [values, setValues] = useState(defaultValues);
	const [errors, setErrors] = useState(defaultValues);
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	const { loginRequest } = useMutationsUser();
	const dispatch = useDispatch();

	const updateValue = (newValue: string, name: string) => {
		const newState = produce(values, (draft) => {
			draft[name as keyof typeof defaultValues] = newValue;
		});

		setValues(newState);
	};

	const validateFields = () => {
		const errors: { [key: string]: string } = {};

		if (!values.email) errors.email = "Este campo não pode ficar vazio";
		if (!values.password) errors.password = "Este campo não pode ficar vazio";

		setErrors({ ...defaultValues, ...errors });

		const hasErrors = !!Object.keys(errors).length;
		return hasErrors;
	};

	const submitForm = async (e: React.FormEvent) => {
		e.preventDefault();

		const hasErrors = validateFields();
		if (hasErrors) return;

		setLoading(true);

		try {
			const user = { email: values.email, password: values.password };
			const { data } = await loginRequest({ user });
			if (!data) throw new Error("Data is undefined");
			const { token, userID } = data?.login;

			const userCookies: IUserCookies = { email: values.email, token, userID };

			await cookies.set({
				key: cookies.keys.user,
				maxAge: 60 * 60 * 24 * 7, // 1 week
				value: JSON.stringify(userCookies),
			});

			router.refresh();
		} catch (error: any) {
			showError(error, dispatch);
		}

		setLoading(false);
	};

	return (
		<StyledForm>
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

				<PasswordField
					error={errors.password}
					customClass={errors.password ? "error" : values.password ? "success" : ""}
					updateValue={updateValue}
					name={"password"}
					label="Senha"
					placeholder="Senha"
				/>

				{loading || (
					<button role="submit-form" className="submit">
						Entrar
					</button>
				)}

				{loading && <ButtonLoading />}

				<button type="button" className="change-form" onClick={() => setFormName("create")}>
					Não tem uma conta? Clique aqui para criar sua conta
				</button>
			</form>
		</StyledForm>
	);
};
