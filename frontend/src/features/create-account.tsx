"use client";
import { Field } from "@/components/field";
import { LoadingButton } from "@/components/loading-button";
import { setNotification } from "@/context/notification-slice";
import { messageErrors } from "@/services/interfaces/errors";
import { RCreateUser, ICreateUser } from "@/services/interfaces/user";
import { userQueries } from "@/services/queries/user";
import { StyledAuth } from "@/styles/styled-auth";
import { validations } from "@/utils/validations";
import { useMutation } from "@apollo/client";
import { produce } from "immer";
import { useState } from "react";
import { useDispatch } from "react-redux";

export const defaultUserData = {
	email: "",
	name: "",
	password: "",
	passwordCheck: "",
};

export const CreateAccount = () => {
	const [userData, setUserData] = useState(defaultUserData);
	const [errors, setErrors] = useState(defaultUserData);
	const [createUserMutation, { loading }] = useMutation<RCreateUser, ICreateUser>(userQueries.CREATE_USER);

	const dispatch = useDispatch();

	const createUser = async () => {
		const emptyValues = checkEmptyValues();
		if (emptyValues.length) return;

		const hasError = Object.values(errors).filter((error) => error !== "");
		if (hasError.length) return;

		try {
			const { email, name, password } = userData;
			const variables: ICreateUser = { createUserData: { email, name, password } };
			await createUserMutation({ variables });
			setUserData(defaultUserData);
			dispatch(setNotification({ newState: { isOpen: true, type: "success", title: "Novo usuário criado", message: "Sua nova conta foi criada com sucesso, você já pode fazer login" } }));
			// Todo > change form to login form
		} catch (error: any) {
			const [errorCode] = error.message.split(":");
			const errorMessage = messageErrors.user[errorCode as keyof typeof messageErrors.user] || messageErrors.default;
			dispatch(setNotification({ newState: { isOpen: true, type: "error", title: "Ops, algo deu errado", message: errorMessage } }));
		}
	};

	const checkEmptyValues = () => {
		const emptyValues = Object.entries(userData).filter((field) => field[1].trim() === "");

		const newErrors = produce(errors, (draft) => {
			emptyValues.forEach(([key]) => {
				draft[key as keyof typeof userData] = "Este campo não pode ficar vazio";
			});
		});

		setErrors(newErrors);
		return emptyValues;
	};

	const validateField = (field: keyof typeof errors, value: string) => {
		const error = validations[field](value, userData.password);

		const newErrors = produce(errors, (draft) => {
			draft[field] = error;
		});

		setErrors(newErrors);
	};

	const changeUserData = (key: keyof typeof defaultUserData, value: string) => {
		const newData = produce(userData, (draft) => {
			draft[key] = value;
		});

		setUserData(newData);
	};

	return (
		<StyledAuth>
			<h1 className="title">Criar conta</h1>

			<form
				onSubmit={(e) => {
					e.preventDefault();
					createUser();
				}}>
				<div className="field-container">
					<Field
						props={{
							key: "email",
							fieldName: "email",
							label: "Email",
							placeholder: "usuario@email.com",
							type: "text",
							error: errors.email,
							value: userData.email,
							validateField,
							changeUserData,
						}}
					/>

					<Field
						props={{
							key: "name",
							fieldName: "name",
							label: "Nome",
							placeholder: "Nome",
							type: "text",
							error: errors.name,
							value: userData.name,
							changeUserData,
							validateField,
						}}
					/>

					<Field
						props={{
							key: "password",
							fieldName: "password",
							label: "Senha",
							placeholder: "Use letras e números para criar uma senha forte",
							type: "password",
							error: errors.password,
							value: userData.password,
							changeUserData,
							validateField,
						}}
					/>

					<Field
						props={{
							key: "passwordCheck",
							fieldName: "passwordCheck",
							label: "Confirmar senha",
							placeholder: "Digite novamente a sua senha",
							type: "password",
							error: errors.passwordCheck,
							value: userData.passwordCheck,
							changeUserData,
							validateField,
						}}
					/>
				</div>

				{loading || (
					<button data-cy="submit" className="submit">
						Entrar
					</button>
				)}
				{loading && <LoadingButton className="submit" />}

				<button type="button" className="form">
					Não tem uma conta? Clique aqui para criar.
				</button>
			</form>
		</StyledAuth>
	);
};
