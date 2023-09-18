"use client";
import { messageErrors } from "@/services/interfaces/errors";
import { produce } from "immer";
import { StyledAuth } from "@/styles/styled-auth";
import { useState } from "react";
import { Field } from "@/components/field";
import { useMutation } from "@apollo/client";
import { userQueries } from "@/services/queries/user";
import { ICreateUser, RCreateUser } from "@/services/interfaces/user";
import { useDispatch } from "react-redux";
import { setNotification } from "@/context/notification-slice";
import { LoadingButton } from "@/components/loading-button";

export const defaultUserData = {
	email: "",
	name: "",
	password: "",
	passwordCheck: "",
};

const Authentication = () => {
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

	return (
		<StyledAuth>
			<h1 className="title">Criar conta</h1>

			<form
				onSubmit={(e) => {
					e.preventDefault();
					createUser();
				}}>
				<div className="field-container">
					<Field props={{ label: "Email", placeholder: "usuario@email.com", type: "text", fieldName: "email", errors, setErrors, userData, setUserData }} />
					<Field props={{ label: "Nome", placeholder: "Nome", fieldName: "name", type: "text", errors, setErrors, userData, setUserData }} />
					<Field props={{ label: "Senha", placeholder: "Use letras e números para criar uma senha forte", type: "password", fieldName: "password", errors, setErrors, userData, setUserData }} />
					<Field props={{ label: "Confirmar senha", placeholder: "Digite novamente a sua senha", type: "password", fieldName: "passwordCheck", errors, setErrors, userData, setUserData }} />
				</div>

				{loading || <button className="submit">Entrar</button>}
				{loading && <LoadingButton className="submit" />}

				<button type="button" className="form">
					Não tem uma conta? Clique aqui para criar.
				</button>
			</form>
		</StyledAuth>
	);
};

export default Authentication;
