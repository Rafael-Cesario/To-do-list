"use client";
import { produce } from "immer";
import { StyledAuth } from "@/styles/styled-auth";
import { useState } from "react";
import { Field } from "@/components/field";

export const defaultUserData = {
	email: "",
	name: "",
	password: "",
	passwordCheck: "",
};

const Authentication = () => {
	const [userData, setUserData] = useState(defaultUserData);
	const [errors, setErrors] = useState(defaultUserData);

	const createUser = () => {
		const emptyValues = checkEmptyValues();
		if (emptyValues.length) return;

		const hasError = Object.values(errors).filter((error) => error !== "");
		if (hasError) return;

		console.log({ userData });
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

				<button className="submit">Entrar</button>

				<button type="button" className="form">
					Não tem uma conta? Clique aqui para criar.
				</button>
			</form>
		</StyledAuth>
	);
};

export default Authentication;
