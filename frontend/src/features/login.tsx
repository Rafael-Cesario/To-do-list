"use client";
import { Field } from "@/components/field";
import { StyledAuth } from "@/styles/styled-auth";
import { produce } from "immer";
import { useState } from "react";

const defaultUserData = {
	email: "",
	password: "",
};

export const Login = () => {
	const [userData, setUserData] = useState(defaultUserData);
	const [errors, setErrors] = useState(defaultUserData);

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

	const login = () => {
		const emptyValues = checkEmptyValues();
		if (emptyValues.length) return;
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

				<button className="submit" onClick={() => login()}>
					Entrar
				</button>
				<button className="form"> Não tem uma conta? Clique aqui para criar.</button>
			</form>
		</StyledAuth>
	);
};
