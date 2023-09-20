"use client";
import axios from "axios";
import { Field } from "@/components/field";
import { setNotification } from "@/context/notification-slice";
import { ILogin, RLogin } from "@/services/interfaces/authentication";
import { messageErrors } from "@/services/interfaces/errors";
import { authQueries } from "@/services/queries/authentication";
import { StyledAuth } from "@/styles/styled-auth";
import { useMutation } from "@apollo/client";
import { produce } from "immer";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { SetCookies, UserCookies } from "@/services/interfaces/cookies";
import { LoadingButton } from "@/components/loading-button";

interface ILoginProps {
	props: { setFormActive: (state: "login" | "create") => void };
}

const defaultUserData = {
	email: "",
	password: "",
};

export const Login = ({ props: { setFormActive } }: ILoginProps) => {
	const [userData, setUserData] = useState(defaultUserData);
	const [errors, setErrors] = useState(defaultUserData);
	const [loginMutation, { loading }] = useMutation<RLogin, ILogin>(authQueries.LOGIN);
	const dispatch = useDispatch();
	const router = useRouter();

	const changeUserData = (fieldName: keyof typeof defaultUserData, value: string) => {
		const state = produce(userData, (draft) => {
			draft[fieldName] = value;
		});

		setUserData(state);
	};

	const checkEmptyValues = () => {
		const state = produce(errors, (draft) => {
			draft.email = userData.email ? "" : "Este campo não pode ficar vazio";
			draft.password = userData.password ? "" : "Este campo não pode ficar vazio";
		});

		setErrors(state);

		const emptyValues = Object.values(state).filter((value) => value !== "");
		return emptyValues;
	};

	const login = async () => {
		const emptyValues = checkEmptyValues();
		if (emptyValues.length) return;

		try {
			const { data } = await loginMutation({ variables: { loginData: userData } });
			if (!data) throw new Error("Data is undefined");

			setUserData(defaultUserData);

			const maxAge = 60 * 60 * 24 * 7; // 1 week
			const userCookies: UserCookies = data.login;
			const cookie: SetCookies = { key: "user", maxAge, value: JSON.stringify(userCookies) };

			await axios({ method: "post", url: "/api/cookies", data: cookie });
			router.refresh();
			// todo > Test
		} catch (error: any) {
			const [errorCode] = error.message.split(": ");
			const errorMessage = messageErrors.auth[errorCode as keyof typeof messageErrors.auth] ?? messageErrors.default;
			dispatch(setNotification({ newState: { isOpen: true, type: "error", title: "Erro", message: errorMessage } }));
			// todo > Test
		}
	};

	return (
		<StyledAuth>
			<h1 className="title">Login</h1>

			<form
				onSubmit={(e) => {
					e.preventDefault();
				}}>
				<div className="field-container">
					<Field
						props={{
							focus: true,
							changeUserData,
							error: errors.email,
							fieldName: "email",
							key: "email",
							label: "Email",
							placeholder: "",
							type: "text",
							value: userData.email,
						}}
					/>

					<Field
						props={{
							changeUserData,
							error: errors.password,
							fieldName: "password",
							key: "password",
							label: "Senha",
							placeholder: "",
							type: "password",
							value: userData.password,
						}}
					/>
				</div>

				{loading || (
					<button className="submit" data-cy="submit" onClick={() => login()}>
						Entrar
					</button>
				)}

				{loading && <LoadingButton className="submit" />}

				<button type="button" className="form" onClick={() => setFormActive("create")}>
					Não tem uma conta? Clique aqui para criar.
				</button>
			</form>
		</StyledAuth>
	);
};
